import nodemailer from 'nodemailer';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { RowDataPacket } from 'mysql2';
// Load environment variables
dotenv.config();

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
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Adds an email to the waitlist in MySQL and sends a confirmation email.
 * @param {string} email - The email to add to the waitlist.
 * @returns {Promise<{ success: boolean, message?: string }>} - Result of the operation.
 */
export async function addToWaitlist(email:string) {
  try {
    // Check if the email already exists
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM emails WHERE email = ?', [email]);
    if (rows.length > 0) {
      return { success: false, message: 'Email already in waitlist' };
    }

    // Add the email to the waitlist
    await pool.query('INSERT INTO emails (email) VALUES (?)', [email]);

    // Send confirmation email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to FIRA AI Waitlist!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Welcome to FIRA AI!</h1>
          <p>Thank you for joining our waitlist. We're excited to have you on board!</p>
          <p>We'll keep you updated on our progress and let you know as soon as you can access FIRA AI.</p>
          <p>Best regards,<br>The FIRA AI Team</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    throw new Error('Failed to add to waitlist');
  }
}