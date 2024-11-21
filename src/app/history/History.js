"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Button from "../components/Button";

const History = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch analysis history from the backend
  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/history");
      if (!response.ok) {
        throw new Error("Failed to fetch history.");
      }
      const data = await response.json();
      setReports(data.reports);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch history on component mount
  useEffect(() => {
    fetchHistory();
  }, []);

  // Handle report selection for detailed view
  const handleViewDetails = (report) => {
    setSelectedReport(report);
  };

  // Handle clearing history
  const clearHistory = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/clear-history", {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to clear history.");
      }
      toast.success("History cleared successfully!");
      setReports([]);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="ms-24 p-6">
      <div className="flex justify-between ">
        <h1 className="text-3xl font-bold mb-6">Analysis History</h1>
        <Button
          variant="danger"
          className={"bg-red-600 hover:bg-red-500 text-white h-10"}
          onClick={clearHistory}
        >
          Clear History
        </Button>
      </div>
      <div className="mt-6">
        {isLoading ? (
          <p>Loading...</p>
        ) : reports.length > 0 ? (
          <div className="space-y-4">
            {reports.map((report, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:bg-gray-100 cursor-pointer"
                onClick={() => handleViewDetails(report)}
              >
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(report.date).toLocaleString()}
                </p>
                <p>
                  <strong>Model:</strong> {report.model}
                </p>
                <p>
                  <strong>Input Type:</strong> {report.input_type}
                </p>
                <p>
                  <strong>Summary:</strong> {report.summary.slice(0, 100)}...
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No analysis history found.</p>
        )}
      </div>

      {/* Detailed View Modal */}
      {selectedReport && (
        <div className="inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">Detailed Report</h2>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedReport.date).toLocaleString()}
            </p>
            <p>
              <strong>Model:</strong> {selectedReport.model}
            </p>
            <p>
              <strong>Input:</strong>{" "}
              {selectedReport.input_text || selectedReport.file_name}
            </p>
            <p>
              <strong>Summary:</strong> {selectedReport.summary}
            </p>
            <p>
              <strong>Key Points:</strong>
            </p>
            <ul className="list-disc ml-6">
              {selectedReport.key_points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
            <Button variant="secondary" onClick={() => setSelectedReport(null)}>
              Close
            </Button>
          </div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default History;
