import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

export function ErrorState({ message, onRetry }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 bg-background">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-destructive" />
      </div>
      <div className="text-center max-w-md">
        <p className="text-lg font-medium text-foreground mb-2">Something went wrong</p>
        <p className="text-sm text-muted-foreground mb-4">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}
