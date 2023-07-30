// crud.ts

import { OrderByDirection } from '../type/enum';
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

export type Condition<T> = {
  column?: keyof T,
  value?: string,
  orderByColumn: keyof T,
  orderByDirection: OrderByDirection;
  limit?: number;
  offset?: number;
  joinTable?: Table; // New property for the join table name
  joinOnColumn?: keyof T; // New property for the column to join on

}

async function getRecordsByColumn<T>(
  table: Table,
  conditions: Condition<T>
): Promise<T[] | null> {
  const {
    column,
    value,
    orderByColumn,
    orderByDirection = OrderByDirection.ASC,
    limit,
    offset,
    joinTable,
    joinOnColumn,
  } = conditions;

  try {
    const getTableAlias = (tableName: Table) => `tbl_${tableName}`
    // Use the provided table alias or the original table name
    const tableAlias = getTableAlias(table);
    const tableAliasOrName = `"${table}" AS ${tableAlias}`;

    const tableJoinAlias = joinTable ? getTableAlias(joinTable) : '';
    const tableJoinName = joinTable ? `"${joinTable}" AS ${tableJoinAlias}` : '';

    let query = `SELECT ${tableAlias}.*`;

    if (joinTable && joinOnColumn) {
      query += `, ${tableJoinAlias}.*`;
    }

    query += ` FROM ${tableAliasOrName}`;

    if (joinTable && joinOnColumn) {
      query += `
        JOIN ${tableJoinName}
        ON ${tableAlias}.${joinOnColumn as string} = ${tableJoinAlias}.id
      `;
    }

    if (column && value) {
      query += ` WHERE ${tableAlias}.${column as string} = $1`;
    }

    query += ` ORDER BY ${tableAlias}.${orderByColumn as string} ${orderByDirection}`;

    if (limit !== undefined) {
      query += ` LIMIT ${limit}`;
    }

    if (offset !== undefined) {
      query += ` OFFSET ${offset}`;
    }
    console.log('query',query);
    
    const record = await db.many<T>(query, value);
    return record;
  } catch (error) {
    console.error(`Error getting record from ${table} table:`, error);
    return null;
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
  getRecordsByColumn,
  getRecordByColumns,
  updateRecord,
  deleteRecord,
};
