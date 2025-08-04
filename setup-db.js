const { Client } = require('pg');
require('dotenv').config();

async function setupDatabase() {
    const client = new Client({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'password',
        database: 'postgres' // Connect to default database first
    });

    try {
        await client.connect();
        console.log('✅ Connected to PostgreSQL');

        // Check if database exists
        const dbExists = await client.query(
            "SELECT 1 FROM pg_database WHERE datname = $1",
            [process.env.DB_NAME || 'data_science_consultancy']
        );

        if (dbExists.rows.length === 0) {
            // Create database
            await client.query(
                `CREATE DATABASE "${process.env.DB_NAME || 'data_science_consultancy'}"`
            );
            console.log('✅ Database created successfully');
        } else {
            console.log('✅ Database already exists');
        }

    } catch (error) {
        console.error('❌ Database setup error:', error.message);
    } finally {
        await client.end();
    }
}

// Run setup
setupDatabase(); 