import express from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from '../controllers/blog.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', protect, admin, createPost);
router.put('/:id', protect, admin, updatePost);
router.delete('/:id', protect, admin, deletePost);

export default router;
