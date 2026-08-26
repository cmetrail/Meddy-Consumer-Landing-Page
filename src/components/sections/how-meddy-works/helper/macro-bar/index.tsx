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

export const MacroBar = ({ items }: { items: IMacro[] }) => {

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
                        <div className="relative flex h-12.75 w-full items-end justify-end gap-0.5">

                            {/* badge overlapping top of thick bar */}
                            <span
                                className="absolute top-0 left-1 z-10 rounded-xs p-0.5 text-white text-[8px] font-bold transition-colors duration-300"
                                style={{ background: c }}
                            >
                                {m.shortLabel} {m.percentage}%
                            </span>

                            {/* thick leading bar — full height */}
                            <div
                                className="h-12.75 w-0.5 shrink-0 rounded-sm transition-colors duration-300"
                                style={{ background: c }}
                            />

                            {/* equalizer ticks — full height */}
                            <div
                                className={clsx("h-7 flex-1 items-end justify-end transition-all duration-300")}
                                style={{
                                    backgroundImage: `repeating-linear-gradient(90deg, ${c} 0, ${c} 2px, transparent 2px, transparent 4px)`,
                                }}
                            />
                        </div>

                        <span className="text-white text-[8px] font-bold">{m.label}</span>
                    </div>
                );
            })}
        </div>
    );
};
