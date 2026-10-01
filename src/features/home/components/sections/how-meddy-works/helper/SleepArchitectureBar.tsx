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

export const SleepArchitectureBar = ({ items, variant = "dark" }: ISleepArchitectureBarProps) => {
    const [selected, setSelected] = useState<string | null>(null);
    const light = variant === "light";

    const toggle = (key: string) =>
        setSelected((prev) => (prev === key ? null : key));

    const isActive = (key: string) => selected === null || selected === key;

    return (
        <div className="flex flex-col gap-5">
            {/* Bar */}
            <div className="flex w-full overflow-hidden flex-row gap-0.5">
                {items.map((m, i) => (
                    <div key={i} style={{ width: `${m.percentage}%` }} className="flex flex-col gap-0.5">
                        <div className="flex flex-row gap-0.5">
                            <div
                                className={clsx(
                                    "w-1 h-12 transition-all duration-400 ease-in-out",
                                    isActive(m.key) ? m.color : light ? "bg-[#ECECEC]" : "bg-[#212429]"
                                )}
                            />
                            <div
                                className={clsx(
                                    "flex h-12 flex-1 transition-all duration-400 ease-in-out",
                                    isActive(m.key) ? m.color : light ? "bg-[#ECECEC]" : "bg-[#212429]"
                                )}
                            />
                        </div>
                        <div className={clsx("text-[9px] font-bold", light ? "text-[#7B7B7B]" : "text-white")}>{m.percentage}%</div>
                    </div>
                ))}
            </div>
            {/* Legend badges */}
            <div className="flex gap-1 flex-wrap">
                {items.map((m) => (
                    <div
                        key={m.key}

                        className={clsx(
                            "flex items-center gap-2 h-8.25 p-1.5 py-1 rounded-md transition-all duration-200 cursor-pointer select-none",
                            light ? "bg-[#F8F8F8] border border-[#E2E2E2]" : "bg-[#848484]/14",

                        )}
                    >
                        <span className={clsx("w-3 h-3 rounded-xs ", m.badgeBg)} />
                        <span className={clsx("font-semibold text-[10px]", light ? "text-[#7B7B7B]" : "text-theme-textSecondary")}>{m.label}</span>
                        {m?.extraLabelValue && <span className={clsx("font-medium text-sm flex flex-row gap-0.5", light ? "text-[#111110]" : "text-theme-textSecondary")}>{m?.extraLabelValue}</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};
