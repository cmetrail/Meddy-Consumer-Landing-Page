import Image from "next/image";
import FeatureCopy from "./FeatureCopy";
import GiantNumber from "./GiantNumber";
import NutritionCard from "./NutritionCard";
import { MealCard } from "./MealCard";

export default function NutritionSection() {
  return (
    <div className="">
      <div className="max-w-360 mx-auto px-5 lg:px-10 relative">
        <GiantNumber n="01" />
        <div className="grid lg:grid-cols-2  gap-12 lg:gap-16 items-center">
          <div className="pt-24 pl-0  lg:pl-16">
          <FeatureCopy
            eyebrow="Nutrition Intelligence"
            headline={["Eat smarter,", "and give your doctor"]}
            accent="something to work with."
            sub="Log meals in seconds. Every entry feeds the nutrition picture your physician uses to guide your care."
            />
          </div>
          <div className="relative w-full md:w-fit md:mx-auto">
            <div className="absolute w-62.5 right-[3%] top-[10%] origin-top-right scale-[0.8] sm:scale-100">
              <MealCard />
            </div>
            <Image
              src="/home/nutrition-photos.png"
              alt="Nutrition tracking"
              height={792}
              width={640}
              priority
              className="object-contain w-full h-auto md:w-160 md:h-198"
            />
            <div className="absolute w-62.5 left-0 bottom-[5%] origin-bottom-left scale-[0.8] sm:scale-100">
              <NutritionCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
