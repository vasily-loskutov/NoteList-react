const express = require("express");
const router = express.Router({ mergeParams: true });
const Note = require("../models/Note");
const auth = require("../middleware/auth.middleware");
const { check, validationResult } = require("express-validator");
router
  .route("/:noteId")
  .patch(auth, async (req, res) => {
    try {
      const { noteId: _id } = req.params;
      console.log(_id);
      if (_id) {
        const newNote = await Note.findByIdAndUpdate(_id, req.body, {
          new: true,
        });
        res.send(newNote);
      } else {
        res.status(401).json({
          message: "Unauthorized",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Поробуйте позже",
      });
    }
  })
  .delete(auth, async (req, res) => {
    try {
      const { noteId } = req.params;
      const removedNote = await Note.findById(noteId);
      if (removedNote.userId.toString() === req.user._id) {
        await removedNote.remove();
        return res.send(null);
      }
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Поробуйте позже",
      });
    }
  });
router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const list = await Note.find({ userId: req.user._id });

      res.status(200).send(list);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Поробуйте позже",
      });
    }
  })
  .post(auth, [
    check("title", "Это поле обязательно для ввода1").isLength({ min: 1 }),
    check("description", "Это поле обязательно для ввода").isLength({
      min: 1,
    }),
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            message: "INVALID_DATA",
          });
        }
        console.log(req.user._id);
        const newNote = await Note.create({
          ...req.body,
          userId: req.user._id,
        });
        res.status(201).send(newNote);
      } catch (error) {
        res.status(500).json({
          message: "На сервере произошла ошибка. Поробуйте позже",
        });
      }
    },
  ]);

module.exports = router;
