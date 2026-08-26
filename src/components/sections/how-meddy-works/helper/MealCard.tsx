import Image from "next/image";
import { ChevronUp } from "lucide-react";

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

export const MealCard = () => {
    return (
        <div
            className="bg-white/10 flex flex-col w-67.25 rounded-2xl "
            style={{
                backdropFilter: "blur(14px)",
                border: "0.1px solid rgba(255,255,255,1)",
                boxShadow: "0px 0.75px 2.25px 0px #0000000D, 0px 1.5px 9px 0px #00000014",
            }}
        >
            {/* Header */}
            <div className="flex items-center  border-b-[0.1] p-3 border-white justify-between">
                <div>
                    <p className="text-[10px] font-bold text-white leading-[150%]">Breakfast</p>
                    <p className="text-[9px] font-semibold text-theme-accent leading-[150%]">580 kcal</p>
                </div>
                <div className="flex items-center gap-2">
                    {/* Overlapping food thumbnails */}
                    <div className="flex -space-x-2">
                        <div className="h-7 w-7 rounded-full overflow-hidden border-2 border-white/20">
                            <Image src="/home/meal1.png" alt="" width={24} height={24} className="object-cover w-full h-full" />
                        </div>
                        <div className="h-7 w-7 rounded-full overflow-hidden border-2 border-white/20">
                            <Image src="/home/meal2.png" alt="" width={24} height={24} className="object-cover w-full h-full" />
                        </div>
                    </div>
                    {/* Chevron button */}
                    <div className="h-5.25 w-5.25 rounded-md rotate-45 bg-theme-accent/15 flex items-center justify-center">
                        <ChevronUp size={16} className="text-theme-accent -rotate-45" />
                    </div>
                </div>
            </div>

            {/* Meal rows */}
            <div className="flex flex-col">
                {MEALS.map((meal) => (
                    <div key={meal.name} className="flex items-center border-b-[0.1] last:border-0 px-3 py-2 border-white gap-2">
                        <div className="h-9 w-9 rounded-lg overflow-hidden shrink-0">
                            <Image src={meal.img} alt={meal.name} width={36} height={36} className="object-cover w-full h-full" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-white leading-tight truncate">{meal.name}</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                {meal.macros.map((m, i) => (
                                    <div key={i} className="flex items-center gap-0.5">
                                        <Image src={m.icon} alt="" width={10} height={10} />
                                        <span className="text-[9px] text-white/70 font-medium">{m.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="text-right shrink-0">
                            <p className="text-base font-bold text-white leading-tight">{meal.kcal}</p>
                            <p className="text-[9px] text-white/60 leading-tight">kcal</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
