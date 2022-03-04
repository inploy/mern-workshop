//ติดต่อกับฐานข้อมูล /ดำเนินการกับฐานข้อมูล
const slugify = require("slugify");
const Blogs = require("../models/blogs");
const { v4: uuidv4 } = require("uuid");

exports.create = (req, res) => {
  const { title, content, author } = req.body;
  let slug = slugify(title);

  if (!slug) {
    slug = uuidv4();
  }

  //validate
  switch (true) {
    case !title:
      return res.status(400).json({ error: "กรุณาป้อนชื่อบทความ" });
      break;
    case !content:
      return res.status(400).json({ error: "กรุณาป้อนเนื้อหาบทความ" });
      break;
  }

  //บันทึกข้อมูล
  Blogs.create({ title, content, author, slug }, (err, blog) => {
    console.log({ title, content, author, slug });
    if (err) {
      res.status(400).json({ error: "มีชื่อบทความซ้ำกัน" });
    }
    res.json(blog);
  });
};

exports.getAllBlogs = (req, res) => {
  Blogs.find({}).exec((err, blogs) => {
    if (err) console.log(err);
    res.json(blogs);
  });
};

exports.getBlog = (req, res) => {
  const { slug } = req.params;
  Blogs.findOne({ slug }).exec((err, blog) => {
    if (err) console.log(err);
    res.json(blog);
  });
};

exports.removeBlog = (req, res) => {
  const { slug } = req.params;
  Blogs.findOneAndRemove({ slug }).exec((err, blogs) => {
    if (err) console.log(err);
    res.json({ message: "ลบบทความเรียบร้อย" });
  });
};

exports.updateBlog = (req, res) => {
  const { slug } = req.params;
  const { title, content, author } = req.body;
  Blogs.findOneAndUpdate(
    { slug },
    { title, content, author },
    { new: true }
  ).exec((err, blog) => {
    if (err) console.log(err);
    res.json(blog);
  });
};
