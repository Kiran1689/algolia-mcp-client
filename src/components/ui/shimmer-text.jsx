import { cn } from "../../lib/utils.js";
import { motion } from "framer-motion";

export default function ShimmerText({
    text = "Text Shimmer",
    className,
}) {
    return (
        <div className="flex items-center justify-center">
            <motion.div
                className="relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.span
                    className={cn(
                        "text-sm font-medium bg-gradient-to-r from-gray-600 via-gray-300 to-gray-600 bg-[length:200%_100%] bg-clip-text text-transparent",
                        className
                    )}
                    animate={{
                        backgroundPosition: ["200% center", "-200% center"],
                    }}
                    transition={{
                        duration: 2.5,
                        ease: "linear",
                        repeat: Number.POSITIVE_INFINITY,
                    }}
                >
                    {text}
                </motion.span>
            </motion.div>
        </div>
    );
}
