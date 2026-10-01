import Image from "next/image";
import { SleepArchitectureBar, type ISleepStage } from "../../how-meddy-works/helper/SleepArchitectureBar";
import { Cumulartive } from "./cumularive";

export default function WorkoutCard() {

  return (
    <div className="relative w-full" style={{ aspectRatio: "512/345" }}>
      <div className="absolute left-0 top-0 h-full w-[65%]">
        <Image
          src="/home/most-care-workout.png"
          alt="Workout"
          fill
          className="object-cover rounded-[10px]"
        />
      </div>
      {/* cumulative load card — floating overlay top-right */}
      <div className="absolute right-0 top-[5px] rounded-md border-[0.5px] border-[#E2E2E2] bg-white p-2 w-51.75">
        <Cumulartive />
        {/* <div className="mt-3">
          <SleepArchitectureBar variant="light" items={breakdown} />
        </div> */}
      </div>
    </div>
  );
}
