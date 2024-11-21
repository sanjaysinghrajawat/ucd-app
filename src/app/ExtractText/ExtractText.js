"use client";
import { useContext, useState } from "react";
import Button from "../components/Button";
import toast, { Toaster } from "react-hot-toast";
import { AppContext } from "../Wrapper/Context";

const ExtractText = () => {
  const [inputText, setInputText] = useState("");
  const [output, setOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { selectedModel } = useContext(AppContext);

  // Handle extracting information
  const handleExtract = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text for analysis.");
      return;
    }

    setIsProcessing(true);
    const formData = {
      text: inputText,
      model_type: selectedModel,
    };
    console.log("Sending data:", formData); // Debug log

    try {
      const response = await fetch("http://127.0.0.1:8000/extract-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to extract information. Please try again.");
      }

      const data = await response.json();
      if (data.error) {
        setOutput("Error: " + data.error);
      } else {
        const { summary, key_points } = data;
        let extractedInfo = `Summary:\n${summary}\n\nKey Points:\n`;
        extractedInfo += key_points?.length
          ? key_points
              .map((point, index) => `${index + 1}. ${point}`)
              .join("\n")
          : "No key points found.";
        setOutput(extractedInfo);

        // await saveReport({
        //   date: new Date(),
        //   model: selectedModel,
        //   input_type: "text",
        //   input_text: inputText,
        //   summary: summary,
        //   key_points: key_points,
        // });
      }
    } catch (error) {
      toast.error(error.message || "Unable to connect to the server.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Function to save report
  const saveReport = async (processedData) => {
    if (!processedData) {
      toast.error("No processed data to save.");
      return;
    }

    // Check if processedData is an object or string and adjust accordingly
    const reportData =
      typeof processedData === "string"
        ? {
            date: new Date(),
            model: selectedModel,
            input_type: "text",
            input_text: inputText,
            summary: processedData
              .split("\n\nKey Points:\n")[0]
              .replace("Summary:\n", ""),
            key_points:
              processedData
                .split("\n\nKey Points:\n")[1]
                ?.split("\n")
                .map((point) => point.replace(/^\d+\.\s*/, "")) || [],
          }
        : processedData;

    try {
      const response = await fetch("http://127.0.0.1:8000/save-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });
      if (!response.ok) {
        throw new Error("Failed to save the report.");
      }
      const result = await response.json();
      toast.success(result.msg);
    } catch (error) {
      toast.error("Error saving report: " + error.message);
    }
  };

  return (
    <div className="p-4">
      <div className="ms-24">
        <h1 className="text-3xl font-bold mb-4">Analyze Text</h1>
        <h1 className="mb-4">Paste text for analysis</h1>
      </div>
      <div className="w-3/4 mx-auto mt-10">
        {/* Input Text Area */}
        <textarea
          className="w-full p-2 border rounded mb-4 ring-2 outline-blue-700"
          rows="7"
          placeholder="Paste raw text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        {/* Extract Information Button */}
        <Button
          variant="primary"
          onClick={handleExtract}
          disabled={isProcessing}
        >
          {isProcessing ? "Extracting..." : "Extract Information"}
        </Button>

        {/* Transparent/Placeholder Text Area for Output */}
        <div className="mt-4">
          <textarea
            className="w-full p-2 border rounded bg-transparent resize-none focus:outline-none placeholder-gray-400"
            rows="10"
            value={output}
            placeholder="Extracted information will appear here..."
            readOnly
          />
        </div>
        <Button
          className={"bg-green-600 hover:bg-green-500 text-white"}
          onClick={() =>
            saveReport({
              date: new Date(),
              model: selectedModel,
              input_type: "text",
              input_text: inputText,
              summary: output
                .split("\n\nKey Points:\n")[0]
                .replace("Summary:\n", ""),
              key_points:
                output
                  .split("\n\nKey Points:\n")[1]
                  ?.split("\n")
                  .map((point) => point.replace(/^\d+\.\s*/, "")) || [],
            })
          }
        >
          Save to History
        </Button>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ExtractText;
