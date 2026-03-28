import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Loader2, CheckCircle } from "lucide-react";

export default function Scan() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<
    "position" | "capturing" | "analyzing" | "done"
  >("position");
  const [countdown, setCountdown] = useState(3);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCapture = () => {
    setStep("capturing");

    // Countdown
    let count = 3;
    const interval = setInterval(() => {
      count--;
      setCountdown(count);
      if (count === 0) {
        clearInterval(interval);
        analyze();
      }
    }, 1000);
  };

  const analyze = () => {
    setStep("analyzing");
    setTimeout(() => {
      setStep("done");
    }, 3000);
  };

  const viewResults = () => {
    // Navigate to a mock report
    setLocation("/report/1");
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col">
      <h1 className="font-display text-2xl font-bold mb-4">Skin Analysis</h1>

      {/* Camera View */}
      <div className="flex-1 relative rounded-3xl overflow-hidden bg-dark-card border border-dark-border">
        {/* Face Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-64 h-80">
            {/* Face outline */}
            <div className="absolute inset-0 border-2 border-dashed border-neon-purple/50 rounded-[120px] animate-pulse" />

            {/* Guide text */}
            {step === "position" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-400 text-center px-8">
                  Position your face within the frame
                </p>
              </div>
            )}

            {/* Countdown */}
            {step === "capturing" && countdown > 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-8xl font-bold text-white">
                  {countdown}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Face icon in center for demo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Camera className="w-16 h-16 text-gray-600" />
        </div>

        {/* Top overlay gradient */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-dark-bg/80 to-transparent" />

        {/* Bottom overlay gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-bg/80 to-transparent" />

        {/* Instructions */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-gray-400 text-sm">
            {step === "position" && "Make sure your face is well-lit"}
            {step === "capturing" && "Hold still..."}
            {step === "analyzing" && "Analyzing your skin..."}
            {step === "done" && "Analysis complete!"}
          </p>
        </div>

        {/* Processing overlay */}
        <AnimatePresence>
          {step === "analyzing" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-dark-bg/80 flex items-center justify-center"
            >
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-neon-purple animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Analyzing your skin...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success overlay */}
        <AnimatePresence>
          {step === "done" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-dark-bg/80 flex items-center justify-center"
            >
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <p className="text-white text-xl font-semibold mb-2">
                  Analysis Complete!
                </p>
                <p className="text-gray-400 mb-6">Your skin score: 82</p>
                <button
                  onClick={viewResults}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-neon-purple to-electric-blue font-semibold"
                >
                  View Results
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Capture Button */}
      {step === "position" && (
        <div className="mt-6">
          <button
            onClick={startCapture}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-purple to-electric-blue font-semibold flex items-center justify-center gap-2"
          >
            <Camera className="w-5 h-5" />
            Start Scan
          </button>
        </div>
      )}

      {/* Tips */}
      {step === "position" && (
        <div className="mt-4 p-4 rounded-xl bg-dark-card border border-dark-border">
          <p className="text-gray-400 text-sm">
            <span className="text-neon-purple font-medium">
              Tips for best results:
            </span>{" "}
            Remove makeup, ensure good lighting, and keep your face straight.
          </p>
        </div>
      )}
    </div>
  );
}
