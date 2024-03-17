import express from 'express'
import type { Request, Response } from 'express'
import { db } from '../db/setup'
import { users as userSchema } from '../db/schema'
import { eq } from 'drizzle-orm'

const router = express.Router()

/**
 * Get all users
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await db.select().from(userSchema)
    res.json({
      success: true,
      message: 'Users fetched successfully',
      data: users
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to get users', data: null })
  }
})

/**
 * Get a user by id
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ success: false, message: 'id is required', data: null })
    }
    const user = await db.select().from(userSchema).where(eq(userSchema.id, Number(id)))
    return res.json({
      success: true,
      message: 'User fetched successfully',
      data: user
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to get user', data: null })
  }
})

router.post('/add', async (req: Request, res: Response) => {
  const { name, email } = req.body
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'name and email are required', data: null })
  }
  try {
    const user = await db.insert(userSchema).values({ name, email })
    return res.json({
      success: true,
      message: 'Added successfully',
      data: user
    })
  } catch (error) {
    return res.status(500).json({ message: 'name and email are required', data: null })
  }
})

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, email } = req.body
    if (!id) {
      return res.status(400).json({ success: false, message: 'id is required', data: null })
    }
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'name and email are required', data: null })
    }
    const user = await db.update(userSchema).set({ name, email }).where(eq(userSchema.id, Number(id)))
    return res.json({
      success: true,
      message: 'Updated successfully',
      data: user
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to update user', data: null })
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ success: false, message: 'id is required', data: null })
    }
    const user = await db.delete(userSchema).where(eq(userSchema.id, Number(id)))
    return res.json({
      success: true,
      message: 'Deleted successfully',
      data: user
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to delete user', data: null })
  }
})

export default router

