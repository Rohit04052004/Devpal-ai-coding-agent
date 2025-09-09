import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "./ChatInterface";
import { Canvas } from "./Canvas";
import { generateCode } from "@/lib/api";

// Add TypeScript declaration for window.generatedCode
declare global {
  interface Window {
    generatedCode?: string;
  }
}

export const SplitInterface = () => {
  const [sidebarWidth, setSidebarWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const [canvasContent, setCanvasContent] = useState("");

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    const newWidth = Math.max(300, Math.min(800, e.clientX));
    setSidebarWidth(newWidth);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  // Add event listeners
  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isResizing]);

  // This function will be called from ChatInterface when a build request is made
  const handleBuildRequest = async () => {
    try {
      // Get the generated code from the backend response
      // The actual API call is handled in ChatInterface component
      // We just need to display the result here
      if (window.generatedCode) {
        setCanvasContent(window.generatedCode);
      } else {
        console.error('No generated code available');
        setCanvasContent(`
          <div style="padding: 20px; color: red;">
            <h2>Error</h2>
            <p>No generated code was received from the backend. Please try again.</p>
          </div>
        `);
      }
    } catch (error) {
      console.error('Error displaying generated code:', error);
      setCanvasContent(`
        <div style="padding: 20px; color: red;">
          <h2>Error</h2>
          <p>Failed to display the generated code. Please check the console for details.</p>
        </div>
      `);
    }
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Chat Sidebar */}
      <div 
        className="glass border-r border-white/10 flex flex-col"
        style={{ width: sidebarWidth }}
      >
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-semibold">AI Assistant</h2>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1">
          <ChatInterface onBuildRequest={handleBuildRequest} isFullScreen />
        </div>
      </div>

      {/* Resize Handle */}
      <div 
        className="w-1 bg-white/10 hover:bg-primary/50 cursor-col-resize transition-colors"
        onMouseDown={handleMouseDown}
      />

      {/* Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Canvas Header */}
        <div className="h-14 glass border-b border-white/10 flex items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <h3 className="font-semibold">Live Preview</h3>
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Play className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Canvas Content */}
        <div className="flex-1 p-4">
          <Canvas content={canvasContent} />
        </div>
      </div>
    </div>
  );
};