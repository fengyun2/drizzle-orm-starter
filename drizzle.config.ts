import type {Config} from 'drizzle-kit'

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    uri: process.env.DATABASE_URL as string,
  },
  driver: "mysql2"
} satisfies Config