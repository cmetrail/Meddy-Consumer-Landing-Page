import Image from "next/image";
import { ChevronUp } from "lucide-react";
import clsx from "clsx";

const MEALS = [
    {
        name: "Iced Lemon Water",
        kcal: 180,
        img: "/home/meal1.png",
        macros: [
            { icon: "/home/carbs.svg", value: "40g" },
            { icon: "/home/meat.svg", value: "30g" },
            { icon: "/home/water.svg", value: "6g" },
        ],
    },
    {
        name: "Side Salad",
        kcal: 400,
        img: "/home/meal2.png",
        macros: [
            { icon: "/home/carbs.svg", value: "40g" },
            { icon: "/home/meat.svg", value: "30g" },
            { icon: "/home/water.svg", value: "6g" },
        ],
    },
];

export const MealCard = ({
    variant = "dark",
    className = "w-67.25 rounded-2xl",
}: {
    variant?: "dark" | "light";
    className?: string;
}) => {
    const light = variant === "light";

    return (
        <div
            className={clsx("flex flex-col", light ? "bg-white" : "bg-white/10", className)}
            style={light ? {
                border: "1px solid #E2E2E2",
                boxShadow: "0px 0.7px 2px rgba(0,0,0,0.05), 0px 1.4px 8px rgba(0,0,0,0.08)",
            } : {
                backdropFilter: "blur(14px)",
                    border: "0.75px solid #FFFFFF1A",
                boxShadow: "0px 0.75px 2.25px 0px #0000000D, 0px 1.5px 9px 0px #00000014",
            }}
        >
            {/* Header */}
            <div
                className={clsx(
                    "flex items-center p-3 justify-between",
                    light ? "border-b border-[#E2E2E2]" : "border-b-[0.1] border-white"
                )}
            >
                <div>
                    <p className={clsx("text-[10px] font-bold leading-[150%]", light ? "text-[#111110]" : "text-white")}>Breakfast</p>
                    <p className={clsx("text-[9px] font-semibold leading-[150%]", light ? "text-[#17925A]" : "text-theme-accent")}>580 kcal</p>
                </div>
                <div className="flex items-center gap-2">
                    {/* Overlapping food thumbnails */}
                    <div className="flex -space-x-2">
                        <div className={clsx("h-7 w-7 rounded-full overflow-hidden border-2", light ? "border-white" : "border-white/20")}>
                            <Image src="/home/meal1.png" alt="" width={24} height={24} className="object-cover w-full h-full" />
                        </div>
                        <div className={clsx("h-7 w-7 rounded-full overflow-hidden border-2", light ? "border-white" : "border-white/20")}>
                            <Image src="/home/meal2.png" alt="" width={24} height={24} className="object-cover w-full h-full" />
                        </div>
                    </div>
                    {/* Chevron button */}
                    <div className={clsx(
                        "h-5.25 w-5.25 rounded-md flex items-center justify-center",
                        light ? "bg-[#17925A]/15" : "rotate-45 bg-theme-accent/15"
                    )}>
                        <ChevronUp size={16} className={clsx("text-theme-accent", light ? "" : "-rotate-45")} />
                    </div>
                </div>
            </div>

            {/* Meal rows */}
            <div className="flex flex-col">
                {MEALS.map((meal) => (
                    <div
                        key={meal.name}
                        className={clsx(
                            "flex items-center last:border-0 px-3 py-2 gap-2",
                            light ? "border-b border-[#E2E2E2]" : "border-b-[0.1] border-white"
                        )}
                    >
                        <div className="h-9 w-9 rounded-lg overflow-hidden shrink-0">
                            <Image src={meal.img} alt={meal.name} width={36} height={36} className="object-cover w-full h-full" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className={clsx("text-[10px] font-bold leading-tight truncate", light ? "text-[#111110]" : "text-white")}>{meal.name}</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                {meal.macros.map((m, i) => (
                                    <div key={i} className="flex items-center gap-0.5">
                                        <Image src={m.icon} alt="" width={10} height={10} />
                                        <span className={clsx("text-[9px] font-medium", light ? "text-[#111110]/80" : "text-white/70")}>{m.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="text-right shrink-0">
                            <p className={clsx("text-base font-bold leading-tight", light ? "text-[#111110]" : "text-white")}>{meal.kcal}</p>
                            <p className={clsx("text-[9px] leading-tight", light ? "text-[#7B7B7B]" : "text-white/60")}>kcal</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
