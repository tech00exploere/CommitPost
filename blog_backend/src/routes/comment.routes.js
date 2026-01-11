import express from "express";
import {
  getComments,
  addComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", getComments);
router.post("/", protect, addComment);
router.delete("/:commentId", protect, deleteComment);

export default router;
