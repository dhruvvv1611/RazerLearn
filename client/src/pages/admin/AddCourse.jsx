import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { toast } from "sonner";

const AddCourse = () => {
  const navigate = useNavigate();
  const [courseTitle, setCourseTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [createCourse, { data, isError, isLoading, isSuccess, error }] =
    useCreateCourseMutation();

  const createCourseHandler = async () => {
    if (!courseTitle || !category) {
      return toast.error("Please fill all fields");
    }
    await createCourse({ courseTitle, category });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course Created Successfully");
      navigate("/admin/course");
    }
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [isSuccess, isError, data, error, navigate]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">Add Course Details For New Course</h1>
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
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Course Name"
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="min-w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="ReactJS">React JS</SelectItem>
                <SelectItem value="NextJS">Next JS</SelectItem>
                <SelectItem value="DataScience">Data Science</SelectItem>
                <SelectItem value="JavaScript">JavaScript</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Java">Java</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/courses")}>
            Back
          </Button>
          {isLoading ? (
            <Button disabled className="flex items-center gap-2">
              Loading..
              <Loader2 className="w-4 h-4 animate-spin" />
            </Button>
          ) : (
            <Button onClick={createCourseHandler}>Create</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
