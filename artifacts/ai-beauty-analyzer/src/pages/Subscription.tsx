import { motion } from "framer-motion";
import { Check, Sparkles, Crown } from "lucide-react";

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    features: [
      "Basic skin analysis",
      "3 scans per month",
      "Limited product recommendations",
      "Basic progress tracking",
    ],
    notIncluded: [
      "Advanced metrics",
      "Unlimited scans",
      "AI recommendations",
      "Priority support",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 9.99,
    popular: true,
    features: [
      "Advanced skin analysis",
      "Unlimited scans",
      "Full product library access",
      "Complete progress tracking",
      "AI-powered recommendations",
      "Priority support",
      "Early access to new features",
    ],
  },
];

export default function Subscription() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold">Subscription</h1>
        <p className="text-gray-400">Choose the plan that works for you</p>
      </div>

      {/* Current Plan */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-neon-purple/20 to-electric-blue/20 border border-dark-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Current Plan</p>
            <h2 className="font-display text-xl font-bold flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-400" />
              Free Plan
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-400 text-sm">
            Active
          </span>
        </div>
      </div>

      {/* Plans */}
      <div className="space-y-4">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-6 rounded-3xl border ${
              plan.popular
                ? "bg-gradient-to-br from-neon-purple/10 to-electric-blue/10 border-neon-purple"
                : "bg-dark-card border-dark-border"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-neon-purple to-electric-blue text-sm font-medium flex items-center gap-1">
                <Sparkles className="w-4 h-4" /> Most Popular
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                <p className="text-3xl font-bold mt-1">
                  ${plan.price}
                  <span className="text-gray-400 text-base font-normal">
                    /month
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
              {plan.notIncluded?.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 opacity-40"
                >
                  <div className="w-5 h-5 rounded-full border border-gray-500" />
                  <span className="text-gray-400">{feature}</span>
                </div>
              ))}
            </div>

            <button
              className={`w-full mt-6 py-3 rounded-xl font-semibold transition-colors ${
                plan.id === "premium"
                  ? "bg-gradient-to-r from-neon-purple to-electric-blue hover:opacity-90"
                  : "bg-dark-surface border border-dark-border hover:bg-dark-border"
              }`}
            >
              {plan.id === "free" ? "Current Plan" : "Upgrade Now"}
            </button>
          </motion.div>
        ))}
      </div>

      {/* FAQ hint */}
      <div className="p-4 rounded-xl bg-dark-card border border-dark-border">
        <p className="text-gray-400 text-sm text-center">
          Have questions?{" "}
          <span className="text-neon-purple">Contact support</span>
        </p>
      </div>
    </div>
  );
}
