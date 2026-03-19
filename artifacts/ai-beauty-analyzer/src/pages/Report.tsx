import { useLocation, useParams } from "wouter";
import { ChevronLeft, Share2, AlertCircle } from "lucide-react";
import { MobileLayout } from "@/components/MobileLayout";
import { ProgressRing } from "@/components/ProgressRing";
import { Button } from "@/components/ui/Button";
import { useReport } from "@/hooks/use-skincare";
import { useToast } from "@/hooks/use-toast";

export function Report() {
  const params = useParams();
  const scanId = params.id || "latest";
  const [, setLocation] = useLocation();
  const { data: report, isLoading } = useReport(scanId);
  const { toast } = useToast();

  if (isLoading) {
    return (
      <MobileLayout>
        <div className="flex h-full items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </MobileLayout>
    );
  }

  if (!report) return null;

  return (
    <MobileLayout>
      <div className="bg-secondary/20 min-h-screen pb-6">
        {/* Header */}
        <header className="p-6 flex justify-between items-center sticky top-0 bg-secondary/80 backdrop-blur-lg z-10">
          <button onClick={() => setLocation("/home")} className="p-2 bg-card rounded-full shadow-sm">
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-xl font-serif font-bold">Analysis Report</h1>
          <button 
            onClick={() => toast({ title: "Shared!", description: "Report link copied to clipboard." })} 
            className="p-2 bg-card rounded-full shadow-sm"
          >
            <Share2 className="w-5 h-5 text-foreground" />
          </button>
        </header>

        {/* Main Score Overview */}
        <div className="flex flex-col items-center px-6 pt-4 pb-8">
          <ProgressRing score={report.overallScore} size={220} strokeWidth={16} label="Excellent" />
          
          <div className="mt-6 bg-white px-6 py-3 rounded-full shadow-sm border border-border flex items-center gap-3">
            <span className="text-muted-foreground">Skin Type:</span>
            <span className="font-bold text-primary">{report.skinType}</span>
          </div>
        </div>

        <div className="bg-background rounded-t-[2.5rem] px-6 py-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          {/* Key Metrics */}
          <h2 className="text-2xl font-serif font-bold mb-6">Skin Metrics</h2>
          <div className="flex flex-col gap-5 mb-8">
            {report.metrics.map((metric, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-foreground">{metric.name}</span>
                  <span className="font-bold text-foreground">{metric.score}/100</span>
                </div>
                <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      metric.status === 'good' ? 'bg-success' : 
                      metric.status === 'fair' ? 'bg-warning' : 'bg-danger'
                    }`}
                    style={{ width: `${metric.score}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">{metric.description}</p>
              </div>
            ))}
          </div>

          {/* Concerns */}
          <h2 className="text-xl font-serif font-bold mb-4">Focus Areas</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {report.concerns.map((concern, i) => (
              <div key={i} className="flex items-center gap-2 bg-danger/10 text-danger px-4 py-2 rounded-full font-medium text-sm border border-danger/20">
                <AlertCircle className="w-4 h-4" />
                {concern}
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <h2 className="text-xl font-serif font-bold mb-4">Recommendations</h2>
          <div className="bg-secondary/30 rounded-2xl p-5 border border-secondary mb-8">
            <ul className="space-y-3">
              {report.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    {i + 1}
                  </div>
                  <span className="text-foreground leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button className="w-full" size="lg" onClick={() => setLocation("/products")}>
            View Recommended Products
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
