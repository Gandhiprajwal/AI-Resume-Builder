import React, { useContext, useEffect, useState } from "react";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import RichTextEditor from "./RichTextEditor";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

const Experience = () => {
  const [experienceList, setExperienceList] = useState([{ ...formField }]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const handleChange = (index, e) => {
    const newEntries = experienceList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };
  const AddNewExperience = () => {
    setExperienceList([...experienceList, { formField }]);
  };
  const RemoveExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };
  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value || "";
    setExperienceList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
  }, [experienceList]);
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add your previous Job experience</p>
        <div>
          {experienceList.map((field, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label htmlFor="" className="text-xs">
                    Position Title
                  </label>
                  <Input
                    required
                    name="title"
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-xs">
                    Company Name
                  </label>
                  <Input
                    name="companyName"
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-xs">
                    City
                  </label>
                  <Input name="city" onChange={(e) => handleChange(index, e)} />
                </div>
                <div>
                  <label htmlFor="" className="text-xs">
                    State
                  </label>
                  <Input
                    name="state"
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-xs">
                    Start Date
                  </label>
                  <Input
                    name="startDate"
                    type="date"
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-xs">
                    End Date
                  </label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div className="col-span-2">
                  <RichTextEditor
                    index={index}
                    onRichTextEditorChange={(e) =>
                      handleRichTextEditor(e, "workSummery", index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-5">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-primary"
              onClick={AddNewExperience}
            >
              {" "}
              +Add More Experience{" "}
            </Button>
            <Button
              variant="outline"
              className="text-primary"
              onClick={RemoveExperience}
            >
              {" "}
              -Remove{" "}
            </Button>
          </div>

          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default Experience;
