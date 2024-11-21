"use client";
import { X } from "lucide-react";
import Button from "./Button";

// Sidebar Component
const Sidebar = ({ open, onClose, children }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-2/5 h-full bg-white shadow-lg transform ${
        open ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300`}
    >
      <div className="p-4">
        <button className="absolute top-2 right-2" onClick={onClose}>
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
};

// Sidebar Header
const SidebarHeader = ({ children }) => (
  <h2 className="text-lg font-semibold mb-4">{children}</h2>
);

// Sidebar Content
const SidebarContent = ({ children }) => (
  <div className="overflow-y-auto">{children}</div>
);

// Sidebar Trigger Button
const SidebarTrigger = ({ onClick }) => (
  <Button onClick={onClick} variant="outline">
    View Processed Data
  </Button>
);

export default Sidebar;
export { SidebarContent, SidebarTrigger, SidebarHeader };
