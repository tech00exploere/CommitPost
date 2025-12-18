import express from "express";
import { getComments, addComment } from "../controllers/comment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:postId/comments", getComments);
router.post("/:postId/comments", protect, addComment);

export default router;
