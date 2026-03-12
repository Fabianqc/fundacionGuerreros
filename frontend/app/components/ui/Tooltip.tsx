"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({ children, content, position = "top" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 -translate-x-1/2 mb-2";
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2 mt-2";
      case "left":
        return "right-full top-1/2 -translate-y-1/2 mr-2";
      case "right":
        return "left-full top-1/2 -translate-y-1/2 ml-2";
      default:
        return "bottom-full left-1/2 -translate-x-1/2 mb-2";
    }
  };

  const animationVariants = {
    top: { initial: { y: 5, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    bottom: { initial: { y: -5, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    left: { initial: { x: 5, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    right: { initial: { x: -5, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  };

  return (
    <div 
      className="relative flex items-center justify-center p-0.5"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={animationVariants[position].initial}
            animate={animationVariants[position].animate}
            exit={animationVariants[position].initial}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute z-50 whitespace-nowrap px-2.5 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg shadow-xl shadow-gray-200 pointer-events-none ${getPositionClasses()}`}
          >
            {content}
            {/* Arrow */}
            <div 
              className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 
                ${position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2' : ''}
                ${position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2' : ''}
                ${position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2' : ''}
                ${position === 'right' ? 'left-[-4px] top-1/2 -translate-y-1/2' : ''}
              `} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
