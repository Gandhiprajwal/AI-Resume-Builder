import React, { useContext, useState } from "react";
import {
  Editor,
  EditorProvider,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  Separator,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
} from "react-simple-wysiwyg";
import { Button } from "../../../../components/ui/button";
import { Brain, LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { toast } from "sonner";
import { AIChatSession } from "../../../../../service/AIModel";

const prompt =
  "position title: {positionTitle}, Depends on position title give me 5-7 bullet points for my experience in resume, give me result in HTML format (give only the points)";
const RichTextEditor = ({ onRichTextEditorChange, index }) => {
  const [value, setValue] = useState();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  function onChange(e) {
    setValue(e.target.value);
    onRichTextEditorChange(e);
  }

  //   const cleanAndParseJSON = (jsonString) => {
  //     // Remove any extraneous whitespace or newlines
  //     const cleanedString = jsonString.replace(/\s+/g, " ").trim();

  //     // Attempt to parse the cleaned string
  //     try {
  //       return JSON.parse(`[${cleanedString}]`);
  //     } catch (error) {
  //       console.error("Failed to parse cleaned JSON string:", error);
  //       throw error;
  //     }
  //   };

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    if (!resumeInfo.experience[index].title) {
      toast("Please Add Position Title");
    }
    const PROMPT = prompt.replace(
      "{positionTitle}",
      resumeInfo?.experience[index].title
    );
    const result = await AIChatSession.sendMessage(PROMPT);
    const responseText = await result.response.text();
    // console.log(result.response.text());
    // const cleanedAndParsedResponse = cleanAndParseJSON(responseText);
    const resp = result.response.text();
    setValue(resp.replace("[", "").replace("]", ""));
    setLoading(false);
  };
  return (
    <div>
      <div className="flex justify-between my-2">
        <label htmlFor="">Summary</label>
        <Button
          onClick={GenerateSummeryFromAI}
          variant="outline"
          className="flex gap-2 border-primary text-primary"
        >
          {" "}
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-2 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor value={value} onChange={onChange}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
