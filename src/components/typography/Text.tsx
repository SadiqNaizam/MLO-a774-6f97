import React from 'react';
import { cn } from '@/lib/utils';

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement | HTMLSpanElement> {
  as?: 'p' | 'span' | 'div';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'; // Tailwind text sizes
  variant?: 'default' | 'muted' | 'destructive' | 'subtle'; // Contextual variants
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'; // Font weights
  // Add other specific props like 'italic', 'underline' if needed
}

const Text: React.FC<TextProps> = ({
  as: Component = 'p', // Default to p
  size = 'base',
  variant = 'default',
  weight = 'normal',
  className,
  children,
  ...props
}) => {
  console.log(`Rendering Text (as ${Component}, size ${size}, variant ${variant}):`, children);

  const sizeStyles = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const variantStyles = {
    default: "text-foreground",
    muted: "text-muted-foreground",
    destructive: "text-destructive",
    subtle: "text-foreground/80", // Slightly less prominent than default
  };

  const weightStyles = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  return (
    <Component
      className={cn(
        sizeStyles[size],
        variantStyles[variant],
        weightStyles[weight],
        "leading-relaxed", // Default leading
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
export default Text;