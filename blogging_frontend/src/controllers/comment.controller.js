import Comment from "../models/Comment.model.js";

// GET comments
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Failed to load comments" });
  }
};

// ADD comment
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const comment = await Comment.create({
      text,
      post: req.params.postId,
      author: req.user._id,
    });

    const populated = await comment.populate("author", "name email");

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment" });
  }
};

// DELETE comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted", id: req.params.commentId });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete comment" });
  }
};
