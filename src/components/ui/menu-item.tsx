import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MenuItemProps {
  emoji: string;
  title: string;
  subtitle?: string;
  to?: string;
  onClick?: () => void;
  badge?: number | string;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  children?: ReactNode;
}

export function MenuItem({ 
  emoji, 
  title, 
  subtitle, 
  to, 
  onClick, 
  badge,
  variant = 'default',
  children 
}: MenuItemProps) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    }
  };

  const variantClasses = {
    default: 'bg-card hover:bg-accent',
    success: 'bg-success/10 hover:bg-success/20 border-success/20',
    warning: 'bg-warning/10 hover:bg-warning/20 border-warning/20',
    destructive: 'bg-destructive/10 hover:bg-destructive/20 border-destructive/20',
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'w-full flex items-center gap-4 p-4 rounded-lg border transition-all duration-200',
        'active:scale-[0.98] shadow-sm hover:shadow-md',
        variantClasses[variant]
      )}
    >
      <span className="text-2xl">{emoji}</span>
      <div className="flex-1 text-right">
        <h3 className="font-semibold text-foreground">{title}</h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
        {children}
      </div>
      {badge !== undefined && (
        <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full min-w-[24px] text-center">
          {badge}
        </span>
      )}
    </button>
  );
}
