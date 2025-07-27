import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils.js";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                blob: cn(
                    "relative cursor-pointer border-0 p-[2px] rounded-[16px]",
                    "bg-[radial-gradient(circle_80px_at_80%_-10%,#181b1b)]",
                    "after:content-[''] after:absolute after:w-[65%] after:h-[60%] after:rounded-[120px] after:top-0 after:right-0 after:shadow-[0_0_20px_#ffffff38] after:-z-10",
                    "disabled:opacity-100 disabled:cursor-default disabled:pointer-events-none"
                    ),

            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = React.forwardRef(function Button(
    { className, variant, size, asChild = false, ...props },
    ref
) {
    const Comp = asChild ? Slot : "button";
    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    );
});

export { Button, buttonVariants };
