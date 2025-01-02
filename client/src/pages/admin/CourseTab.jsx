import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const [editCourse, { data, isError, isLoading, isSuccess }] =
    useEditCourseMutation();
  const navigate = useNavigate();
  const isPublished = true;
  const [input, setInput] = React.useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
  });

  const [thumbnailPreview, setThumbnailPreview] = React.useState(null);

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        return alert("File size exceeds 2MB.");
      }
      setInput({ ...input, courseThumbnail: file });
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);
    await editCourse(formData).unwrap();
    navigate("/admin/course");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course updated successfully" || data.message);
    }
    if (isError) {
      toast.error("Something went wrong" || data.message);
    }
  }, [isSuccess, isError]);
  return (
    <div className="h-full overflow-y-auto ">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-xl">
              Basic Information Of Course
            </CardTitle>
            <CardDescription className="text-sm">
              Apply your course title, description, and other details here.
            </CardDescription>
          </div>
          <div className="flex flex-row space-x-4">
            <Button variant="outline">
              {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <Button>Remove Course</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-5">
            <div>
              <Label>Course Title</Label>
              <Input
                type="text"
                name="courseTitle"
                placeholder="Enter course title"
                onChange={changeHandler}
                value={input.courseTitle}
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input
                type="text"
                name="subTitle"
                placeholder="Enter course title"
                onChange={changeHandler}
                value={input.subTitle}
              />
            </div>
            <div>
              <Label>Description</Label>
              <RichTextEditor input={input} setInput={setInput} />
            </div>
            <div className="flex items-center gap-4">
              <div>
                <Label>Category</Label>
                <Input
                  type="text"
                  name="category"
                  placeholder="Enter course category"
                  onChange={changeHandler}
                  value={input.category}
                />
              </div>
              <div>
                <Label>Course Level</Label>
                <Select onValueChange={selectCourseLevel}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advance">Advance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  name="coursePrice"
                  placeholder="Enter course price"
                  onChange={changeHandler}
                  value={input.coursePrice}
                />
              </div>
            </div>
            <div>
              <Label>Course Thumbnail</Label>
              <Input type="file" accept="image/*" onChange={selectThumbnail} />
              {thumbnailPreview && (
                <img
                  src={thumbnailPreview}
                  alt="thumbnail"
                  className=" h-32 w-30 mt-2"
                />
              )}
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate("/admin/course")}
                variant="outline"
              >
                Cancel
              </Button>
              <Button disabled={isLoading} onClick={updateCourseHandler}>
                {isLoading ? (
                  <>
                    Loading...
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseTab;
