import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;

  const [createLecture, { isLoading, isError, isSuccess }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  console.log(lectureData);

  const createLectureHandler = async () => {
    try {
      await createLecture({ lectureTitle, courseId }).unwrap();
    } catch (error) {
      console.error("Error creating lecture:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Lecture created successfully");
      setLectureTitle("");
      refetch();
    }
    if (isError) {
      toast.error("Failed to create lecture");
    }
  }, [isSuccess, isError]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Add Lecture Details For Your Course
        </h1>
        <p className="text-sm">
          Provide details about your lecture to add it to the course.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Lecture Name"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/edit/${courseId}`)}
          >
            Back to course
          </Button>
          {isLoading ? (
            <Button disabled className="flex items-center gap-2">
              Loading...
              <Loader2 className="w-4 h-4 animate-spin" />
            </Button>
          ) : (
            <Button onClick={createLectureHandler}>Create</Button>
          )}
        </div>
        <div className="mt-10">
          {lectureLoading ? (
            <p>Loading Lectures...</p>
          ) : lectureError ? (
            <p>Failed to load lectures. Please try again later.</p>
          ) : lectureData?.lecture?.length === 0 ? (
            <p>No lectures uploaded yet.</p>
          ) : (
            lectureData?.lecture?.map((lecture, index) => (
              <Lecture
                key={lecture._id}
                lecture={lecture}
                courseId={courseId}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
