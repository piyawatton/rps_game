import pgPromise from 'pg-promise';
const pgp = pgPromise();
const connectionString = process.env.POSTGRES_URL;
const db = pgp(`${connectionString}?sslmode=require`);

export default db;
