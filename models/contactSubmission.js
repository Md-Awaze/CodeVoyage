const { Pool } = require('pg');

// Database configuration using standard PostgreSQL environment variables
const isProduction = process.env.NODE_ENV === 'production' || process.env.PGHOST?.includes('render.com');

const poolConfig = {
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST,
  database: process.env.PGDATABASE || 'contact_form',
  password: process.env.PGPASSWORD || 'mysecretpassword',
  port: process.env.PGPORT || 5432,
};

// Add SSL configuration only for production/Render
if (isProduction) {
  poolConfig.ssl = {
    require: true,
    rejectUnauthorized: false
  };
}

const pool = new Pool(poolConfig);

// Test database connection
let dbConnected = false;
const testConnection = async () => {
  try {
    await pool.query('SELECT 1');
    dbConnected = true;
    console.log('✅ Database connection successful');
  } catch (error) {
    dbConnected = false;
    console.log('⚠️ Database connection failed, using fallback storage');
  }
};

// Create contact_submissions table if it doesn't exist
const createTable = async () => {
  if (!dbConnected) {
    console.log('⚠️ Skipping table creation - database not connected');
    return;
  }
  
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        message TEXT NOT NULL,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(query);
    console.log('✅ Contact submissions table ready');
  } catch (error) {
    console.error('❌ Error creating contact_submissions table:', error);
  }
};

// Insert a new contact submission
const createSubmission = async (submission) => {
  if (!dbConnected) {
    console.log('📝 Contact submission (fallback storage):', submission);
    return { id: Date.now(), submitted_at: new Date() };
  }
  
  try {
    const { name, email, phone, message } = submission;
    const query = `
      INSERT INTO contact_submissions (name, email, phone, message)
      VALUES ($1, $2, $3, $4)
      RETURNING id, submitted_at;
    `;
    const values = [name, email, phone || null, message];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('❌ Error inserting contact submission:', error);
    // Fallback to console logging
    console.log('📝 Contact submission (fallback due to error):', submission);
    return { id: Date.now(), submitted_at: new Date() };
  }
};

// Get all contact submissions (for admin purposes)
const getAllSubmissions = async () => {
  if (!dbConnected) {
    console.log('⚠️ Database not connected, cannot fetch submissions');
    return [];
  }
  
  try {
    const query = `
      SELECT id, name, email, phone, message, submitted_at
      FROM contact_submissions
      ORDER BY submitted_at DESC;
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('❌ Error fetching contact submissions:', error);
    return [];
  }
};

// Get submission by ID
const getSubmissionById = async (id) => {
  if (!dbConnected) {
    console.log('⚠️ Database not connected, cannot fetch submission');
    return null;
  }
  
  try {
    const query = `
      SELECT id, name, email, phone, message, submitted_at
      FROM contact_submissions
      WHERE id = $1;
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error('❌ Error fetching contact submission by ID:', error);
    return null;
  }
};

// Initialize the database connection and table
const initialize = async () => {
  await testConnection();
  if (dbConnected) {
    await createTable();
  }
};

// Initialize when the module is loaded
initialize();

module.exports = {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  pool
}; 