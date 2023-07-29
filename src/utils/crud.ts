// crud.ts

import db from './db';

type Table = 'User' | 'Score' | 'Score_Log';

async function createRecord<T extends object>(table: Table, data: T): Promise<string> {
  try {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

    const query = `INSERT INTO "${table}" (${columns}) VALUES (${placeholders}) RETURNING id`;
    const result = await db.one<{ id: string }>(query, values);
    return result.id;
  } catch (error) {
    console.error(`Error creating record in ${table} table:`, error);
    throw error;
  }
}

async function getAllRecords<T>(table: Table): Promise<T[]> {
  try {
    const query = `SELECT * FROM "${table}"`;
    const records = await db.any<T>(query);
    return records;
  } catch (error) {
    console.error(`Error getting records from ${table} table:`, error);
    throw error;
  }
}

async function getRecordById<T>(table: Table, id: string): Promise<T | null> {
  try {
    const query = `SELECT * FROM "${table}" WHERE id = $1`;
    const record = await db.oneOrNone<T>(query, id);
    return record;
  } catch (error) {
    console.error(`Error getting record from ${table} table by ID:`, error);
    throw error;
  }
}

async function getRecordByColumn<T>(table: Table, column: keyof T, value: string): Promise<T | null> {
  try {
    const query = `SELECT * FROM "${table}" WHERE "${column as string}" = $1`;
    const record = await db.oneOrNone<T>(query, value);
    return record;
  } catch (error) {
    console.error(`Error getting record from ${table} table by ID:`, error);
    throw error;
  }
}

type Filter<T> = Partial<{
  [K in keyof T]: string;
}>;
async function getRecordByColumns<T>(table: Table, filter: Filter<T>): Promise<T | null> {
  try {
    const columns = Object.keys(filter).join(', ');
    const values = Object.values(filter);

    const query = `SELECT * FROM "${table}" WHERE (${columns}) = (${values.map((_, i) => `$${i + 1}`).join(', ')})`;
    const record = await db.oneOrNone<T>(query, values);
    return record;
  } catch (error) {
    console.error(`Error getting record from ${table} table by columns:`, error);
    throw error;
  }
}


async function updateRecord<T>(table: Table, id: string, data: Partial<T>): Promise<void> {
  try {
    const setColumns = Object.keys(data).map((key, index) => `"${key}" = $${index + 2}`).join(', ');
    const values = [id, ...Object.values(data)];

    const query = `UPDATE "${table}" SET ${setColumns} WHERE id = $1`;
    await db.none(query, values);
  } catch (error) {
    console.error(`Error updating record in ${table} table:`, error);
    throw error;
  }
}

async function deleteRecord(table: Table, id: string): Promise<void> {
  try {
    const query = `DELETE FROM "${table}" WHERE id = $1`;
    await db.none(query, id);
  } catch (error) {
    console.error(`Error deleting record from ${table} table:`, error);
    throw error;
  }
}

export {
  createRecord,
  getAllRecords,
  getRecordById,
  getRecordByColumn,
  getRecordByColumns,
  updateRecord,
  deleteRecord,
};
