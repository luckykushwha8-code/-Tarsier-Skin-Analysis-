import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ScanFace, Zap, ShieldCheck } from "lucide-react";
import { MobileLayout } from "@/components/MobileLayout";
import { GlowUpLogo } from "@/components/GlowUpLogo";

const slides = [
  {
    id: 1,
    title: "Meet GlowUp",
    subtitle: "The AI skin scanner with eyes that see everything. Clinical-grade analysis in seconds.",
    icon: <ScanFace className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1512310604669-443f26c35f52?w=800&q=90",
    tint: "bg-violet-950/50",
    dotColor: "bg-violet-500",
  },
  {
    id: 2,
    title: "Detect. Analyse. Act.",
    subtitle: "GlowUp spots acne, dark circles, pigmentation & more — then builds your plan.",
    icon: <Zap className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=90",
    tint: "bg-blue-950/50",
    dotColor: "bg-blue-500",
  },
  {
    id: 3,
    title: "Your Skin. Your Routine.",
    subtitle: "AI-matched products and a step-by-step routine built specifically for you.",
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=90",
    tint: "bg-indigo-950/50",
    dotColor: "bg-indigo-400",
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
      <div className="relative flex flex-col h-screen overflow-hidden">
        {/* Background girl image — transitions with slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide + "-bg"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover object-top"
            />
            {/* Dark gradient — heavier at bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/90" />
            {/* Tint overlay */}
            <div className={`absolute inset-0 ${slide.tint} mix-blend-multiply`} />
          </motion.div>
        </AnimatePresence>

        {/* Neon ambient glows */}
        <div className="absolute top-[-40px] left-[-40px] w-52 h-52 rounded-full bg-violet-600/20 blur-[80px] z-0 pointer-events-none" />
        <div className="absolute bottom-40 right-[-30px] w-44 h-44 rounded-full bg-blue-600/20 blur-[80px] z-0 pointer-events-none" />

        {/* Skip button */}
        <button
          onClick={handleComplete}
          className="absolute top-10 right-6 z-20 text-white/60 text-sm font-medium hover:text-white transition-colors"
        >
          Skip
        </button>

        {/* Logo top-left */}
        <div className="absolute top-8 left-6 z-20 flex items-center gap-2">
          <GlowUpLogo size={32} />
          <span className="text-white font-serif font-bold text-base">GlowUp</span>
        </div>

        {/* Bottom content */}
        <div className="relative z-10 mt-auto px-7 pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Icon badge */}
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                {slide.icon}
              </div>

              <h1 className="text-4xl font-serif font-bold text-white mb-3 leading-tight">
                {slide.title}
              </h1>
              <p className="text-white/60 text-base leading-relaxed mb-8">
                {slide.subtitle}
              </p>

              {/* Progress dots */}
              <div className="flex gap-2 mb-6">
                {slides.map((s, i) => (
                  <button key={i} onClick={() => setCurrentSlide(i)}>
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === currentSlide ? `w-8 ${s.dotColor}` : "w-2 bg-white/20"
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </MobileLayout>
  );
}
