import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

type AnimationVariant = 
  | "fade-up" 
  | "fade-down" 
  | "fade-left" 
  | "fade-right" 
  | "zoom-in" 
  | "zoom-out"
  | "flip-up"
  | "slide-up";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
}

const variantStyles: Record<AnimationVariant, { hidden: string; visible: string }> = {
  "fade-up": {
    hidden: "opacity-0 translate-y-16",
    visible: "opacity-100 translate-y-0",
  },
  "fade-down": {
    hidden: "opacity-0 -translate-y-16",
    visible: "opacity-100 translate-y-0",
  },
  "fade-left": {
    hidden: "opacity-0 translate-x-16",
    visible: "opacity-100 translate-x-0",
  },
  "fade-right": {
    hidden: "opacity-0 -translate-x-16",
    visible: "opacity-100 translate-x-0",
  },
  "zoom-in": {
    hidden: "opacity-0 scale-75",
    visible: "opacity-100 scale-100",
  },
  "zoom-out": {
    hidden: "opacity-0 scale-110",
    visible: "opacity-100 scale-100",
  },
  "flip-up": {
    hidden: "opacity-0 rotateX-90 perspective-1000",
    visible: "opacity-100 rotateX-0",
  },
  "slide-up": {
    hidden: "opacity-0 translate-y-24",
    visible: "opacity-100 translate-y-0",
  },
};

export function ScrollReveal({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.1,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold });
  const styles = variantStyles[variant];

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        isVisible ? styles.visible : styles.hidden,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

interface ScrollRevealGroupProps {
  children: ReactNode[];
  className?: string;
  variant?: AnimationVariant;
  staggerDelay?: number;
  duration?: number;
  threshold?: number;
}

export function ScrollRevealGroup({
  children,
  className,
  variant = "fade-up",
  staggerDelay = 100,
  duration = 700,
  threshold = 0.1,
}: ScrollRevealGroupProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold });
  const styles = variantStyles[variant];

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn(
            "transition-all ease-out",
            isVisible ? styles.visible : styles.hidden
          )}
          style={{
            transitionDuration: `${duration}ms`,
            transitionDelay: `${index * staggerDelay}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
