import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CheckCircle, CirclePlay } from "lucide-react";
import React from "react";

const CourseProgress = () => {
  const isCompleated = true;
  return (
    <div className="max-w-7xl mx-auto p-4 mt-20 ">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Course Title</h1>
        <Button>Compleated</Button>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>hello</div>
          <div className="mt-2">
            <h3 className="font-medium text-lg">Lecture 1: Introduction</h3>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="text-xl font-semibold mb-4">Course Lecture</h2>
          <div className="flex-col overflow-y-auto">
            {[1, 2, 3, 4].map((item, index) => (
              <Card
                key={index}
                className="mb-3 hover:cursor-pointer transition transform"
              >
                <CardContent className="flex justify-between items-center p-4">
                  <div className="flex items-center">
                    {isCompleated ? (
                      <CheckCircle size={24} className="text-green-400 mr-2" />
                    ) : (
                      <CirclePlay className="text-gray-400 mr-2" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        Introduction
                      </CardTitle>
                    </div>
                  </div>
                  <Badge variant={"outline"} className="bg-green-300">
                    Compleated
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
