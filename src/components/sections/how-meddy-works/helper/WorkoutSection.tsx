import Image from "next/image";
import FeatureCopy from "./FeatureCopy";
import GiantNumber from "./GiantNumber";
import WorkoutCard from "./WorkoutCard";
import WorkoutStatsCard from "./WorkoutStatsCard";

export default function WorkoutSection() {
  return (
    <div className="">
      <div className="max-w-360 mx-auto px-4 relative">
        {/* <div>
          <GiantNumber n="02" align="right" />
        </div> */}
        <div className="grid lg:grid-cols-2  gap-12 lg:gap-16">
          <div className="relative w-full md:w-fit md:mx-auto">
            <div className="absolute right-[0%] top-[0%] origin-top-right scale-[0.8] sm:scale-100 w-87.5" >
              <WorkoutCard />
            </div>
            <Image
              src="/home/workout-photo.png"
              alt="Workout tracking"
              height={829}
              width={455}
              priority
              className="object-contain pl-5 w-full h-auto md:w-158.25 md:h-218.5"
            />
            <div className="absolute left-[0%] bottom-[0%] origin-bottom-left scale-[0.8] sm:scale-100 w-75" >
              <WorkoutStatsCard />
            </div>
          </div>
          <div className="flex flex-row  relative ">
            <div className="lg:flex hidden">
              <GiantNumber n="02" align="right" />
            </div>
            <div className="flex lg:hidden ">
              <GiantNumber n="02" />
            </div>
            <div className="flex flex-col flex-1 lg:pl-20 py-20 lg:pt-5 justify-center">
              <FeatureCopy
                eyebrow="Workouts"
                headline={["Train with a plan your"]}
                accent="doctor can actually see."
                sub="Save workouts and track progress — so your physician knows what's working, not just what you weigh."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
