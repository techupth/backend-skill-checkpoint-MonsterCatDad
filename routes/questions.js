const express = require("express");
const router = express.Router();
const Question = require("../models/question");

// Getting all
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getQuestion, (req, res) => {
  res.json(res.question);
});

// Creating one
router.post("/", async (req, res) => {
  const question = new Question({
    name: req.body.name,
    questionedToWeb: req.body.questionedToWeb,
  });
  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch("/:id", getQuestion, async (req, res) => {
  if (req.body.name != null) {
    res.question.name = req.body.name;
  }
  if (req.body.questionedToWeb != null) {
    res.question.questionedToWeb = req.body.questionedToWeb;
  }
  try {
    const updatedQuestion = await res.question.save();
    res.json(updatedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", getQuestion, async (req, res) => {
  try {
    await res.question.deleteOne();
    res.json({ message: "Deleted Question" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// delete all
router.delete("/", async (req, res) => {
  try {
    await Question.deleteMany();
    res.json({ message: "Deleted all Question" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getQuestion(req, res, next) {
  let question;
  try {
    question = await Question.findById(req.params.id);
    if (question == null) {
      return res.status(404).json({ message: "Cannot find question" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.question = question;
  next();
}

module.exports = router;
