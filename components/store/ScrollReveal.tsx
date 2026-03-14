"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
}

export function ScrollReveal({ 
    children, 
    direction = "up", 
    delay = 0, 
    duration = 0.8,
    className = "",
    once = true
}: ScrollRevealProps) {
    const directions = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 }
    };

    return (
        <motion.div
            initial={{ 
                opacity: 0, 
                ...directions[direction] 
            }}
            whileInView={{ 
                opacity: 1, 
                y: 0, 
                x: 0 
            }}
            viewport={{ once }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1.0] // Luxury Cubic Bezier
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
