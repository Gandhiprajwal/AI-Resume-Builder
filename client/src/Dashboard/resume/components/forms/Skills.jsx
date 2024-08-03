import React, { useContext, useEffect, useState } from "react";
import { Input } from "../../../../components/ui/input";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { Button } from "../../../../components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import GlobalApi from "../../../../../service/GlobalApi";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
const Skills = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);
  useEffect(() => {
    resumeInfo && setSkillsList(resumeInfo?.skills);
  }, []);
  const [loading, setLoading] = useState(false);
  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };
  const AddSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };
  const RemoveSkills = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };
  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList.map(({ id, ...rest }) => rest),
      },
    };
    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
      (res) => {
        setLoading(false);
        // console.log(res);
        toast.success("Skills Updated!");
      },
      (err) => {
        setLoading(false);
        toast.error("Skills not updated, Server Error! Please try again!");
      }
    );
  };
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Skills</h2>
        <p>Add your top professional key skills</p>
        <div>
          {skillsList.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border rounded-lg p-3"
            >
              <div>
                <label htmlFor="">Name</label>
                <Input
                  defaultValue={item?.name}
                  className="w-full"
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </div>
              <Rating
                defaultValue={item?.rating}
                style={{ maxWidth: 120 }}
                value={item?.rating}
                onChange={(v) => handleChange(index, "rating", v)}
              />
            </div>
          ))}
          <div className="flex justify-between mt-5">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="text-primary"
                onClick={AddSkills}
              >
                {" "}
                +Add More Education{" "}
              </Button>
              <Button
                variant="outline"
                className="text-primary"
                onClick={RemoveSkills}
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

export default Skills;
