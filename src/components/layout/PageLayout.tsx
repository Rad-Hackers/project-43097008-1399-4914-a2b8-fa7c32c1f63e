import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  emoji?: string;
  showBack?: boolean;
  showHome?: boolean;
  action?: ReactNode;
}

export function PageLayout({ 
  children, 
  title, 
  emoji, 
  showBack = true, 
  showHome = false,
  action 
}: PageLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-background safe-area-top safe-area-bottom">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            {showBack && !isHome && (
              <Button 
                variant="ghost" 
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => navigate(-1)}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            )}
            {showHome && !isHome && (
              <Button 
                variant="ghost" 
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => navigate('/')}
              >
                <Home className="h-5 w-5" />
              </Button>
            )}
          </div>
          
          <h1 className="text-lg font-bold flex items-center gap-2">
            {emoji && <span>{emoji}</span>}
            {title}
          </h1>
          
          <div className="w-10">
            {action}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 animate-fade-in">
        {children}
      </main>
    </div>
  );
}
