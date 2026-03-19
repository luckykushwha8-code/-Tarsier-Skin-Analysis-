import { useLocation, useParams } from "wouter";
import { ChevronLeft, Share2, AlertCircle, ShoppingBag, ExternalLink } from "lucide-react";
import { MobileLayout } from "@/components/MobileLayout";
import { ProgressRing } from "@/components/ProgressRing";
import { Button } from "@/components/ui/Button";
import { useReport } from "@/hooks/use-skincare";
import { useToast } from "@/hooks/use-toast";

export function Report() {
  const params = useParams();
  const scanId = (params as any).id || "latest";
  const [, setLocation] = useLocation();
  const { data: report, isLoading } = useReport(scanId);
  const { toast } = useToast();

  if (isLoading) {
    return (
      <MobileLayout>
        <div className="flex h-full items-center justify-center flex-col gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          <p className="text-muted-foreground text-sm">Loading your report...</p>
        </div>
      </MobileLayout>
    );
  }

  if (!report) return null;

  const scoreLabel =
    report.overallScore >= 85 ? "Excellent" :
    report.overallScore >= 70 ? "Good" :
    report.overallScore >= 55 ? "Fair" : "Needs Care";

  return (
    <MobileLayout>
      <div className="bg-secondary/20 min-h-screen pb-6">
        {/* Header */}
        <header className="p-5 flex justify-between items-center sticky top-0 bg-secondary/80 backdrop-blur-lg z-10">
          <button onClick={() => setLocation("/home")} className="p-2 bg-card rounded-full shadow-sm">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-serif font-bold">Analysis Report</h1>
          <button
            onClick={() => toast({ title: "Shared!", description: "Report link copied to clipboard." })}
            className="p-2 bg-card rounded-full shadow-sm"
          >
            <Share2 className="w-5 h-5 text-foreground" />
          </button>
        </header>

        {/* Score circle */}
        <div className="flex flex-col items-center px-6 pt-4 pb-8">
          <ProgressRing score={report.overallScore} size={200} strokeWidth={14} label={scoreLabel} />
          <div className="mt-5 bg-white px-5 py-2.5 rounded-full shadow-sm border border-border flex items-center gap-2">
            <span className="text-muted-foreground text-sm">Skin Type:</span>
            <span className="font-bold text-primary text-sm">{report.skinType}</span>
          </div>
        </div>

        <div className="bg-background rounded-t-[2rem] px-5 py-7 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          {/* Metrics */}
          <h2 className="text-xl font-serif font-bold mb-5">Skin Metrics</h2>
          <div className="flex flex-col gap-4 mb-7">
            {report.metrics?.map((metric: any, i: number) => (
              <div key={i}>
                <div className="flex justify-between mb-1.5">
                  <span className="font-medium text-sm text-foreground">{metric.name}</span>
                  <span className="font-bold text-sm text-foreground">{metric.score}/100</span>
                </div>
                <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      metric.status === "good" ? "bg-green-500" :
                      metric.status === "fair" ? "bg-amber-400" : "bg-red-400"
                    }`}
                    style={{ width: `${metric.score}%` }}
                  />
                </div>
                {metric.description && (
                  <p className="text-[11px] text-muted-foreground mt-1">{metric.description}</p>
                )}
              </div>
            ))}
          </div>

          {/* Concerns */}
          <h2 className="text-lg font-serif font-bold mb-3">Focus Areas</h2>
          <div className="flex flex-wrap gap-2 mb-7">
            {report.concerns?.map((concern: string, i: number) => (
              <div key={i} className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full text-xs font-medium border border-amber-200">
                <AlertCircle className="w-3 h-3" />
                {concern}
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <h2 className="text-lg font-serif font-bold mb-3">Expert Tips</h2>
          <div className="bg-secondary/30 rounded-2xl p-4 border border-secondary mb-7">
            <ul className="space-y-3">
              {report.recommendations?.map((rec: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                    {i + 1}
                  </div>
                  <span className="text-sm text-foreground leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Recommended Products from DB */}
          {report.products && report.products.length > 0 && (
            <>
              <h2 className="text-lg font-serif font-bold mb-3 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                Recommended For You
              </h2>
              <p className="text-xs text-muted-foreground mb-4">AI-selected based on your skin analysis</p>
              <div className="flex flex-col gap-3 mb-7">
                {report.products.slice(0, 6).map((product: any) => (
                  <div key={product.id} className="bg-card rounded-2xl p-3 border border-border flex gap-3 items-center shadow-sm">
                    {/* Image */}
                    <div className="w-16 h-16 rounded-xl bg-muted/30 flex-shrink-0 overflow-hidden">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-contain p-1"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="w-6 h-6 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-wider truncate">{product.brand}</p>
                      <p className="text-xs font-semibold text-foreground line-clamp-2 leading-tight">{product.name}</p>
                      {product.size && <p className="text-[10px] text-muted-foreground">{product.size}</p>}
                    </div>
                    {/* Price + Link */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <span className="font-bold text-sm text-foreground">
                        {product.price ? `$${parseFloat(product.price).toFixed(2)}` : "—"}
                      </span>
                      {product.productUrl && (
                        <a
                          href={product.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <Button className="w-full mb-3" size="lg" onClick={() => setLocation("/products")}>
            Browse All Products
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
