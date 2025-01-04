import express from "express";
import {
  createCourse,
  getCreatorCourses,
  editCourse,
  getCourseById,
  createLecture,
  getLecture,
  getLectureById,
  removeLecture,
  editLecture
} from "../controllers/courseController.js";
import upload from "../utils/multer.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { get } from "mongoose";
const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);
router
  .route("/:courseId")
  .put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").get(isAuthenticated, getCourseById);
router.route("/:courseId/lecture").post(isAuthenticated, createLecture);
router.route("/:courseId/lecture").get(isAuthenticated, getLecture);
router.route("/:courseId/lecture/:lectureId").post(isAuthenticated, editLecture);
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);





export default router;
