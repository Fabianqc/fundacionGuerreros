const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Fundacion',
    password: '1234',
    port: 5432,
});

async function checkTables() {
    try {
        await client.connect();
        console.log('Connected to database.');

        const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'Fundacion'
    `);

        console.log('Tables in Fundacion schema:');
        res.rows.forEach(row => {
            console.log(`- ${row.table_name}`);
        });

    } catch (err) {
        console.error('Database connection error:', err);
    } finally {
        await client.end();
    }
}

checkTables();
