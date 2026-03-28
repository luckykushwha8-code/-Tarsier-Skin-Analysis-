import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Plus, Clock, ChevronRight } from "lucide-react";

const routines = [
  {
    id: 1,
    type: "morning",
    name: "Morning Routine",
    icon: Sun,
    steps: [
      {
        order: 1,
        product: "Gentle Cleanser",
        duration: "60 sec",
        notes: "Massage gently in circular motions",
      },
      {
        order: 2,
        product: "Vitamin C Serum",
        duration: "30 sec",
        notes: "Apply to damp skin",
      },
      {
        order: 3,
        product: "Moisturizer",
        duration: "30 sec",
        notes: "Lock in hydration",
      },
      {
        order: 4,
        product: "Sunscreen SPF 50",
        duration: "30 sec",
        notes: "Apply generously",
      },
    ],
  },
  {
    id: 2,
    type: "evening",
    name: "Evening Routine",
    icon: Moon,
    steps: [
      {
        order: 1,
        product: "Oil Cleanser",
        duration: "60 sec",
        notes: "Remove makeup and sunscreen",
      },
      {
        order: 2,
        product: "Gentle Cleanser",
        duration: "60 sec",
        notes: "Double cleanse",
      },
      {
        order: 3,
        product: "Retinol Serum",
        duration: "30 sec",
        notes: "Wait 20 min before moisturizer",
      },
      {
        order: 4,
        product: "Night Cream",
        duration: "30 sec",
        notes: "Apply in upward motions",
      },
    ],
  },
];

export default function Routine() {
  const [activeTab, setActiveTab] = useState<"morning" | "evening">("morning");

  const activeRoutine = routines.find((r) => r.type === activeTab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold">Skincare Routine</h1>
        <p className="text-gray-400">Your personalized daily routines</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-dark-card rounded-xl">
        {(["morning", "evening"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
              activeTab === tab
                ? "bg-gradient-to-r from-neon-purple to-electric-blue"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab === "morning" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Active Routine */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-4"
        >
          {activeRoutine && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">{activeRoutine.name}</h2>
                <button className="p-2 rounded-lg bg-dark-card border border-dark-border">
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                {activeRoutine.steps.map((step, index) => (
                  <motion.div
                    key={step.order}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-2xl bg-dark-card border border-dark-border"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-purple to-electric-blue flex items-center justify-center flex-shrink-0 font-semibold">
                        {step.order}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold">{step.product}</h3>
                          <span className="text-gray-400 text-sm flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {step.duration}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{step.notes}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Start Routine Button */}
              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-purple to-electric-blue font-semibold flex items-center justify-center gap-2">
                Start Routine
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Tips */}
      <div className="p-4 rounded-xl bg-dark-card border border-dark-border">
        <h3 className="font-semibold mb-2">💡 Pro Tips</h3>
        <ul className="text-gray-400 text-sm space-y-2">
          <li>• Wait 2-3 minutes between steps for better absorption</li>
          <li>• Apply products thinnest to thickest consistency</li>
          <li>• Always end with sunscreen in the morning</li>
        </ul>
      </div>
    </div>
  );
}
