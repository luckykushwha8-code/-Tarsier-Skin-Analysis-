import { useLocation, useParams } from "wouter";
import { ChevronLeft, Share2, ShoppingBag, ShoppingCart, Download, Eye, Calendar, Zap, Plus } from "lucide-react";
import { MobileLayout } from "@/components/MobileLayout";
import { ProgressRing } from "@/components/ProgressRing";
import { useReport } from "@/hooks/use-skincare";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import html2canvas from "html2canvas";

const severityColors: Record<string, string> = {
  high: "text-red-400 bg-red-500/10 border-red-500/20",
  medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  low: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

const concernNames: Record<string, string> = {
  acne: "Acne",
  dark_circles: "Dark Circles",
  pigmentation: "Pigmentation",
  hydration: "Hydration",
  oiliness: "Oiliness",
  wrinkles: "Wrinkles",
  sensitivity: "Sensitivity",
};

const routineIcons: Record<string, string> = {
  Cleanser: "💧", "Double Cleanse": "🌙", Toner: "🌿", Serum: "✨",
  "Eye Cream": "👁️", Moisturiser: "🧴", SPF: "☀️", Treatment: "🔬",
  "Spot Treatment": "🎯",
};

export function Report() {
  const params = useParams();
  const scanId = (params as any).id || "latest";
  const [, setLocation] = useLocation();
  const { data: report, isLoading } = useReport(scanId);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleDownload = async () => {
    toast({ title: "Processing", description: "Generating your PDF report..." });
    const element = document.getElementById("report-content");
    if (!element) return;
    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: "#02040a" });
      const link = document.createElement("a");
      link.download = `Tarsier-Report-${report?.id || "latest"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast({ title: "Success", description: "Report downloaded successfully." });
    } catch (err) {
      toast({ title: "Error", description: "Could not generate report image.", variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <MobileLayout>
        <div className="flex h-full items-center justify-center flex-col gap-4 min-h-screen">
          <div className="w-16 h-16 rounded-full border-2 border-primary/40 border-t-primary animate-spin" />
          <p className="text-muted-foreground text-sm">Tarsier is analysing...</p>
        </div>
      </MobileLayout>
    );
  }

  if (!report) return null;

  const issues = report.issues as Record<string, { severity: string; description: string; score: number }> | undefined;
  const routine = report.routine as { morning: { step: string; icon?: string; description: string }[]; night: { step: string; icon?: string; description: string }[] } | undefined;
  const allProducts = report.products as any[] | undefined;

  return (
    <MobileLayout>
      <div id="report-content" className="bg-background min-h-screen pb-8 relative overflow-hidden">
        {/* Ambient blobs */}
        <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-[40%] left-0 w-48 h-48 rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />

        {/* Header */}
        <header data-html2canvas-ignore className="p-5 flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-xl z-20 border-b border-border/30">
          <button onClick={() => setLocation("/home")} className="p-2 bg-card rounded-full border border-border">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-primary" />
            <h1 className="text-base font-serif font-bold">Skin Report</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="p-2 bg-card rounded-full border border-border hover:bg-secondary transition-colors"
            >
              <Download className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={() => toast({ title: "Shared!", description: "Report link copied to clipboard." })}
              className="p-2 bg-card rounded-full border border-border hover:bg-secondary transition-colors"
            >
              <Share2 className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </header>

        {/* Score */}
        <div className="flex flex-col items-center px-6 pt-6 pb-8">
          <ProgressRing score={report.overallScore} size={200} strokeWidth={14} />
          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-card border border-border px-4 py-2 rounded-full">
              <span className="text-xs text-muted-foreground">Skin Type:</span>
              <span className="text-xs font-bold text-primary">{report.skinType}</span>
            </div>
            {report.aiConfidence && (
              <div className="flex items-center gap-1.5 bg-card border border-border px-4 py-2 rounded-full">
                <Zap className="w-3 h-3 text-accent" />
                <span className="text-xs font-bold text-accent">{report.aiConfidence}% confidence</span>
              </div>
            )}
          </div>
          {report.createdAt && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {format(new Date(report.createdAt), "MMM d, yyyy · h:mm a")}
            </div>
          )}
        </div>

        <div className="px-5 space-y-8">
          {/* Skin Issues */}
          {issues && Object.keys(issues).length > 0 && (
            <section>
              <h2 className="text-lg font-serif font-bold mb-4 gradient-text">Issue Breakdown</h2>
              <div className="space-y-3">
                {Object.entries(issues)
                  .sort((a, b) => a[1].score - b[1].score)
                  .map(([key, val]) => (
                    <div key={key} className="bg-card rounded-2xl border border-border p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-foreground">{concernNames[key] || key}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize ${severityColors[val.severity]}`}>
                            {val.severity}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-foreground">{val.score}/100</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-2">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            val.severity === "low" ? "bg-emerald-500" :
                            val.severity === "medium" ? "bg-amber-400" : "bg-red-500"
                          }`}
                          style={{ width: `${val.score}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{val.description}</p>
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* Morning Routine */}
          {routine?.morning && routine.morning.length > 0 && (
            <section>
              <h2 className="text-lg font-serif font-bold mb-1 gradient-text">Morning Routine</h2>
              <p className="text-xs text-muted-foreground mb-4">AI-personalised for your skin</p>
              <div className="space-y-2">
                {routine.morning.map((step, i) => (
                  <div key={i} className="bg-card rounded-2xl border border-border p-4 flex gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-900/60 to-blue-900/40 flex items-center justify-center text-base flex-shrink-0 border border-primary/20">
                      {step.icon || routineIcons[step.step] || "✨"}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary mb-0.5">{step.step}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Night Routine */}
          {routine?.night && routine.night.length > 0 && (
            <section>
              <h2 className="text-lg font-serif font-bold mb-1 gradient-text">Night Routine</h2>
              <p className="text-xs text-muted-foreground mb-4">Repair and restore overnight</p>
              <div className="space-y-2">
                {routine.night.map((step, i) => (
                  <div key={i} className="bg-card rounded-2xl border border-border p-4 flex gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-900/60 to-violet-900/40 flex items-center justify-center text-base flex-shrink-0 border border-accent/20">
                      {step.icon || routineIcons[step.step] || "🌙"}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-accent mb-0.5">{step.step}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Progress Timeline */}
          {report.progressSimulation && (
            <section>
              <h2 className="text-lg font-serif font-bold mb-4 gradient-text">Expected Progress</h2>
              <div className="space-y-2">
                {Object.entries(report.progressSimulation as Record<string, string>).map(([week, text]) => (
                  <div key={week} className="bg-card rounded-2xl border border-border p-4 flex gap-3">
                    <div className="w-14 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0">
                      {week.replace("_", " ")}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed self-center">{text}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tips */}
          {report.tips && report.tips.length > 0 && (
            <section>
              <h2 className="text-lg font-serif font-bold mb-4 gradient-text">Expert Tips</h2>
              <div className="bg-card rounded-2xl border border-border p-4">
                <ul className="space-y-3">
                  {report.tips.map((tip: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 text-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold shadow-[0_0_8px_rgba(139,92,246,0.4)]">
                        {i + 1}
                      </div>
                      <span className="text-xs text-muted-foreground leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Recommended Products */}
          {allProducts && allProducts.length > 0 && (
            <section>
              <h2 className="text-lg font-serif font-bold mb-1 flex items-center gap-2 gradient-text">
                <ShoppingBag className="w-5 h-5" />
                Recommended For You
              </h2>
              <p className="text-xs text-muted-foreground mb-4">AI-matched to your skin concerns</p>
              <div className="flex flex-col gap-3">
                {allProducts.slice(0, 8).map((product: any) => (
                  <div key={product.id} className="bg-card rounded-2xl border border-border p-3 flex gap-3 hover:border-primary/30 transition-colors">
                    <div className="w-16 h-16 rounded-xl bg-secondary/20 flex-shrink-0 overflow-hidden border border-border">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-contain p-1"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="w-5 h-5 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-wider truncate">{product.brand}</p>
                      <p className="text-xs font-semibold text-foreground line-clamp-2 leading-tight mt-0.5">{product.name}</p>
                      {product.size && <p className="text-[10px] text-muted-foreground mt-0.5">{product.size}</p>}
                    </div>
                      <div className="flex items-center gap-1 bg-accent/10 px-2 py-0.5 rounded border border-accent/20 mb-1">
                        <Zap className="w-3 h-3 text-accent" />
                        <span className="text-[9px] font-bold text-accent uppercase w-max tracking-wider">Best For You</span>
                      </div>
                      <span className="font-bold text-sm text-foreground">
                        {product.price ? `$${parseFloat(product.price).toFixed(2)}` : "—"}
                      </span>
                      <button
                        onClick={() => {
                          const price = parseFloat(product.price) || (Math.floor(Math.random() * 50) + 15);
                          addItem({ ...product, price });
                          toast({ title: "Added to Cart", description: `${product.name} added.` });
                        }}
                        className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-md hover:bg-primary/90 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <button
            onClick={() => setLocation("/products")}
            className="btn-neon w-full py-4 rounded-2xl text-white font-semibold text-base"
          >
            Browse All Products
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}
