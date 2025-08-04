const { Client } = require('pg');
require('dotenv').config();

async function setupDatabase() {
    // Determine if we're in production (Render) or development (local)
    const isProduction = process.env.NODE_ENV === 'production' || process.env.PGHOST?.includes('render.com');
    
    const clientConfig = {
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: 'postgres', // Connect to default database first
    };

    // Add SSL configuration only for production/Render
    if (isProduction) {
        clientConfig.ssl = {
            require: true,
            rejectUnauthorized: false
        };
    }

    const client = new Client(clientConfig);

    try {
        await client.connect();
        console.log('✅ Connected to PostgreSQL');

        // Check if database exists
        const dbExists = await client.query(
            "SELECT 1 FROM pg_database WHERE datname = $1",
            [process.env.PGDATABASE]
        );

        if (dbExists.rows.length === 0) {
            // Create database
            await client.query(
                `CREATE DATABASE "${process.env.PGDATABASE}"`
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