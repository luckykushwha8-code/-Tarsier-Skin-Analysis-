import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ScanFace } from "lucide-react";

const slides = [
  {
    title: "Welcome to Tarsier",
    description: "Your AI-powered skin analysis companion",
    icon: ScanFace,
  },
  {
    title: "Analyze Your Skin",
    description: "Get detailed insights about your skin health",
    icon: ScanFace,
  },
  {
    title: "Track Progress",
    description: "Monitor your skin improvements over time",
    icon: ScanFace,
  },
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [, setLocation] = useLocation();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setLocation("/login");
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      {/* Logo */}
      <div className="pt-8 px-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-electric-blue flex items-center justify-center glow-eyes">
            <span className="text-2xl">👁</span>
          </div>
          <span className="font-display text-2xl font-bold text-gradient">
            Tarsier
          </span>
        </div>
      </div>

      {/* Slides */}
      <div className="flex-1 flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-dark-card flex items-center justify-center">
              {(() => {
                const Icon = slides[currentSlide].icon;
                return <Icon className="w-12 h-12 text-neon-purple" />;
              })()}
            </div>
            <h1 className="font-display text-3xl font-bold mb-4">
              {slides[currentSlide].title}
            </h1>
            <p className="text-gray-400 text-lg">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots and Button */}
      <div className="px-6 pb-8">
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-neon-purple" : "bg-dark-border"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-purple to-electric-blue font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
