import { useState } from "react";
import clsx from "clsx";

export type ISleepStage = {
    key: string;
    label: string;
    shortLabel: string;
    percentage: number;
    color: string;
    badgeBg: string;
    extraLabelValue?: React.ReactNode;
};

interface ISleepArchitectureBarProps {
    items: ISleepStage[];
    variant?: "dark" | "light";
}

export const ComulativeBar = ({ items, variant = "dark" }: ISleepArchitectureBarProps) => {
    const [selected, setSelected] = useState<string | null>(null);
    const light = variant === "light";

    const toggle = (key: string) =>
        setSelected((prev) => (prev === key ? null : key));

    const isActive = (key: string) => selected === null || selected === key;

    return (
        <div className="flex flex-col gap-2">
            {/* Bar */}
            <div className="flex w-full overflow-hidden flex-row gap-0.5">
                {items.map((m, i) => (
                    <div key={i} style={{ width: `${m.percentage}%` }} className="flex flex-col gap-0.5">
                        <div className="flex flex-row gap-0.5">
                            <div
                                className={clsx(
                                    "w-1 h-6.75 transition-all duration-400 ease-in-out",
                                    isActive(m.key) ? m.color : light ? "bg-[#ECECEC]" : "bg-[#212429]"
                                )}
                            />
                            <div
                                className={clsx(
                                    "flex h-6.75 flex-1 transition-all duration-400 ease-in-out",
                                    isActive(m.key) ? m.color : light ? "bg-[#ECECEC]" : "bg-[#212429]"
                                )}
                            />
                        </div>
                    </div>
                ))}
            </div>
            {/* Legend badges */}
            <div className="flex gap-1 flex-wrap">
                {items.map((m) => (
                    <div
                        key={m.key}

                        className={clsx(
                            "flex items-center gap-2 h-4.5 p-0.5 py-1 rounded-md transition-all duration-200 cursor-pointer select-none bg-[#F8F8F8]",
                        )}
                    >
                        <span className={clsx("w-2 h-2 rounded-xs ", m.badgeBg)} />
                        <span className={clsx("font-semibold text-[8px] text-theme-textSecondary")}>{m.label}</span>
                        {m?.extraLabelValue && <span className={clsx("font-medium text-[8px] flex flex-row gap-0.5 text-theme-textSecondary")}>{m?.extraLabelValue}</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};
