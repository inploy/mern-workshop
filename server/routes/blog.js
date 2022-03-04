const express = require("express");
const router = express.Router();
const {
  create,
  getAllBlogs,
  getBlog,
  removeBlog,
  updateBlog,
} = require("../controllers/blogController");
const { requireLogin } = require("../controllers/authController");

router.post("/create", requireLogin, create);
router.get("/blogs", getAllBlogs);
router.get("/blog/:slug", getBlog);
router.delete("/blog/:slug", removeBlog);
router.put("/blog/:slug", requireLogin, updateBlog);

module.exports = router;
