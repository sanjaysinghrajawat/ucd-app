"use client";
import Link from "next/link";
import { useState } from "react";
import Dropdown from "./Dropdown";
import { usePathname } from "next/navigation";
import Button from "./Button";
import { useRouter } from "next/navigation";

const Navbar = ({ selectedModel, onModelChange, setSelectedModel }) => {
  const pathname = usePathname();

  const appliedCSS = "border-b-2 border-blue-500";
  const basicCSS =
    "py-2 px-4 transition duration-300 font-semibold text-slate-700";
  const hoverCSS = "hover:border-b-2 border-blue-500 text-slate-700";

  const options = [
    // { value: "model1", label: "Model 1 (Facebook)" },
    { value: "qa", label: "Q&A" },
    { value: "pegasus", label: "Pegasus" },
    { value: "t5", label: "T-5" },
  ];

  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/Login")
  }

  return (
    <div className="bg-white px-6 py-2 text-black flex justify-between items-center shadow-md">
      {/* Tabs */}
      <div className="flex space-x-6">
        <Link
          className={`${basicCSS} ${pathname === "/" ? appliedCSS : hoverCSS}`}
          href="/"
        >
          Extract from Files
        </Link>
        <Link
          className={`${basicCSS} ${
            pathname === "/ExtractText" ? appliedCSS : hoverCSS
          }`}
          href="/ExtractText"
        >
          Extract from Raw Text
        </Link>
        <Link
          className={`${basicCSS} ${
            pathname === "/history" ? appliedCSS : hoverCSS
          }`}
          href="/history"
        >
          History
        </Link>
      </div>

      {/* Dropdown for Model Selection */}
      <div className="flex items-center">
        <Dropdown
          label="Select Model"
          options={options}
          onSelect={(value) => setSelectedModel(value)}
        />
        <div className="ps-3 -me-2">
          <Button onClick={handleLogout} className={"bg-slate-400 hover:bg-slate-500"}>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
