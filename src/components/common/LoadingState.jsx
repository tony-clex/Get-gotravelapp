import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background">
      <div className="relative">
        <div className="relative w-12 h-12 mx-auto my-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg font-medium text-foreground mb-1">Preparing your adventure...</p>
        <p className="text-sm text-muted-foreground">Gathering destination information</p>
      </div>
    </div>
  );
}
