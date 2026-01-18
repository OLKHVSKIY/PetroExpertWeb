import mongoose from 'mongoose';
import BlogPost from '../models/BlogPost.model.js';

export const getPosts = async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.warn('MongoDB not connected, returning empty posts');
      return res.json({
        posts: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
      });
    }

    const { category, search, limit = 10, page = 1 } = req.query;
    const query = { isPublished: true };

    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const posts = await BlogPost.find(query)
      .populate('author', 'name')
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await BlogPost.countDocuments(query);

    res.json({
      posts: posts || [],
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Return empty array if MongoDB error
    if (error.name === 'MongoServerError' || error.message.includes('buffering timed out')) {
      console.warn('MongoDB connection error, returning empty posts');
      return res.json({
        posts: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
      });
    }
    res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await BlogPost.findOne({
      $or: [
        { _id: req.params.id },
        { slug: req.params.id }
      ],
      isPublished: true
    }).populate('author', 'name');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const post = await BlogPost.create({
      ...req.body,
      author: req.user._id
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
