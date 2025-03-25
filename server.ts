import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';
import path from 'path';
import { RowDataPacket } from 'mysql2'; // Import RowDataPacket for typing

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'waitlistDB',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Email transporter setup
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error('EMAIL_USER or EMAIL_PASS is not defined in the environment variables');
}
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.post('/api/waitlist', async (req, res) => {
  console.log('Received POST request to /api/waitlist:', req.body);
  try {
    const { email } = req.body;

    // Validate email
    if (!email || !email.endsWith('@gmail.com')) {
      return res.status(400).json({ message: 'Please provide a valid Gmail address' });
    }

    // Check if the email already exists
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM emails WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Add the email to the waitlist
    await pool.query('INSERT INTO emails (email) VALUES (?)', [email]);

    // Send confirmation email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to FIRA AI Waitlist!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
          <h1 style="color: #1a1a1a; text-align: center; margin-bottom: 30px;">Welcome to FIRA AI!</h1>
          <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Thank you for joining our waitlist! We're thrilled to have you as part of our growing community.
          </p>
          <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            You're now on the exclusive list to be among the first to experience FIRA AI when we launch. We'll keep you updated on our progress and notify you as soon as early access becomes available.
          </p>
          <div style="background-color: #e2e8f0; padding: 15px; border-radius: 8px; margin: 30px 0;">
            <p style="color: #2d3748; margin: 0; font-weight: bold;">What's Next?</p>
            <ul style="color: #4a5568; margin: 10px 0 0 0; padding-left: 20px;">
              <li>Watch your inbox for exclusive updates</li>
              <li>Get ready for early access</li>
              <li>Share FIRA AI with your network</li>
            </ul>
          </div>
          <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">
            Best regards,<br>
            The FIRA AI Team
          </p>
        </div>
      `,
    });

    res.status(200).json({ message: 'Successfully joined waitlist' });
  } catch (error) {
    console.error('Error processing waitlist request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route for client-side routing
app.get('*', (req, res) => {
  console.log('Serving index.html for:', req.url);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});