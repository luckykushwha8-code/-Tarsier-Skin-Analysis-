import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { useRoutines } from "@/hooks/use-skincare";
import { CheckCircle2, Clock, CalendarDays, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Routine() {
  const { data: routines, isLoading } = useRoutines();
  const [activeTab, setActiveTab] = useState<"morning" | "evening">("morning");

  if (isLoading) return <MobileLayout><div className="p-8">Loading routine...</div></MobileLayout>;

  const routine = routines?.find(r => r.type === activeTab);
  const completedCount = routine?.steps.filter(s => s.isCompleted).length || 0;
  const totalSteps = routine?.steps.length || 0;
  const progress = totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0;

  return (
    <MobileLayout>
      <div className="p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-serif font-bold text-foreground">Your Routine</h1>
          <p className="text-muted-foreground mt-1">Curated for your combination skin</p>
        </header>

        {/* Custom Tabs */}
        <div className="flex p-1 bg-muted rounded-2xl mb-8">
          <button
            onClick={() => setActiveTab("morning")}
            className={cn(
              "flex-1 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all",
              activeTab === "morning" ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
            )}
          >
            <Sun className="w-4 h-4" /> Morning
          </button>
          <button
            onClick={() => setActiveTab("evening")}
            className={cn(
              "flex-1 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all",
              activeTab === "evening" ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
            )}
          >
            <Moon className="w-4 h-4" /> Evening
          </button>
        </div>

        {/* Progress Card */}
        <div className="bg-primary text-primary-foreground rounded-2xl p-5 mb-8 shadow-lg shadow-primary/20">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className="font-bold text-lg">{routine?.name}</h3>
              <p className="text-primary-foreground/80 text-sm flex items-center gap-1 mt-1">
                <Clock className="w-4 h-4" /> {routine?.duration} mins
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold">{completedCount}</span>
              <span className="text-primary-foreground/70 text-sm">/{totalSteps} steps</span>
            </div>
          </div>
          <div className="w-full h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-500 ease-out rounded-full" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-4">
          {routine?.steps.map((step, index) => (
            <div 
              key={index} 
              className={cn(
                "p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 cursor-pointer",
                step.isCompleted ? "bg-muted/50 border-transparent opacity-70" : "bg-card border-border shadow-sm hover:border-secondary"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2",
                step.isCompleted ? "bg-success border-success text-white" : "border-muted-foreground text-muted-foreground"
              )}>
                {step.isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <span className="font-bold text-sm">{step.order}</span>}
              </div>
              
              <div className="flex-1">
                <h4 className={cn("font-bold", step.isCompleted ? "line-through text-muted-foreground" : "text-foreground")}>
                  {step.name}
                </h4>
                <p className="text-sm text-muted-foreground mt-0.5">{step.product}</p>
              </div>
            </div>
          ))}
        </div>

        <Button className="w-full mt-8" size="lg" variant={progress === 100 ? "outline" : "primary"}>
          {progress === 100 ? "Reset Routine" : "Mark All Complete"}
        </Button>
      </div>
    </MobileLayout>
  );
}
