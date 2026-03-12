"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Step {
    id: string;
    label: string;
}

interface FormStepperProps {
    steps: Step[];
    currentStepIndex: number;
}

export default function FormStepper({ steps, currentStepIndex }: FormStepperProps) {
    return (
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest py-2">
            {steps.map((step, index) => {
                const isActive = index === currentStepIndex;
                const isCompleted = index < currentStepIndex;

                return (
                    <div key={step.id} className="flex items-center gap-2">
                        <span
                            className={`transition-colors duration-300 ${
                                isActive 
                                    ? "text-purple-600 bg-purple-50 px-2 py-1 rounded-md" 
                                    : isCompleted 
                                        ? "text-gray-900" 
                                        : "text-gray-400"
                            }`}
                        >
                            {step.label}
                        </span>
                        {index < steps.length - 1 && (
                            <ArrowRight className={`w-3 h-3 ${isCompleted ? "text-purple-600" : "text-gray-300"}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

