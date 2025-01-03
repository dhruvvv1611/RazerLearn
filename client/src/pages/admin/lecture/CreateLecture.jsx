import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const isLoading = false;
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;

  const createLectureHandler = () => {};
  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Add Lecture Details For Your Course
        </h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
          molestias!
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
          <Button variant="outline" onClick={() => navigate(`/admin/course/edit/${courseId}`)}>
            Back to course
          </Button>
          {isLoading ? (
            <Button disabled className="flex items-center gap-2">
              Loading..
              <Loader2 className="w-4 h-4 animate-spin" />
            </Button>
          ) : (
            <Button onClick={createLectureHandler}>Create</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
