import React from 'react';

interface JournalingMethodCardProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function JournalingMethodCard({
  icon,
  title,
  description,
  isSelected,
  onClick,
}: JournalingMethodCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-start gap-2 p-4 rounded-2xl border text-left transition-all duration-200 w-full
        ${isSelected
          ? 'border-primary bg-primary/10 shadow-warm-lg ring-2 ring-primary/30'
          : 'border-border bg-card hover:border-primary/40 hover:bg-accent/40'
        }
      `}
    >
      <div className={`p-2 rounded-xl ${isSelected ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
        {icon}
      </div>
      <div>
        <p className={`font-semibold text-sm ${isSelected ? 'text-primary' : 'text-foreground'}`}>{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{description}</p>
      </div>
    </button>
  );
}
