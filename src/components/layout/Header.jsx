export function Header({ minimal = false, onLogoClick }) {
  return (
    <header className={`w-full ${minimal ? 'absolute top-0 left-0 z-50' : 'bg-card border-b border-border'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={onLogoClick}
            className="flex items-center gap-2 group"
          >
            <span className={`text-2xl font-bold ${minimal ? 'text-primary-foreground' : 'text-foreground'}`}>
              GetGo
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
