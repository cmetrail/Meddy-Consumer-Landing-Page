import Image from "next/image";
import { MealCard as MealCardBase } from "../../how-meddy-works/helper/MealCard";

export default function MealCard() {
  return (
    <div className="relative w-full" style={{ aspectRatio: "428/321" }}>
      <div className="absolute left-0 top-0 h-full w-[61%]">
        <Image
          src="/home/most-care-meal.png"
          alt="Meal"
          fill
          className="object-cover rounded-[11px]"
        />
      </div>
      {/* meal list card */}
      <div className="absolute right-0 bottom-4 w-[62%]">
        <MealCardBase variant="light" className="w-full rounded-[11px]" />
      </div>
    </div>
  );
}
