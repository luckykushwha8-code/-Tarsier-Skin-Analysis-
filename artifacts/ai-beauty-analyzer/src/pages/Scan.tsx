import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, Zap, Image as ImageIcon } from "lucide-react";
import { MobileLayout } from "@/components/MobileLayout";

export function Scan() {
  const [, setLocation] = useLocation();
  const [isScanning, setIsScanning] = useState(false);
  const [flash, setFlash] = useState(false);

  const handleCapture = () => {
    setIsScanning(true);
    // Simulate API processing delay
    setTimeout(() => {
      setLocation("/report/latest");
    }, 2500);
  };

  return (
    <MobileLayout showBottomNav={false}>
      <div className="h-screen w-full bg-black relative overflow-hidden flex flex-col">
        {/* Top Bar */}
        <div className="absolute top-0 w-full z-20 p-6 flex justify-between items-center text-white">
          <button onClick={() => setLocation("/home")} className="p-2 bg-white/20 backdrop-blur-md rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={() => setFlash(!flash)} className={`p-2 backdrop-blur-md rounded-full transition-colors ${flash ? 'bg-yellow-400 text-black' : 'bg-white/20'}`}>
            <Zap className="w-6 h-6" />
          </button>
        </div>

        {/* Camera Feed Mock */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80" 
            alt="Camera Feed" 
            className="w-full h-full object-cover opacity-80"
          />
          {/* Dark Overlay with Oval Cutout */}
          <div className="absolute inset-0 shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] pointer-events-none" 
               style={{ 
                 clipPath: 'ellipse(35% 45% at 50% 45%)', 
                 WebkitClipPath: 'ellipse(35% 45% at 50% 45%)'
               }}>
          </div>
        </div>

        {/* Scan Animation Overlay */}
        {isScanning && (
          <div className="absolute inset-0 z-10 flex items-center justify-center" style={{ clipPath: 'ellipse(35% 45% at 50% 45%)' }}>
            <motion.div
              initial={{ top: "0%" }}
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, ease: "linear", repeat: Infinity }}
              className="absolute w-full h-1 bg-accent shadow-[0_0_20px_rgba(255,105,180,0.8)]"
            />
            <div className="absolute inset-0 bg-accent/20 mix-blend-overlay"></div>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 w-full z-20 pb-12 pt-8 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center">
          <p className="text-white mb-8 font-medium bg-black/50 px-6 py-2 rounded-full backdrop-blur-sm">
            {isScanning ? "Analyzing your skin..." : "Align face inside circle"}
          </p>

          <div className="flex items-center justify-center gap-12">
            <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md">
              <ImageIcon className="w-6 h-6" />
            </button>
            
            <button 
              onClick={handleCapture}
              disabled={isScanning}
              className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center"
            >
              <div className={`w-16 h-16 bg-white rounded-full transition-transform ${isScanning ? 'scale-75' : 'scale-100 hover:scale-95'}`}></div>
            </button>
            
            <div className="w-12 h-12"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
