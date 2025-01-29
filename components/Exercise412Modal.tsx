"use client";

import { useState, ReactNode } from "react";
import { IoClose } from "react-icons/io5";
import { IoExpand, IoContract } from "react-icons/io5";
import { IoPrint } from "react-icons/io5";

interface ExerciseModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function ExerciseModal({ children, onClose }: ExerciseModalProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 
      ${isExpanded ? "p-0" : "p-8"} transition-all duration-300`}
    >
      <div
        className={`bg-primary text-white rounded-xl shadow-2xl w-full flex flex-col
        ${isExpanded ? "max-w-full h-full" : "max-w-2xl max-h-[80vh]"} transition-all duration-300`}
      >
        {/* Header - fixed height */}
        <div className="p-4 flex justify-between items-center border-b border-white/20 shrink-0">
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
          >
            {isExpanded ? 
              <IoContract className="w-6 h-6" /> : 
              <IoExpand className="w-6 h-6" />
            }
          </button>
          <button 
            onClick={onClose} 
            className="text-accent hover:bg-white/10 p-2 rounded-lg transition-colors"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        {/* Content - scrollable */}
        <div className="flex-1 overflow-auto min-h-0 p-4">
          {children}
        </div>

        {/* Footer - fixed height */}
        <div className="p-4 border-t border-white/20 flex justify-end shrink-0">
          <button 
            onClick={() => window.print()} 
            className="flex items-center gap-2 text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
          >
            <IoPrint className="w-5 h-5" />
            Print
          </button>
        </div>
      </div>
    </div>
  );
}