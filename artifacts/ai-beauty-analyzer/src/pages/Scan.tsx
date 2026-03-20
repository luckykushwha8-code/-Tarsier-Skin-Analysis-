import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Zap, Image as ImageIcon, Eye } from "lucide-react";
import { MobileLayout } from "@/components/MobileLayout";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const SKIN_TYPES = ["Normal", "Oily", "Dry", "Combination", "Sensitive"];
const CONCERNS = ["Acne", "Dark Circles", "Pigmentation", "Dryness", "Oiliness", "Wrinkles", "Sensitivity", "Dark Spots"];

export function Scan() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<"profile" | "camera">("profile");
  const [skinType, setSkinType] = useState("Combination");
  const [age, setAge] = useState("25");
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [flash, setFlash] = useState(false);

  const toggleConcern = (c: string) => {
    setSelectedConcerns((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);
  };

  const handleCapture = async () => {
    setIsScanning(true);
    try {
      const res = await fetch(`${BASE}/api/scans`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skinType: skinType.toLowerCase(),
          age: parseInt(age) || 25,
          concerns: selectedConcerns.map((c) => c.toLowerCase()),
        }),
      });
      const scan = await res.json();
      await new Promise((r) => setTimeout(r, 2000));
      setLocation(`/report/${scan.id}`);
    } catch {
      await new Promise((r) => setTimeout(r, 2000));
      setLocation("/report/latest");
    }
  };

  if (step === "profile") {
    return (
      <MobileLayout showBottomNav={false}>
        <div className="min-h-screen bg-background px-6 py-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-violet-600/15 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-blue-600/15 blur-[80px] pointer-events-none" />

          <button onClick={() => setLocation("/home")} className="w-10 h-10 bg-card rounded-full flex items-center justify-center border border-border mb-8">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-5 h-5 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Tarsier</span>
            </div>
            <h1 className="text-3xl font-serif font-bold gradient-text mb-2">Skin Profile</h1>
            <p className="text-muted-foreground text-sm">Tell us about your skin so the AI can tailor your analysis.</p>
          </div>

          {/* Skin Type */}
          <div className="mb-7">
            <p className="text-sm font-semibold text-foreground mb-3">Skin Type</p>
            <div className="flex flex-wrap gap-2">
              {SKIN_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setSkinType(t)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    skinType === t
                      ? "bg-primary/20 border-primary text-primary shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                      : "bg-card border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Age */}
          <div className="mb-7">
            <p className="text-sm font-semibold text-foreground mb-3">Age</p>
            <input
              type="number"
              min="12"
              max="90"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(139,92,246,0.2)]"
              placeholder="e.g. 25"
            />
          </div>

          {/* Concerns */}
          <div className="mb-10">
            <p className="text-sm font-semibold text-foreground mb-3">Main Concerns <span className="text-muted-foreground font-normal">(select all that apply)</span></p>
            <div className="flex flex-wrap gap-2">
              {CONCERNS.map((c) => (
                <button
                  key={c}
                  onClick={() => toggleConcern(c)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    selectedConcerns.includes(c)
                      ? "bg-accent/20 border-accent text-accent shadow-[0_0_12px_rgba(96,165,250,0.3)]"
                      : "bg-card border-border text-muted-foreground hover:border-accent/40"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setStep("camera")}
            className="btn-neon w-full py-4 rounded-2xl text-white font-semibold text-base"
          >
            Continue to Scan
          </button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout showBottomNav={false}>
      <div className="h-screen w-full bg-black relative overflow-hidden flex flex-col">
        {/* Top Bar */}
        <div className="absolute top-0 w-full z-20 p-6 flex justify-between items-center">
          <button onClick={() => setStep("profile")} className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            <Eye className="w-4 h-4 text-violet-400" />
            <span className="text-white text-sm font-semibold">Tarsier AI</span>
          </div>
          <button
            onClick={() => setFlash(!flash)}
            className={`p-2 backdrop-blur-md rounded-full transition-colors ${flash ? "bg-yellow-400 text-black" : "bg-white/10 text-white"}`}
          >
            <Zap className="w-6 h-6" />
          </button>
        </div>

        {/* Camera Feed */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80"
            alt="Camera Feed"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Face oval */}
        <div className="absolute inset-0 z-5 flex items-center justify-center pointer-events-none" style={{ paddingBottom: "10%" }}>
          <div
            className="border-2 border-violet-400/60 rounded-[50%] shadow-[0_0_30px_rgba(139,92,246,0.3),inset_0_0_30px_rgba(139,92,246,0.05)]"
            style={{ width: "65%", height: "55%" }}
          />
        </div>

        {/* Scan animation */}
        {isScanning && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden"
            style={{ clipPath: "ellipse(32.5% 27.5% at 50% 43%)" }}
          >
            <motion.div
              initial={{ top: "10%" }}
              animate={{ top: ["10%", "90%", "10%"] }}
              transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
              className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent shadow-[0_0_16px_rgba(139,92,246,0.9)]"
            />
            <div className="absolute inset-0 bg-violet-500/10 mix-blend-overlay" />
          </div>
        )}

        {/* Bottom */}
        <div className="absolute bottom-0 w-full z-20 pb-12 pt-10 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={isScanning ? "scanning" : "idle"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-white mb-8 text-sm font-medium bg-white/10 backdrop-blur-sm px-6 py-2.5 rounded-full border border-white/10"
            >
              {isScanning ? "Tarsier is analysing your skin..." : "Align your face inside the oval"}
            </motion.p>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-12">
            <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md border border-white/10">
              <ImageIcon className="w-5 h-5" />
            </button>

            <button
              onClick={handleCapture}
              disabled={isScanning}
              className="relative w-20 h-20 rounded-full flex items-center justify-center disabled:opacity-70"
            >
              <div className="absolute inset-0 rounded-full border-2 border-violet-400/60 shadow-[0_0_24px_rgba(139,92,246,0.5)]" />
              <div
                className={`w-15 h-15 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 shadow-[0_0_20px_rgba(139,92,246,0.8)] transition-transform ${
                  isScanning ? "scale-75 animate-pulse" : "scale-100 hover:scale-95"
                }`}
                style={{ width: 60, height: 60 }}
              />
            </button>

            <div className="w-12 h-12" />
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
