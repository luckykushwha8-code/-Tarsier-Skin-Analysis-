import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Sparkles, ScanFace, Sparkle } from "lucide-react";
import { MobileLayout } from "@/components/MobileLayout";

const slides = [
  {
    id: 1,
    title: "Welcome to AI Beauty",
    subtitle: "Discover your skin's true potential with advanced AI analysis.",
    image: "/images/onboarding-1.png",
    icon: <Sparkles className="w-8 h-8 text-primary" />
  },
  {
    id: 2,
    title: "Analyze Your Skin",
    subtitle: "Get instant clinical-grade insights using just your smartphone camera.",
    image: "/images/onboarding-2.png",
    icon: <ScanFace className="w-8 h-8 text-primary" />
  },
  {
    id: 3,
    title: "Personalized Routines",
    subtitle: "Receive bespoke skincare recommendations tailored exactly to your needs.",
    image: "/images/onboarding-3.png",
    icon: <Sparkle className="w-8 h-8 text-primary" />
  }
];

export function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [, setLocation] = useLocation();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem("onboarding_seen", "true");
    setLocation("/login");
  };

  return (
    <MobileLayout showBottomNav={false} className="bg-card">
      <div className="flex flex-col h-full relative">
        <button 
          onClick={handleComplete}
          className="absolute top-6 right-6 z-20 text-muted-foreground font-medium hover:text-foreground transition-colors"
        >
          Skip
        </button>

        <div className="flex-1 relative overflow-hidden bg-secondary/30 rounded-b-[3rem]">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              src={`${import.meta.env.BASE_URL}${slides[currentSlide].image.replace('/images/', 'images/')}`}
              alt={slides[currentSlide].title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>

        <div className="h-[40%] px-8 py-10 flex flex-col items-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6 shadow-sm">
                {slides[currentSlide].icon}
              </div>
              <h1 className="text-3xl font-serif text-foreground mb-3">{slides[currentSlide].title}</h1>
              <p className="text-muted-foreground leading-relaxed px-4">{slides[currentSlide].subtitle}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-auto w-full flex flex-col items-center gap-8">
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentSlide ? "w-8 bg-primary" : "w-2 bg-border"
                  }`}
                />
              ))}
            </div>

            <Button className="w-full" size="lg" onClick={handleNext}>
              {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
