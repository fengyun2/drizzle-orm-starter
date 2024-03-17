import { relations, sql } from 'drizzle-orm'
import { mysqlTable, serial, timestamp, varchar, text, bigint } from 'drizzle-orm/mysql-core'

/**
 * 用户表
 */
export const users = mysqlTable("users", {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
})

/**
 * 文章表
 */
export const posts = mysqlTable("posts", {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: bigint("user_id", { mode: 'number' })
    .notNull()
    .references(() => users.id), // inline foreign key
  createdAt: timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
})

/**
 * 评论表
 */
export const comments = mysqlTable("comments", {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  postId: bigint('post_id', { mode: 'number' }).notNull().references(() => posts.id), // inline foreign key
  userId: bigint("user_id", { mode: 'number' })
    .notNull()
    .references(() => users.id), // inline foreign key
  text: text('text').notNull(),
  createdAt: timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
})

// export const postsRelations = relations(posts, ({ one, many }) => ({
//   user: one(users, { fields: [posts.userId], references: [users.id] }),
//   comments: many(comments),
// }))

// export const usersRelations = relations(users, ({ many }) => ({
//   posts: many(posts)
// }))

// export const commentsRelations = relations(comments, ({ one }) => ({
//   post: one(posts, { fields: [comments.postId], references: [posts.id] }),
//   user: one(users, { fields: [comments.userId], references: [users.id] }),
// }))