import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useCreateCoursePurchaseMutation } from "@/features/api/purchaseApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const BuyCourseButton = ({ courseId }) => {
  const [createCoursePurchase, { isLoading }] =
    useCreateCoursePurchaseMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const purchaseHandler = async () => {
    try {
      await createCoursePurchase({ courseId }).unwrap();
      alert("Course purchased successfully!");
      setIsDialogOpen(false); // Close dialog after successful purchase
    } catch (error) {
      console.error("Error purchasing course:", error);
      alert("Failed to purchase course. Please try again.");
    }
  };

  return (
    <div>
      {/* Trigger button */}
      <Button onClick={() => setIsDialogOpen(true)} className="w-full">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader2 size={20} className="animate-spin" />
            <span className="ml-2">Processing...</span>
          </div>
        ) : (
          "Buy Course"
        )}
      </Button>

      {/* Alert Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Purchase</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to purchase this course? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={purchaseHandler}>
              {isLoading ? (
                <div className="flex items-center">
                  <Loader2 size={16} className="animate-spin mr-2" />
                  Confirming...
                </div>
              ) : (
                "Confirm Purchase"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BuyCourseButton;
