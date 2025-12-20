import express from "express";
import cors from "cors";

import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// ===== CORS =====
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // server-side requests (Postman)
      const allowedOrigins = [
        "http://localhost:5173", // local frontend
        process.env.CLIENT_URL,  // deployed frontend
      ].filter(Boolean);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ===== Body Parser =====
app.use(express.json());

// ===== Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Mount comment routes **under posts**
import commentRouter from "./routes/comment.routes.js";
app.use("/api/posts/:postId/comments", commentRouter);

// ===== Health Check =====
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

export default app;
