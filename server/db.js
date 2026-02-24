import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize DB file in the server directory
const dbPath = path.join(__dirname, 'data.db');
const db = new Database(dbPath, { verbose: console.log });

// Create the unified submissions table if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        whatsapp TEXT,
        age TEXT,
        gender TEXT,
        country TEXT,
        weight TEXT,
        height TEXT,
        goals TEXT,
        injuries TEXT,
        plan TEXT,
        type TEXT DEFAULT 'intake',
        submittedAt TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        frontPic TEXT,
        sidePic TEXT,
        backPic TEXT
    )
`);

// Add columns if they don't exist (for existing databases)
const addColumn = (col, type) => {
    try {
        db.exec(`ALTER TABLE submissions ADD COLUMN ${col} ${type}`);
    } catch (e) {
        // Column already exists, ignore
    }
};

addColumn('whatsapp', 'TEXT');
addColumn('country', 'TEXT');
addColumn('weight', 'TEXT');
addColumn('height', 'TEXT');
addColumn('injuries', 'TEXT');
addColumn('frontPic', 'TEXT');
addColumn('sidePic', 'TEXT');
addColumn('backPic', 'TEXT');

/**
 * Save a new submission to the database.
 */
export function saveSubmission(data) {
    const stmt = db.prepare(`
        INSERT INTO submissions (
            name, email, phone, whatsapp, age, gender, country, 
            weight, height, goals, injuries, plan, type, 
            submittedAt, status, frontPic, sidePic, backPic
        )
        VALUES (
            @name, @email, @phone, @whatsapp, @age, @gender, @country, 
            @weight, @height, @goals, @injuries, @plan, @type, 
            @submittedAt, @status, @frontPic, @sidePic, @backPic
        )
    `);

    return stmt.run({
        name: data.name || 'Unknown',
        email: data.email || null,
        phone: data.phone || null,
        whatsapp: data.whatsapp || null,
        age: data.age || null,
        gender: data.gender || null,
        country: data.country || null,
        weight: data.weight || null,
        height: data.height || null,
        goals: data.goals || data.goal || data.motivation || null,
        injuries: data.injuries || null,
        plan: data.plan || 'General Inquiry',
        type: data.type || 'intake',
        submittedAt: data.submittedAt || new Date().toISOString(),
        status: 'pending',
        frontPic: data.frontPic || null,
        sidePic: data.sidePic || null,
        backPic: data.backPic || null
    });
}

/**
 * Retrieve all submissions, ordered by most recent first.
 */
export function getSubmissions() {
    const stmt = db.prepare(`SELECT * FROM submissions ORDER BY id DESC`);
    return stmt.all();
}

/**
 * Update the status of a specific submission (e.g., pending -> contacted).
 */
export function updateSubmissionStatus(id, status) {
    const stmt = db.prepare(`UPDATE submissions SET status = @status WHERE id = @id`);
    return stmt.run({ id, status });
}

export default db;
