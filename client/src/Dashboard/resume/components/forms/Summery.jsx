import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";

const Summery = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState();
  useEffect(() => {
    summery &&
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
  }, [summery]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Summary</h2>
      <p>Add Summary for your job title</p>
      <form className="mt-7">
        <div className="flex justify-between items-end">
          <label htmlFor="summary">Add Summary</label>
          <Button
            className="border-primary text-primary"
            size="sm"
            variant="outline"
          >
            Generate from AI
          </Button>
        </div>
        <Textarea
          defaultValue={resumeInfo?.summery}
          required
          className="mt-5"
          onChange={(e) => setSummery(e.target.value)}
        />
        <div className="mt-5 flex justify-end">
          <Button size="sm">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default Summery;
