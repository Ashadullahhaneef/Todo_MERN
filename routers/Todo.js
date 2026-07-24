const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  createTodo,
  updateTodo,
  deleteTodo,
  getAllTodos,
} = require("../controllers/Todo");

router.post("/createTodo", auth, createTodo);
router.put("/updateTodo", auth, updateTodo);
router.delete("/deleteTodo", auth, deleteTodo);
router.get("/getAllTodos", auth, getAllTodos);

module.exports = router;
