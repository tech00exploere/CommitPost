import express from "express";
import {
  getComments,
  addComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

// /api/posts/:postId/comments
router.get("/:postId/comments", getComments);
router.post("/:postId/comments", auth, addComment);
router.delete("/:postId/comments/:commentId", auth, deleteComment);

export default router;
