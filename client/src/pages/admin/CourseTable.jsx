import { Button } from "@/components/ui/button";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CourseTable = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetCreatorCourseQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
      </div>
    );
  }

  if (!data?.courses?.length) {
    return (
      <div className="text-center mt-6">
        <p className="text-gray-500">No courses found. Start by creating a new course!</p>
        <Button onClick={() => navigate(`create`)}>Create A New Course</Button>
      </div>
    );
  }

  return (
    <div>
      <Button onClick={() => navigate(`create`)} className="mb-4">
        Create A New Course
      </Button>
      <Table className="border mt-4">
        <TableCaption>A list of all your courses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">
                {course?.coursePrice || "NA"}
              </TableCell>
              <TableCell>
                <Badge>{course?.isPublished ? "Published" : "Draft"}</Badge>
              </TableCell>
              <TableCell>{course?.courseTitle}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate(`edit/${course._id}`)}
                >
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
