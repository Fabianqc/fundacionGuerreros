const crypto = require('crypto');

// Check if argon2 is available
let argon2;
try {
    argon2 = require('argon2');
} catch (e) {
    console.error('\x1b[31mError: argon2 library is not found.\x1b[0m');
    console.error('Please ensure you have installed dependencies by running:');
    console.error('\x1b[36mnpm install\x1b[0m');
    process.exit(1);
}

const email = 'fabian05demayo@gmail.com';
const password = 'Faqc05..';

async function generate() {
    try {
        console.log('Generating hash for password...');
        const hash = await argon2.hash(password);
        const uuid = crypto.randomUUID();

        // SQL Statement based on provided Screenshot
        // Columns: UUID (uuid), Pashash (bytea), Nivel (int), Email (varchar), Status (varchar)
        // Note: We cast the hash string to bytea.
        const sql = `
INSERT INTO "Usuario" ("UUID", "Pashash", "Nivel", "Email", "Status", "Personas_UUID")
VALUES (
  '${uuid}', 
  '${hash}'::bytea, 
  1, 
  '${email}', 
  'ACTIVE', 
  NULL
);
    `;

        console.log('\n\x1b[32m--- COPY THIS SQL TO YOUR DB CLIENT ---\x1b[0m');
        console.log(sql.trim());
        console.log('\x1b[32m---------------------------------------\x1b[0m');
        console.log(`\nGenerated UUID: ${uuid}`);
        console.log(`User: ${email}`);
    } catch (err) {
        console.error('Failed to generate hash:', err);
    }
}

generate();
