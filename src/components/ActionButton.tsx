import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ActionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "contact" | "ghost";
  className?: string;
  delay?: number;
}

const ActionButton = ({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
  delay = 0,
}: ActionButtonProps) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 
    px-6 py-3.5 sm:px-8 sm:py-4 
    font-bold text-base sm:text-lg
    rounded-2xl transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  const variantStyles = {
    primary: `
      bg-primary text-primary-foreground
      hover:bg-primary/90 hover:shadow-lg
      focus:ring-primary/50
      shadow-md
    `,
    secondary: `
      bg-secondary text-secondary-foreground
      hover:bg-secondary/80 hover:shadow-md
      focus:ring-secondary/50
      border border-border/50
    `,
    contact: `
      bg-card text-foreground
      hover:bg-card/80 hover:shadow-lg
      focus:ring-primary/30
      border border-border
      shadow-md
    `,
    ghost: `
      bg-transparent text-muted-foreground
      hover:text-foreground hover:bg-muted/50
      focus:ring-muted/50
    `,
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </Component>
  );
};

export default ActionButton;
