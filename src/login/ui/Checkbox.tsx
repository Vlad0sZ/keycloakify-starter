import * as React from "react";
import { CheckIcon } from "lucide-react";
import { clsx } from "keycloakify/tools/clsx";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, className, id, ...props }, ref) => {
        return (
            <label 
                className="group relative flex cursor-pointer items-center gap-2 select-none text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                htmlFor={id}
            >
                <div className="relative flex size-4 items-center justify-center">
                    <input
                        {...props}
                        id={id}
                        ref={ref}
                        type="checkbox"
                        className={clsx(
                            "peer absolute inset-0 z-10 cursor-pointer opacity-0",
                            className
                        )}
                    />
                    
                    {/* Кастомная рамка */}
                    <div className={clsx(
                        "absolute inset-0 rounded-[4px] border shadow-xs transition-all",
                        "border-input bg-background dark:bg-input/30",
                        "peer-checked:bg-primary peer-checked:border-primary",
                        "peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50 peer-focus-visible:border-ring",
                        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                    )} />

                    {/* Иконка */}
                    <CheckIcon
                        className={clsx(
                            "z-0 size-3 text-primary-foreground transition-transform scale-0 opacity-0",
                            "peer-checked:scale-100 peer-checked:opacity-100"
                        )}
                    />
                </div>
                {label && <span className="leading-none">{label}</span>}
            </label>
        );
    }
);

Checkbox.displayName = "Checkbox";