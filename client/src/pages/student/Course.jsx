import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Badge } from "@/components/ui/badge";

const Course = () => {
  return (
    <div>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsVZbglsv53rS4z15Hu2F1DS4FqWOIhD2LNA&s"
            className="w-full h-36 object-cover rounded-t-lg"
            alt="course"
          />
        </div>
        <CardContent className="px-5 py-4 space-y-3">
          <h1 className="hover:underline font-bold text-lg truncate">
            React Full Course 2024
          </h1>
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-3 ">
              <Avatar classNameh="h-8 w-8">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="font-md text-sm">Walter White</h1>
            </div>
            <Badge className="bg-blue-500 text-white px-2 py-1 text-xs rounded-full">
              Advance
            </Badge>
          </div>
          <div className="text-lg font-bold ">
            <span>₹699</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Course;
