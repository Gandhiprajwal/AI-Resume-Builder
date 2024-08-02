import React from "react";

export const ExperiencePreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {resumeInfo?.experience.map((experience, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{ color: resumeInfo?.themeColor }}
          >
            {experience?.title}
          </h2>
          <h2 className="text-sx flex justify-between">
            {experience?.companyName}, {experience?.city}, {experience?.state}
            <span>
              {experience?.startDate}
              {" - "}
              {experience?.currentlyWorking ? "Present" : experience?.endDate}
            </span>
          </h2>
          {/* <p className="text-xs my-2">{experience?.workSummery}</p> */}
          <div dangerouslySetInnerHTML={{__html:experience?.workSummery}} className="text-sm my-2"/>
        </div>
      ))}
    </div>
  );
};
