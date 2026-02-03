import React, { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { Slot } from "@radix-ui/react-slot"; // Importação necessária
import { cn } from "@/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "bordered" | "danger" | "ghost" | "link";
  isLoading?: boolean;
  disableRipple?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  isIconOnly?: boolean;
  asChild?: boolean; // Nova propriedade
}

interface RippleData {
  x: number;
  y: number;
  size: number;
  id: number;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      isLoading,
      disableRipple = false,
      startContent,
      endContent,
      children,
      onClick,
      isIconOnly,
      asChild = false, // Default como false
      ...props
    },
    ref,
  ) => {
    const [ripples, setRipples] = useState<RippleData[]>([]);

    const createRipple = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (disableRipple || isLoading) return;

        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const id = Date.now();
        const newRipple = { x, y, size, id };

        setRipples((prev) => [...prev, newRipple]);

        setTimeout(() => {
          setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
        }, 600);
      },
      [disableRipple, isLoading],
    );

    const rippleColor =
      variant === "bordered" || variant === "ghost" || variant === "link"
        ? "bg-primary/20"
        : "bg-white/40";

    const variants = {
      default: "bg-primary text-primary-foreground",
      bordered: "border border-border bg-transparent hover:bg-accent",
      danger: "bg-danger text-white",
      ghost: "bg-transparent hover:bg-accent",
      link: "text-primary underline-offset-4 hover:underline bg-transparent",
    };

    // Definimos qual componente renderizar: o botão nativo ou o Slot
    const Component = asChild ? Slot : "button";

    const innerContent = (
      <>
        {variant !== "link" && (
          <span className="absolute inset-0 pointer-events-none">
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className={`absolute ${rippleColor} rounded-full animate-ripple pointer-events-none`}
                style={{
                  top: ripple.y,
                  left: ripple.x,
                  width: ripple.size,
                  height: ripple.size,
                }}
              />
            ))}
          </span>
        )}
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!isIconOnly && !isLoading && startContent}
        <span className={cn(isLoading && "opacity-70")}>{children}</span>
        {!isIconOnly && endContent}
      </>
    );

    return (
      <Component
        {...props}
        ref={ref}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          createRipple(e);
          onClick?.(e);
        }}
        className={cn(
          "relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all active:scale-95 disabled:opacity-50 h-9",
          isIconOnly ? "w-9 p-0" : "px-4 py-2",
          variants[variant],
          className,
        )}
      >
        {asChild
          ? // Quando asChild é true, o usuário é responsável pelo conteúdo interno.
            // O Slot vai pegar o <a> e injetar a classe, o onClick e o ref nele.
            children
          : // Layout normal para quando o botão é renderizado como <button>
            innerContent}
      </Component>
    );
  },
);

Button.displayName = "Button";
