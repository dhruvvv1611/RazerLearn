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
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  useEditLecutreMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
} from "@/features/api/courseApi";
import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const LectureTab = () => {
  const navigate = useNavigate();
  const [lectureTitle, setLectureTitle] = React.useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = React.useState(null);
  const [isFree, setIsFree] = React.useState(false);
  const [mediaProgress, setMediaProgress] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const { courseId, lectureId } = useParams();

  const media_api = "http://localhost:3000/api/v1/media";

  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  console.log(lectureData);

  useEffect(() => {
    if (lectureData) {
      setLectureTitle(lectureData?.lecture?.lectureTitle);
      setIsFree(lectureData?.lecture?.isPreviewFree);
    }
  }, [lectureData, lectureId]);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select a valid file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setMediaProgress(true);

    try {
      const res = await axios.post(`${media_api}/upload-video`, formData, {
        onUploadProgress: ({ loaded, total }) => {
          setUploadProgress(Math.round((loaded / total) * 100));
        },
      });

      if (res.data.success) {
        setUploadVideoInfo({
          videoUrl: res.data.data.url,
          publicId: res.data.data.public_id,
        });
        toast.success("Video Uploaded Successfully");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Failed to upload video");
    } finally {
      setMediaProgress(false);
    }
  };

  const [editLecture, { isLoading, isError, isSuccess }] =
    useEditLecutreMutation();

  const [
    removeLecture,
    {
      isLoading: removeLoading,
      isError: removeError,
      isSuccess: removeSuccess,
    },
  ] = useRemoveLectureMutation();

  const updateLecture = async () => {
    try {
      await editLecture({
        courseId,
        lectureId,
        lectureTitle,
        videoInfo: uploadVideoInfo,
        isPreviewFree: isFree,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update lecture:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Lecture Updated Successfully");
    }
    if (isError) {
      toast.error("Failed to update lecture");
    }
    if (removeSuccess) {
      toast.success("Lecture removed successfully");
      navigate(`/admin/course/edit/${courseId}/lecture`);
    }
    if (removeError) {
      toast.error("Failed to remove lecture");
    }
  }, [isSuccess, isError, removeSuccess, removeError]);

  const removeLectureHandler = async () => {
    try {
      await removeLecture({ courseId, lectureId }).unwrap();
    } catch (error) {
      console.error("Error removing lecture:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>Make Changes and Upload Your Course</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="destructive"
            className="w-fit h-9"
            onClick={removeLectureHandler}
            disabled={removeLoading}
          >
            {removeLoading ? (
              <div className="flex items-center gap-2">
                Loading...
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Introduction To Javascript"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          />
        </div>
        <div>
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            className="w-fit cursor-pointer"
            onChange={fileChangeHandler}
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch
            id="is-free"
            checked={isFree}
            onCheckedChange={(checked) => setIsFree(checked)}
          />
          <Label htmlFor="is-free">Is This Video Free?</Label>
        </div>
        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}
        <div className="mt-4">
          <Button
            onClick={updateLecture}
            disabled={isLoading}
            variant={isLoading ? "outline" : "default"}
          >
            {isLoading ? "Updating..." : "Update Lecture"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
