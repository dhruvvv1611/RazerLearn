import Course from "../models/courseModel.js";
import CoursePurchase from "../models/purchasedCoursesModel.js";
import Lecture from "../models/lectureModel.js";
import User from "../models/userModel.js";

export const createCoursePurchase = async (req, res) => {
  try {
    const userId = req.id; // User ID from authentication middleware
    const { courseId } = req.body;

    // Fetch the course details
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    // Check if the user has already purchased the course
    const existingPurchase = await CoursePurchase.findOne({
      courseId,
      userId,
      status: "completed",
    });
    if (existingPurchase) {
      return res
        .status(400)
        .json({ message: "You have already purchased this course." });
    }

    // Create a new course purchase record with "completed" status
    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "completed", // Directly mark as completed
    });

    await newPurchase.save();

    // Make all lectures in the course accessible to the user
    if (course.lectures && course.lectures.length > 0) {
      await Lecture.updateMany(
        { _id: { $in: course.lectures } },
        { $set: { isPreviewFree: true } }
      );
    }

    // Update user's enrolled courses
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { enrolledCourses: courseId } },
      { new: true }
    );

    // Add the user to the course's enrolled students list
    await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { enrolledStudents: userId } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course purchased and access granted successfully!",
    });
  } catch (error) {
    console.error("Error purchasing course:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const purchased = await CoursePurchase.findOne({ userId, courseId });

    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    return res.status(200).json({
      course,
      purchased: !!purchased, // true if purchased, false otherwise
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");

    if (!purchasedCourse || purchasedCourse.length === 0) {
      return res.status(404).json({
        purchasedCourse: [],
      });
    }

    return res.status(200).json({
      purchasedCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
