import { useState } from "react";
import clsx from "clsx"
export type IMacro = {
    key: string;
    label: string;
    shortLabel: string;
    percentage: number;
    color: string;
    extraLabelValue?: React.ReactNode;
};

export const MacroBar = ({ items, variant = "dark" }: { items: IMacro[]; variant?: "dark" | "light" }) => {
    const light = variant === "light";

    return (
        <div className="flex w-full flex-row items-end gap-0.5">
            {items.map((m, index) => {
                const c = m.color
                return (
                    <div
                        key={m.key}
                        style={{ width: `${m.percentage}%` }}
                        className="flex flex-col gap-1  select-none"

                    >
                        {/* bar area — badge floats inside top-left */}
                        <div className={clsx("relative flex w-full items-end justify-end gap-0.5", light ? "h-[73px]" : "h-12.75")}>

                            {/* badge overlapping top of thick bar */}
                            <span
                                className={clsx(
                                    "absolute z-10 text-white font-bold transition-colors duration-300",
                                    light ? "-top-2 left-1 rounded-[2px] px-1 py-0.5 text-[12px] leading-none" : "top-0 left-1 rounded-xs p-0.5 text-[8px]"
                                )}
                                style={{ background: c }}
                            >
                                {m.shortLabel} {m.percentage}%
                            </span>

                            {/* thick leading bar — full height */}
                            <div
                                className={clsx("shrink-0 rounded-sm transition-colors duration-300", light ? "h-[73px] w-[2px]" : "h-12.75 w-0.5")}
                                style={{ background: c }}
                            />

                            {/* equalizer ticks — full height */}
                            <div
                                className={clsx("flex-1 items-end justify-end transition-all duration-300", light ? "h-10" : "h-7")}
                                style={{
                                    backgroundImage: `repeating-linear-gradient(90deg, ${c} 0, ${c} 2px, transparent 2px, transparent 4px)`,
                                }}
                            />
                        </div>

                        <span className={clsx("font-bold", light ? "text-[12px] text-[#111110]" : "text-white text-[8px]")}>{m.label}</span>
                    </div>
                );
            })}
        </div>
    );
};
