import React, { useContext, useEffect, useState } from "react";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { Button } from "../../../../components/ui/button";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const Education = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [educationalList, setEducationList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  useEffect(() => {
    resumeInfo && setEducationList(resumeInfo.education);
  }, []);

  const [loading, setLoading] = useState(false);
  const handleChange = (event, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
  };
  const AddEducation = () => {
    setEducationList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };
  const RemoveEducation = () => {
    setEducationList((educationalList) => educationalList.slice(0, -1));
  };
  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest),
      },
    };
    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
      (res) => {
        console.log(res);
        setLoading(false);
        toast.success("Details Updated!");
      },
      (err) => {
        setLoading(false);
        toast.error("Server Error, Please try again!");
      }
    );
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList,
    });
  }, [educationalList]);
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Education</h2>
        <p>Add your educational details</p>
        <div>
          {educationalList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div className="col-span-2">
                  <label htmlFor="">University Name</label>
                  <Input
                    defaultValue={item?.universityName}
                    type="text"
                    name="universityName"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label htmlFor="">Degree</label>
                  <Input
                    defaultValue={item?.degree}
                    type="text"
                    name="degree"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label htmlFor="">Major</label>
                  <Input
                    defaultValue={item?.major}
                    type="text"
                    name="major"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label htmlFor="">Start Date:</label>
                  <Input
                    defaultValue={item?.startDate}
                    type="text"
                    name="startDate"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label htmlFor="">End Date:</label>
                  <Input
                    defaultValue={item?.endDate}
                    type="text"
                    name="endDate"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="">Description</label>
                  <Textarea
                    defaultValue={item?.description}
                    type="text"
                    name="description"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-5">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="text-primary"
                onClick={AddEducation}
              >
                {" "}
                +Add More Education{" "}
              </Button>
              <Button
                variant="outline"
                className="text-primary"
                onClick={RemoveEducation}
              >
                {" "}
                -Remove{" "}
              </Button>
            </div>

            <Button
              type="submit"
              size="sm"
              disabled={loading}
              onClick={() => onSave()}
            >
              {" "}
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
