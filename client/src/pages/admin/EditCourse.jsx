import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CourseTab from "./CourseTab";

const EditCourse = () => {

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">Add Details Of Your Course</h1>
        <Link to="lecture">
          <Button variant="outline" >
            Go to lectures Page <ArrowRight />
          </Button>
        </Link>
      </div>
      <CourseTab />
    </div>
  );
};

export default EditCourse;
