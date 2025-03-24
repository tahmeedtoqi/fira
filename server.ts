import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';
import path from 'path';
import { RowDataPacket } from 'mysql2/promise';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection on startup
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to MySQL database on startup');
    connection.release();
  } catch (error) {
    console.error('Failed to connect to MySQL database on startup:', error);
    process.exit(1);
  }
})();

// Email transporter setup
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('EMAIL_USER or EMAIL_PASS is not defined in the environment variables');
  process.exit(1);
}
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Test email transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('Failed to verify email transporter on startup:', error);
    process.exit(1);
  } else {
    console.log('Email transporter verified successfully on startup');
  }
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
    if (!email || typeof email !== 'string') {
      console.log('Validation failed: Email is missing or not a string');
      return res.status(400).json({ message: 'Email is required and must be a string' });
    }

    if (!email.endsWith('@gmail.com')) {
      console.log('Validation failed: Email must be a Gmail address');
      return res.status(400).json({ message: 'Please provide a valid Gmail address' });
    }

    console.log('Attempting to get database connection...');
    const connection = await pool.getConnection();
    console.log('Database connection acquired');

    try {
      // Check if email exists
      console.log(`Checking if email exists: ${email}`);
      const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM waitlist WHERE email = ?', [email]);
      console.log(`Query result: ${rows.length} rows found`);

      if (rows.length > 0) {
        console.log('Email already registered:', email);
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Insert new email
      console.log(`Inserting new email: ${email}`);
      await connection.execute('INSERT INTO waitlist (email, timestamp) VALUES (?, NOW())', [email]);
      console.log('Email inserted successfully');

      // Send email
      console.log(`Sending confirmation email to: ${email}`);
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
      console.log('Confirmation email sent successfully');

      // Send success response
      console.log('Sending success response');
      res.status(200).json({ message: 'Successfully joined waitlist' });
    } finally {
      console.log('Releasing database connection');
      connection.release();
    }
  } catch (error) {
    console.error('Error processing waitlist request:', error);
    // Use a type guard to safely access error.message
    if (error instanceof Error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error', error: 'An unknown error occurred' });
    }
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