import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export function StepCard({ step, title, description, icon: Icon, className }: StepCardProps) {
  return (
    <div
      className={cn(
        "relative p-6 rounded-2xl bg-card border border-border shadow-soft",
        "hover:shadow-soft-lg transition-shadow duration-300",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-primary">Step {step}</span>
          </div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
