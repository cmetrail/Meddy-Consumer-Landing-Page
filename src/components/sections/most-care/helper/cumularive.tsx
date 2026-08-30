import React from 'react'
import { ISleepStage } from '../../how-meddy-works/helper/SleepArchitectureBar';
import { ComulativeBar } from './cumulative';

export const Cumulartive = () => {
      const breakdown: ISleepStage[] = [
        { key: "chest", label: "Chest", shortLabel: "Chest", percentage: 23, color: "bg-[#E09A2A]", badgeBg: "bg-[#E09A2A]", extraLabelValue: <span>110 lbs</span> },
        { key: "back", label: "Back", shortLabel: "Back", percentage: 10, color: "bg-[#148BD5]", badgeBg: "bg-[#148BD5]", extraLabelValue: <span>50 lbs</span> },
        { key: "legs", label: "Legs", shortLabel: "Legs", percentage: 21, color: "bg-[#C084FC]", badgeBg: "bg-[#C084FC]", extraLabelValue: <span>100 lbs</span> },
        { key: "arms", label: "Arms", shortLabel: "Arms", percentage: 25, color: "bg-[#6EE7A0]", badgeBg: "bg-[#6EE7A0]", extraLabelValue: <span>120 lbs</span> },
        { key: "shoulders", label: "Shoulders", shortLabel: "Shoulders", percentage: 21, color: "bg-[#FF7043]", badgeBg: "bg-[#FF7043]", extraLabelValue: <span>100 lbs</span> },
      ];
    return (
        <div className='flex flex-col gap-3'>
            <div className="flex items-center justify-between">
                <span className="text-theme-textSecondary text-[6px]">Cumulative</span>
                <div className="flex overflow-hidden h-3.25 rounded-lg bg-[#F8F8F8] text-[6px] font-bold">
                    <span className=" bg-[#F8F8F8]  px-1.5 py-0.5 text-theme-textSecondary">%</span>
                    <span className="bg-[#17925A] px-1.5 py-0.5  text-white">Load</span>
                </div>
            </div>
            <ComulativeBar items={breakdown}/>
        </div>
    )
}
