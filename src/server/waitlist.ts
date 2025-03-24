import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { RowDataPacket } from 'mysql2/promise';

// Load environment variables
dotenv.config();

// Log the MySQL configuration for debugging
console.log('MySQL Configuration:', {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT || '3306 (default)',
});

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: parseInt(process.env.MYSQL_PORT || '3306'), // Add custom port, default to 3306 if not specified
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection on startup
(async () => {
  try {
    console.log('Attempting to connect to MySQL database on startup (waitlist.ts)...');
    const connection = await pool.getConnection();
    console.log('Successfully connected to MySQL database on startup (waitlist.ts)');
    connection.release();
  } catch (error) {
    console.error('Failed to connect to MySQL database on startup (waitlist.ts):', error);
    process.exit(1);
  }
})();

// Email transporter setup
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('EMAIL_USER or EMAIL_PASS is not defined in the environment variables (waitlist.ts)');
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
    console.error('Failed to verify email transporter on startup (waitlist.ts):', error);
    process.exit(1);
  } else {
    console.log('Email transporter verified successfully on startup (waitlist.ts)');
  }
});

/**
 * Adds an email to the waitlist in MySQL and sends a confirmation email.
 * @param {string} email - The email to add to the waitlist.
 * @returns {Promise<{ success: boolean, message?: string }>} - Result of the operation.
 */
export async function addToWaitlist(email: string) {
  console.log('addToWaitlist called with email:', email);

  try {
    // Validate email
    if (!email || typeof email !== 'string') {
      console.log('Validation failed: Email is missing or not a string');
      return { success: false, message: 'Email is required and must be a string' };
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
        console.log('Email already in waitlist:', email);
        return { success: false, message: 'Email already in waitlist' };
      }

      // Insert new email
      console.log(`Inserting new email: ${email}`);
      await connection.execute('INSERT INTO waitlist (email, timestamp) VALUES (?, NOW())', [email]);
      console.log('Email inserted successfully');

      // Send confirmation email
      console.log(`Sending confirmation email to: ${email}`);
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
      console.log('Confirmation email sent successfully');

      console.log('Returning success response');
      return { success: true };
    } finally {
      console.log('Releasing database connection');
      connection.release();
    }
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to add to waitlist: ${error.message}`);
    } else {
      throw new Error('Failed to add to waitlist: An unknown error occurred');
    }
  }
}