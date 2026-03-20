import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ScanFace, Zap, ShieldCheck } from "lucide-react";
import { MobileLayout } from "@/components/MobileLayout";
import { TarsierLogo } from "@/components/TarsierLogo";

const slides = [
  {
    id: 1,
    title: "Meet Tarsier",
    subtitle: "The AI skin scanner with eyes that see everything. Get a clinical-grade skin analysis in seconds.",
    icon: <ScanFace className="w-8 h-8" />,
    gradient: "from-violet-900/60 via-purple-900/30 to-transparent",
    dotColor: "bg-violet-500",
  },
  {
    id: 2,
    title: "Detect. Analyse. Act.",
    subtitle: "Tarsier detects acne, pigmentation, dark circles, wrinkles and more — then maps a personalised plan.",
    icon: <Zap className="w-8 h-8" />,
    gradient: "from-blue-900/60 via-indigo-900/30 to-transparent",
    dotColor: "bg-blue-500",
  },
  {
    id: 3,
    title: "Your Skin. Your Routine.",
    subtitle: "Get AI-matched product recommendations and a step-by-step routine built specifically for your skin.",
    icon: <ShieldCheck className="w-8 h-8" />,
    gradient: "from-violet-900/60 via-blue-900/30 to-transparent",
    dotColor: "bg-indigo-500",
  },
];

export function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [, setLocation] = useLocation();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem("onboarding_seen", "true");
    setLocation("/login");
  };

  const slide = slides[currentSlide];

  return (
    <MobileLayout showBottomNav={false}>
      <div className="flex flex-col h-screen bg-background relative overflow-hidden">
        {/* Ambient background blobs */}
        <div className="absolute top-[-80px] left-[-60px] w-64 h-64 rounded-full bg-violet-600/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-60px] w-56 h-56 rounded-full bg-blue-600/20 blur-[80px] pointer-events-none" />

        {/* Skip */}
        <button
          onClick={handleComplete}
          className="absolute top-8 right-6 z-20 text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
        >
          Skip
        </button>

        {/* Hero area */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 pt-16">
          {/* Logo */}
          <motion.div
            key={currentSlide + "logo"}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-2xl bg-violet-600/30 scale-110" />
              <TarsierLogo size={110} />
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center text-center"
            >
              <h1 className="text-4xl font-serif font-bold mb-4 gradient-text">{slide.title}</h1>
              <p className="text-muted-foreground text-base leading-relaxed max-w-xs">{slide.subtitle}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom controls */}
        <div className="px-8 pb-12 flex flex-col items-center gap-8">
          {/* Progress dots */}
          <div className="flex gap-2">
            {slides.map((s, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)}>
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentSlide ? `w-8 ${s.dotColor}` : "w-2 bg-border"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="btn-neon w-full py-4 rounded-2xl text-white font-semibold text-base"
          >
            {currentSlide === slides.length - 1 ? "Get Started" : "Continue"}
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}
