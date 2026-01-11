import Comment from "../models/comment.model.js";
import Post from "../models/Post.model.js";
import mongoose from "mongoose";
export const getComments=async(req,res)=>{
  try{
    const { postId } = req.params;
    if(!mongoose.Types.ObjectId.isValid(postId)){
      return res.status(400).json({ message: "Invalid post ID"});
    }
    const comments = await Comment.find({ post: postId })
      .populate("author", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(comments);
  }catch(error){
    res.status(500).json({ message: "Failed to fetch comments"});
  }
};
export const addComment=async(req,res)=>{
  try{
    const{postId}=req.params;
    const{text}=req.body;
    if(!req.user){
      return res.status(401).json({ message: "Unauthorized"});
    }
    if(!text){
      return res.status(400).json({ message: "Comment text is required"});
    }
    if(!mongoose.Types.ObjectId.isValid(postId)){
      return res.status(400).json({ message: "Invalid post ID" });
    }
    const post = await Post.findById(postId);
    if(!post){
      return res.status(404).json({ message: "Post not found"});
    }
    const comment=await Comment.create({
      text,
      post:postId,
      author:req.user._id,
    });
    const populatedComment=await comment.populate("author","name");
    res.status(201).json(populatedComment);
  }catch(error){
    console.error(error);
    res.status(500).json({ message: "Failed to add comment"});
  }
};
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Optional: allow only author to delete
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await comment.deleteOne();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete comment" });
  }
};
