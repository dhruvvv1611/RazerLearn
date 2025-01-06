import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Badge } from "@/components/ui/badge";

const Course = ({ course }) => {
  return (
    <div>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative ">
          <img
            src={course?.courseThumbnail}
            className="w-full h-36 object-cover rounded-t-lg"
            alt="course"
          />
        </div>
        <CardContent className="px-5 py-4 space-y-3">
          <h1 className="hover:underline font-bold text-lg truncate">
            {course?.courseTitle}
          </h1>
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-3 ">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={
                    course?.creator?.photoUrl || "https://github.com/shadcn.png"
                  }
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="font-md text-sm">{course?.creator?.name}</h1>
            </div>
            <Badge className="bg-blue-500 text-white px-2 py-1 text-xs rounded-full">
              {course?.courseLevel}
            </Badge>
          </div>
          <div className="text-lg font-bold ">
            <span> ₹ {course?.coursePrice}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Course;
