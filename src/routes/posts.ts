import express from 'express'
import type { Request, Response } from 'express'
import { db } from '../db/setup'
import { posts as postSchema, users as userSchema } from '../db/schema'
import { desc, eq } from 'drizzle-orm'

const router = express.Router()

/**
 * Get all posts
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    // const posts = await db.select().from(postSchema)
    // 关键查询
    const posts = await db.select().from(postSchema).leftJoin(userSchema, eq(postSchema.userId, userSchema.id))
    res.json({
      success: true,
      message: 'Posts fetched successfully',
      data: posts
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to get posts', data: null })
  }
})

router.get('/page', async(req: Request, res: Response) => {
  try {
    const { pageNumber, pageSize = 10 } = req.query || {}
    const posts = await db.select().from(postSchema).orderBy(desc(postSchema.createdAt)).limit(Number(pageSize)).offset(Math.max(Number(pageNumber) - 1, 0) * Number(pageSize))
    return res.json({
      success: true,
      message: 'Posts fetched successfully',
      data: posts
    })
  }catch(error) {
    console.error(error, '分页查询失败')
    return res.status(500).json({ success: false, message: 'Unable to get posts', data: null })
  }
})

/**
 * Get a post by id
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ success: false, message: 'id is required', data: null })
    }
    const post = await db.select().from(postSchema).where(eq(postSchema.id, Number(id)))
    return res.json({
      success: true,
      message: 'Post fetched successfully',
      data: post
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to get post', data: null })
  }
})



router.post('/add', async (req: Request, res: Response) => {
  const { title, content, userId, } = req.body
  if (!userId) {
    return res.status(400).json({ success: false, message: 'userId is required', data: null })
  }
  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'name and content are required', data: null })
  }
  try {
    const post = await db.insert(postSchema).values({ title, content, userId })
    return res.json({
      success: true,
      message: 'Added successfully',
      data: post
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'name and email are required', data: null })
  }
})

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, content, } = req.body
    if (!id) {
      return res.status(400).json({ success: false, message: 'id is required', data: null })
    }
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'title and content are required', data: null })
    }
    const post = await db.update(postSchema).set({ title, content }).where(eq(postSchema.id, Number(id)))
    return res.json({
      success: true,
      message: 'Updated successfully',
      data: post
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to update post', data: null })
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ success: false, message: 'id is required', data: null })
    }
    const post = await db.delete(postSchema).where(eq(postSchema.id, Number(id)))
    return res.json({
      success: true,
      message: 'Deleted successfully',
      data: post
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to delete post', data: null })
  }
})

export default router

