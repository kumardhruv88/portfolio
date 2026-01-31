import express from 'express';
import { getPosts, getPostBySlug, createPost } from '../controllers/blogController.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:slug', getPostBySlug);
router.post('/', createPost); // Add auth middleware

export default router;
