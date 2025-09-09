import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { SplitInterface } from "@/components/SplitInterface";

const Index = () => {
  const [showInterface, setShowInterface] = useState(false);

  const handleStartBuilding = () => {
    setShowInterface(true);
  };

  if (showInterface) {
    return <SplitInterface />;
  }

  return <HeroSection onStartBuilding={handleStartBuilding} />;
};

export default Index;
