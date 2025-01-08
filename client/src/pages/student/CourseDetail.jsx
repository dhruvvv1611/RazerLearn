import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SelectSeparator } from "@/components/ui/select";
import { useFetchCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, IndianRupee, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  console.log("courseId:", courseId); // Log courseId for debugging

  const { data, isLoading, isError } =
    useFetchCourseDetailWithStatusQuery(courseId);

  console.log("API Response Data:", data); // Log API response for debugging

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error fetching course details</div>;

  if (!data) return <div>No data available</div>;

  const { course, purchased } = data;

  const handleContinue = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="mt-20 space-y-3 ">
      <div className="bg-[#2d2f31] text-white">
        <div className="max-w-7xl mx-auto py-8 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {course?.courseTitle}
          </h1>
          <p className="text-base md:text-lg">{course?.courseSubtitle}</p>
          <p>
            Created By{" "}
            <span className="text-[#878eec]">{course?.creator?.name}</span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last Updated: {course?.createdAt?.split("T")[0]}</p>
          </div>
          <p>Enrolled Students: {course?.enrolledStudents?.length}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10 ">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: course?.description }}
          />
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>{course?.lectures?.length} Lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course?.lectures.map((lecture, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <span>
                    {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>{lecture?.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                <ReactPlayer
                  width={"100%"}
                  height={"100%"}
                  url={course?.lectures[0]?.videoUrl}
                  controls={true}
                />
              </div>
              <h1 className="text-lg md:text-xl font-semibold">
                {course?.lectures[0]?.lectureTitle}
              </h1>
              <SelectSeparator className="my-2 " />
              <h1 className="text-lg md:text-xl font-semibold flex items-center" ><IndianRupee size={18}/>{course?.coursePrice}</h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button onClick={handleContinue} className="w-full">
                  Go to Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} className="w-full" />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
