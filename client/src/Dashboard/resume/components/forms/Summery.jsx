import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import GlobalApi from "../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Brain, LoaderCircle } from "lucide-react";
import { AIChatSession } from "../../../../../service/AIModel";

const prompt =
  "Job Title: {jobTitle}, Depends on job title give me summery for my resume within 4-5 lines in JSON format {experienceLevel and Summary} with field experience level and Summery with defined experience type for Fresher, Mid-level, Experienced";
const Summery = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState();
  useEffect(() => {
    summery &&
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
  }, [summery]);

  const cleanAndParseJSON = (jsonString) => {
    // Remove any extraneous whitespace or newlines
    const cleanedString = jsonString.replace(/\s+/g, " ").trim();

    // Attempt to parse the cleaned string
    try {
      return JSON.parse(`[${cleanedString}]`);
    } catch (error) {
      console.error("Failed to parse cleaned JSON string:", error);
      throw error;
    }
  };

  const GenerateSummeryFormAI = async () => {
    try {
      setLoading(true);
      const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
      // console.log(PROMPT);

      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();
      // console.log(responseText);

      try {
        const cleanedAndParsedResponse = cleanAndParseJSON(responseText);
        setAiGeneratedSummeryList(cleanedAndParsedResponse);
      } catch (jsonError) {
        // console.error("Failed to parse JSON:", jsonError);
        // console.error("Response text:", responseText);
        // Handle the error or show a user-friendly message
      }
    } catch (error) {
      // console.error("Error in GenerateSummeryFormAI:", error);
      // Handle the error or show a user-friendly message
    } finally {
      setLoading(false);
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summery: summery,
      },
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        enableNext(true);
        setLoading(false);
        toast.success("Details Updated!");
      },
      (err) => {
        console.log(err);
        toast.error("Something went wrong!");
        setLoading(false);
      }
    );
  };
  return (
    <>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for your job title</p>
        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label htmlFor="summary">Add Summary</label>
            <Button
              className="border-primary text-primary flex gap-2"
              size="sm"
              variant="outline"
              type="button"
              onClick={() => GenerateSummeryFormAI()}
            >
              <Brain className="h-4 w-4" /> Generate from AI
            </Button>
          </div>
          <Textarea
            defaultValue={resumeInfo?.summery}
            required
            className="mt-5"
            onChange={(e) => setSummery(e.target.value)}
          />
          <div className="mt-5 flex justify-end">
            <Button type="submit" size="sm" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
      {aiGeneratedSummeryList && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummeryList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummery(item?.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">
                {item?.experienceLevel}
              </h2>
              <p>{item?.Summary}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Summery;
