import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Course from "./Course";

const Profile = () => {
  const isLoading = false;
  const enrolledCourses = [1, 2, 3, 4, 5];
  return (
    <div className="max-w-4xl mx-auto px-4 my-24">
      <h1 className="font-bold text-2xl text-center md:text-left">Profile</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24 md:w-34 md:h-34 mb-4  ">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h2 className="font-semibold text-gray-900 dark:text-gray-300">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                Gustavo Gus
              </span>
            </h2>
          </div>
          <div className="mb-2">
            <h2 className="font-semibold text-gray-900 dark:text-gray-300">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                gustavo@test.com
              </span>
            </h2>
          </div>
          <div className="mb-2">
            <h2 className="font-semibold text-gray-900 dark:text-gray-300">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                Instructor
              </span>
            </h2>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Name</Label>
                  <Input
                    type="text"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Profile</Label>
                  <Input type="file" className="col-span-3" accept="image/*" />
                </div>
              </div>
              <DialogFooter>
                {isLoading ? (
                  <Button disabled>
                    Loading..
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  </Button>
                ) : (
                  <Button>Save Changes</Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg ">Courses you are enrolled in</h1>
        <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {enrolledCourses.length === 0 ? 
            <h1>You haven't enrolled yet</h1>
           : (
            enrolledCourses.map((index) => <Course key={index} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
