import React from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: 'default' | 'subtle' | 'pageTitle'; // Example variants
  // Add other specific props like 'color', 'weight' if needed
}

const Heading: React.FC<HeadingProps> = ({
  as: Component = 'h2', // Default to h2
  variant = 'default',
  className,
  children,
  ...props
}) => {
  console.log(`Rendering Heading (as ${Component}, variant ${variant}):`, children);

  const baseStyles = "font-semibold tracking-tight";
  const variantStyles = {
    default: "text-2xl md:text-3xl",
    subtle: "text-xl text-muted-foreground",
    pageTitle: "text-3xl md:text-4xl border-b pb-2 mb-4",
  };

  return (
    <Component
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
export default Heading;