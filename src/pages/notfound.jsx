import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "../components/ui/button.jsx";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-display font-bold text-foreground mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Page not found</p>
        <Button asChild>
          <Link to="/" className="gap-2">
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
