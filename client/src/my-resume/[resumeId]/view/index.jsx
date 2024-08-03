import React, { useEffect, useState } from "react";
import Header from "@/components/custom/Header";
import { Button } from "../../../components/ui/button";
import ResumePreview from "../../../Dashboard/resume/components/ResumePreview";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import GlobalApi from "../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { RWebShare } from "react-web-share";

const ViewResume = () => {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();
  useEffect(() => {
    GetResumeInfo();
  }, []);
  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((res) => {
      // console.log(res.data.data);
      setResumeInfo(res.data.data);
    });
  };

  const HandleDownload = () => {
    window.print();
  };
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-10 mx-10 md:mx-10 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ultimate AI generates Resume id ready!
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and you can share unique
            url with your friends and family.
          </p>
          <div className="flex justify-between px-44 my-10">
            <Button onClick={HandleDownload}>Download</Button>
            <RWebShare
              data={{
                text: "Hello Everyone, This is my resume please open it.",
                url:
                  import.meta.env.VITE_BASE_URL +
                  "/my-resume/" +
                  resumeId +
                  "/view",
                title:
                  resumeInfo?.firstName +
                  " " +
                  resumeInfo?.lastName +
                  " Resume",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div className="my-10 mx-10 md:mx-10 lg:mx-36">
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default ViewResume;
