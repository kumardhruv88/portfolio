import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/blogs.json');

const readData = () => {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

export const getPosts = async (req, res) => {
  try {
    const posts = readData();
    // Filter published only (though our mock data is all published)
    const published = posts.filter(p => p.status === 'published');
    res.json(published);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostBySlug = async (req, res) => {
  try {
    const posts = readData();
    const post = posts.find(p => p.slug === req.params.slug);
    
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    // Increment views (simple in-memory like logic, writing back)
    post.views = (post.views || 0) + 1;
    writeData(posts);
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
    try {
        const posts = readData();
        const newPost = {
            id: Date.now(),
            views: 0,
            likes: 0,
            ...req.body
        };
        posts.push(newPost);
        writeData(posts);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
