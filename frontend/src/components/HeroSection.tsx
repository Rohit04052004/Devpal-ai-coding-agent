import { useState } from "react";
import { Sparkles, Code, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "./ChatInterface";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  onStartBuilding: () => void;
}

export const HeroSection = ({ onStartBuilding }: HeroSectionProps) => {
  const [showChat, setShowChat] = useState(false);

  const handleStartChat = () => {
    setShowChat(true);
    onStartBuilding();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 gradient-primary rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 gradient-secondary rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10 text-center space-y-8 px-4 max-w-4xl mx-auto animate-fade-in">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="p-3 glass-card glow-primary animate-glow">
            <Code className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            DevPal
          </h1>
        </div>

        {/* Hero Content */}
        <div className="space-y-6">
          <h2 className="text-6xl md:text-7xl font-bold leading-tight">
            Build Apps with
            <span className="block gradient-primary bg-clip-text text-transparent">
              AI Magic
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Simply describe your app idea and watch as our AI creates beautiful, 
            functional applications in real-time. No coding required.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: Sparkles, title: "AI Powered", desc: "Advanced AI understands your requirements" },
            { icon: Zap, title: "Lightning Fast", desc: "Generate apps in seconds, not hours" },
            { icon: Code, title: "Production Ready", desc: "Clean, maintainable code output" }
          ].map((feature, i) => (
            <div key={i} className="glass-card p-6 transition-spring hover:scale-105">
              <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="space-y-4 mt-12">
          {!showChat ? (
            <>
              <Button 
                onClick={handleStartChat}
                variant="hero"
                size="lg" 
                className="text-lg px-8 py-4 h-auto"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Building Now
              </Button>
              <p className="text-sm text-muted-foreground">
                Try: "Build me a todo app" or "Create a simple calculator"
              </p>
            </>
          ) : (
            <div className="w-full max-w-2xl mx-auto animate-slide-up">
              <ChatInterface onBuildRequest={onStartBuilding} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};