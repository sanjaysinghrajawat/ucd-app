"use client";
import { useContext, useState, useEffect } from "react";
import { X, Upload, FileText } from "lucide-react";
import Button from "../components/Button";
import Progress from "../components/Progress";
import Sidebar, {
  SidebarContent,
  SidebarTrigger,
  SidebarHeader,
} from "../components/Sidebar";
import { AppContext } from "../Wrapper/Context";
import toast, { Toaster } from "react-hot-toast";
import { Oval } from "react-loader-spinner";

export default function FileUpload() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isQAProcessing, setIsQAProcessing] = useState(false);
  const [processedData, setProcessedData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const { selectedModel } = useContext(AppContext);
  useEffect(() => {
    fetchHistory();
  }, []);
  const fetchHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const response = await fetch("http://127.0.0.1:8001/history");
      if (!response.ok) {
        throw new Error("Failed to fetch history.");
      }
      const data = await response.json();
      setHistory(data.reports || []);
    } catch (error) {
      toast.error(error.message || "Unable to fetch history.");
    } finally {
      setIsLoadingHistory(false);
    }
  };
  const saveReport = async (processedData) => {
    if (!processedData || processedData.length === 0) {
      toast.error("No processed data to save.");
      return;
    }

    const reportData = {
      model: "t5",
      input_type: "file",
      input_text: "Sample input text",
      summary: "Sample summary",
      user_id: 1  // Ensure the user_id is included
    };
    console.log(reportData)
    try {
      const response = await fetch("http://127.0.0.1:8001/save-report", {
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
      fetchHistory(); // Refresh history after saving
    } catch (error) {
      toast.error("Error saving report: " + error.message);
    }
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const validFiles = selectedFiles.filter((file) =>
      [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type)
    );
    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  // Remove file from list
  const removeFile = (fileToRemove) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  // Process files (simulated)
  const handleProcess = async () => {
    setIsProcessing(true);
    const file = files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("model_type", selectedModel);

    try {
      const response = await fetch("http://127.0.0.1:8000/summarize", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process the file. Please try again.");
        setIsProcessing(false);
        return;
      }

      const data = await response.json();
      if (data.error) {
        setProcessedData([{ name: file.name, content: data.error }]);
      } else {
        setProcessedData([
          {
            name: file.name,
            summary: data.summary,
            keyPoints: data.key_points,
          },
        ]);
      }
    } catch (error) {
      toast.error(error.message || "Unable to connect to the server.");
      // console.error("Error:", error);
    } finally {
      setIsProcessing(false);
      setSidebarOpen(true); // Open sidebar after processing
    }
  };

  // Save button implementation
  <Button
    className={"bg-green-600 hover:bg-green-500 text-white m-4"}
    onClick={() => saveReport(processedData)}
  >
    Save to History
  </Button>;

  // Handle Q&A
  const handleQA = async () => {
    if (!processedData || !processedData[0]?.summary) {
      alert("Please upload a file and process it first.");
      return;
    }

    setIsQAProcessing(true);
    const formData = {
      context: processedData[0].summary,
      question: question,
      model_type: selectedModel,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/qa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.error("Error:", response.statusText);
        throw new Error("Failed to get an answer. Please try again.");
        return;
      }

      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      toast.error(error.message || "Unable to connect to the server.");
      // console.error("Error:", error);
    } finally {
      setIsQAProcessing(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="ms-24">
        <h1 className="text-3xl font-bold mb-4">Upload & Analyze files</h1>
        <h1 className="mb-4">Upload document for analysis</h1>
      </div>
      {/* File Upload Input */}
      <div className="flex justify-center">
        <div className="border-2 border-dashed rounded-lg p-8 text-center mt-6 w-1/2">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label htmlFor="fileInput" className="cursor-pointer">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag & drop files here, or click to select files
            </p>
            <p className="text-xs text-gray-500">
              (Only PDF, JPEG, PNG, and DOCX files are accepted)
            </p>
          </label>
        </div>
      </div>

      {/* Display Uploaded Files */}
      {files.length >= 0 && (
        <div className="mt-4 w-1/2 mx-auto flex flex-col">
          <h3 className="text-lg font-semibold mb-2 text-slate-700">
            Uploaded Files: {files.length}
          </h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-100 p-2 rounded"
              >
                <span className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  {file.name}
                </span>
                <Button
                  variant="ghost"
                  onClick={() => removeFile(file)}
                  className="ml-4"
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>

          {/* Process Files Button */}
          <Button
            className="mt-4 w-1/4 mx-auto"
            onClick={handleProcess}
            disabled={isProcessing}
            variant="primary"
          >
            {isProcessing ? "Processing..." : "Process Files"}
          </Button>
          {isProcessing && (
            <div className="flex justify-center mt-4">
              <Oval height={40} width={40} color="#4f46e5" />
            </div>
          )}
        </div>
      )}

      {/* Display Q&A Section if model is "model2" */}
      {selectedModel === "qa" && processedData && (
        <div className="mt-6 w-1/2 mx-auto flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Ask a Question:</h3>
          <input
            type="text"
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border p-2 w-full rounded mb-2"
          />
          <Button
            className="mt-2"
            onClick={handleQA}
            disabled={!question || isQAProcessing}
            variant="primary"
          >
            {isQAProcessing ? "Getting Answer..." : "Get Answer"}
          </Button>
          {isQAProcessing && (
            <div className="flex justify-center mt-4">
              <Oval height={40} width={40} color="#4f46e5" />
            </div>
          )}
        </div>
      )}

      {/* Button to Open Sidebar */}
      {processedData && (
        <div className="mt-4 w-1/6 mx-auto flex flex-col">
          <SidebarTrigger onClick={() => setSidebarOpen(true)} />
        </div>
      )}

      {/* Sidebar with Processed Data */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <SidebarHeader>Extracted Information</SidebarHeader>
        <SidebarContent>
          {/* Display Answer */}
          {answer && (
            <div className="mt-4 bg-gray-100 rounded p-4">
              <h4 className="font-bold">Answer:</h4>
              <p>{answer}</p>
            </div>
          )}
          {processedData ? (
            <div className="overflow-y-auto max-h-[80vh] p-4">
              {processedData.map((file, index) => (
                <div key={index} className="mb-4 bg-gray-100 rounded p-4">
                  <h3 className="font-semibold">{file.name}</h3>
                  <h4 className="mt-4 font-bold">Summary:</h4>
                  <p>{file.summary || "No summary generated."}</p>
                  {file.keyPoints && file.keyPoints.length > 0 && (
                    <>
                      <h4 className="mt-4 font-bold">Key Points:</h4>
                      <ul className="list-disc ml-5">
                        {file.keyPoints.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="p-4">No data processed yet.</p>
          )}
        </SidebarContent>
        <Button
          className={"bg-green-600 hover:bg-green-500 text-white m-4"}
          onClick={() => saveReport(processedData)}
        >
          Save to History
        </Button>
      </Sidebar>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
