import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";

/**
 * GET all comments for a post
 * GET /api/posts/:postId/comments
 */
export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};

/**
 * ADD a comment
 * POST /api/posts/:postId/comments
 */
export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({
      text,
      post: postId,
      author: req.user._id,
    });

    const populatedComment = await comment.populate("author", "name");

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment" });
  }
};
