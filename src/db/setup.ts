import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'

if (!process.env.DATABASE_URL) {
  throw new Error("DB credentials error")
}
// 创建连接池
const poolConnection = mysql.createPool(process.env.DATABASE_URL as string)

export const pool = poolConnection
export const db = drizzle(poolConnection)