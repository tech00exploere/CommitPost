import express from "express";
import { getComments, addComment, deleteComment } from "../controllers/comment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router({ mergeParams: true }); // important for req.params.postId

router.get("/", getComments);          // GET /api/posts/:postId/comments
router.post("/", protect, addComment); // POST /api/posts/:postId/comments
router.delete("/:commentId", protect, deleteComment); // DELETE /api/posts/:postId/comments/:commentId

export default router;
