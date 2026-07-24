const { json } = require("express");

//create todo
const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(403).json({
        success: false,
        message: "Please Filled All Required Area",
      });
    }
    const user = req.user.id;
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Please Login Again",
      });
    }
    const newTodo = await Todo.create({ user: user.id, title, description });
    return res.status(200).json({
      success: true,
      message: "New Todo is Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could Not Create Todo, Please Try Again",
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { todoId } = req.body;
    const userId = req.user.id;
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Not Authorized, todo not found in Todo Schema",
      });
    }
    if (todo.user.toString() !== userId) {
      return res.status(401).json({
        success: false,
        message: "user invalid in this todo object",
      });
    }
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "Todo Is Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Todo Is Not Updated, Please Try Again",
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.body;
    const userId = req.body.id;

    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo Not Found",
      });
    }
    if (todo.user.toString() !== userId) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }
    await Todo.findByIdAndDelete(todoId);
    return res.status(200).json({
      success: true,
      message: "Todo Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Couldnot Delete Todo, Please Try Again",
    });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const userId = req.body.id;
    const todos = await Todo.find({ user: userId }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: todos,
      message: "Get All Todos Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could Not Fetch Todos, Please Try Again",
    });
  }
};

module.exports = { createTodo, updateTodo, deleteTodo, getAllTodos };
