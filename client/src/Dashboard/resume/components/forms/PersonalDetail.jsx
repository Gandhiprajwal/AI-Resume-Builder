import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

export const PersonalDetail = ({ enableNext }) => {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [FormData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // console.log(params?.resumeId);
  }, []);
  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;
    setFormData({
      ...FormData,
      [name]: value,
    });
    setResumeInfo({ ...resumeInfo, [name]: value });
  };
  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: FormData,
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        // console.log(res);
        enableNext(true);
        setLoading(false);
        toast.success("Details Updated!");
      },
      (err) => {
        // console.log(err);
        setLoading(false);
      }
    );
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with basic information</p>

      <form action="" onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label htmlFor="firstName" className="text-sm">
              First Name
            </label>
            <Input
              defaultValue={resumeInfo?.firstName}
              placeholder="First Name"
              name="firstName"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="text-sm">
              Last Name
            </label>
            <Input
              defaultValue={resumeInfo?.lastName}
              placeholder="Last Name"
              name="lastName"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="jobTitle" className="text-sm">
              Job Title
            </label>
            <Input
              defaultValue={resumeInfo?.jobTitle}
              placeholder="Ex. Full Stack Developer"
              name="jobTitle"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="address" className="text-sm">
              Address
            </label>
            <Input
              defaultValue={resumeInfo?.address}
              placeholder="Ex. Street 5, Preet Vihar, New Delhi"
              name="address"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-sm">
              Phone
            </label>
            <Input
              defaultValue={resumeInfo?.phone}
              placeholder="Phone"
              name="phone"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <Input
              defaultValue={resumeInfo?.email}
              placeholder="Email Address"
              name="email"
              type="email"
              required
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" size="sm" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};
