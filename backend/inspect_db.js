
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

function loadEnv() {
    try {
        const envPath = path.resolve(__dirname, '.env');
        if (fs.existsSync(envPath)) {
            const envConfig = fs.readFileSync(envPath, 'utf8');
            envConfig.split('\n').forEach(line => {
                const [key, value] = line.split('=');
                if (key && value) {
                    process.env[key.trim()] = value.trim();
                }
            });
        }
    } catch (e) {
        console.error('Error loading .env', e);
    }
}

loadEnv();

async function checkSchema() {
    const client = new Client({
        user: process.env.DB_USERNAME,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    });

    try {
        await client.connect();

        // Check column type
        const colRes = await client.query(`
      SELECT column_name, data_type, udt_name 
      FROM information_schema.columns 
      WHERE table_schema = 'Fundacion' 
      AND table_name = 'Personas' 
      AND column_name = 'Sexo';
    `);
        console.log('Column Schema:', colRes.rows[0]);

        // Check type definition
        if (colRes.rows[0]?.udt_name) {
            const typeRes = await client.query(`
            SELECT typname, typtype
            FROM pg_type
            WHERE typname = $1;
         `, [colRes.rows[0].udt_name]);
            console.log('Type Definition:', typeRes.rows[0]);
        }

        // If it's an enum, check its values
        if (colRes.rows[0]?.udt_name && colRes.rows[0].data_type === 'USER-DEFINED') {
            t enumRes = await client.query(`
            SELECT e.enumlabel, n.nspname
            FROM pg_enum e
            JOIN pg_type t ON e.enumtypid = t.oid
            JOIN pg_namespace n ON t.typnamespace = n.oid
            WHERE t.typname = $1;
         `, [colRes.rows[0].udt_name]);
            ole.log('Enum Values:', enumRes.rows);


            tch(err) {
                ole.error('Error executing query', err);
    nally {
        t client.end();



                    checkSchema();
