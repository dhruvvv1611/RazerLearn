import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCoursePurchase,
  getCourseDetailWithPurchaseStatus,
  getAllPurchasedCourse,
} from "../controllers/cousePurchaseController.js";

const router = express.Router();

// Route to initiate a course purchase
router.route("/purchase").post(isAuthenticated, createCoursePurchase);

// Route to complete a course purchase (manual payment confirmation)


// Route to get course details along with purchase status
router
  .route("/course/:courseId/detail-with-status")
  .get(isAuthenticated, getCourseDetailWithPurchaseStatus);

// Route to get all completed purchased courses
router.route("/").get(isAuthenticated, getAllPurchasedCourse);

export default router;
