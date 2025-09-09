import { useEffect, useRef } from "react";
import { Code2, Sparkles } from "lucide-react";

interface CanvasProps {
  content: string;
}

export const Canvas = ({ content }: CanvasProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && content) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(content);
        doc.close();
      }
    }
  }, [content]);

  if (!content) {
    return (
      <div className="w-full h-full flex items-center justify-center glass-card">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto animate-glow">
            <Code2 className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Ready to Build</h3>
            <p className="text-muted-foreground max-w-md">
              Your generated app will appear here in real-time. Start by describing 
              what you want to build in the chat.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Todo App", "Calculator", "Weather App", "Timer"].map((example) => (
              <div key={example} className="px-3 py-1 bg-white/5 rounded-full text-sm border border-white/10">
                {example}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4" />
            <span>AI-powered • Real-time • Production ready</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full glass-card overflow-hidden">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-none"
        title="Generated App Preview"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};