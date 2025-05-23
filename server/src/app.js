const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./features/auth/auth.routes.js");
const profileRoutes = require("./features/profile/profile.routes.js");
const postRoutes = require("./features/post/post.routes.js");
const userRoutes = require("./features/user/user.routes");

const uploadRoutes = require("./routes/upload.routes");

const connectDB = require("./config/db");
const responseFormatter = require("./middlewares/responseFormatter");
const authMiddleware = require("./middlewares/authMiddleware");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

connectDB();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(responseFormatter);

app.use("/api/auth", authRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/upload", uploadRoutes);

app.use(errorHandler);

module.exports = app;
