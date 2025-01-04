import Course from "../models/courseModel.js";
import { deleteMedia, deleteVideo, uploadMedia } from "../utils/cloudinary.js";
import Lecture from "../models/lectureModel.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });

    return res.status(201).json({ course, message: "Course created" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to create course", success: false });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;

    const courses = await Course.find({ creator: userId });

    if (!courses) {
      return res
        .status(404)
        .json({ message: "No courses found", success: false });
    }

    return res.status(200).json({ courses });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to fetch courses", success: false });
  }
};

export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      courseTitle,
      courseSubtitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const thumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }
    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMedia(publicId); // delete old image
      }
      // upload a thumbnail on clourdinary
      courseThumbnail = await uploadMedia(thumbnail.path);
    }

    const updateData = {
      courseTitle,
      courseSubtitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail?.secure_url,
    };

    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    return res.status(200).json({
      course,
      message: "Course updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create course",
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);

    if (!course) {
      res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(201).json({
      course,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const courseId = req.params.courseId; // Correctly extract courseId from params

    if (!lectureTitle || !courseId) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Validate the course first
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Create the lecture
    const lecture = await Lecture.create({
      lectureTitle,
      course: courseId, // Associate with the course
    });

    // Add lecture ID to the course's lectures array
    course.lectures.push(lecture._id);
    await course.save();

    res.status(201).json({ lecture, message: "Lecture created successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to create lecture", success: false });
  }
};

export const getLecture = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId).populate("lectures");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({ lecture: course.lectures });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch lecture", success: false });
  }
};

export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;

    const { courseId, lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }

    // update lecture
    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
    lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    // Ensure the course still has the lecture id if it was not aleardy added;
    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }
    return res.status(200).json({
      lecture,
      message: "Lecture updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to edit lectures",
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }
    // delete the lecture from couldinary as well
    if (lecture.publicId) {
      await deleteVideo(lecture.publicId);
    }

    // Remove the lecture reference from the associated course
    await Course.updateOne(
      { lectures: lectureId }, // find the course that contains the lecture
      { $pull: { lectures: lectureId } } // Remove the lectures id from the lectures array
    );

    return res.status(200).json({
      message: "Lecture removed successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to remove lecture",
    });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }
    return res.status(200).json({
      lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get lecture by id",
    });
  }
};
