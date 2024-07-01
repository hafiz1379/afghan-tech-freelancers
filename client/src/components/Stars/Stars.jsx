import React from 'react'
import { HiStar } from "react-icons/hi";

export default function Stars({amount}) {
  return (
    <div className="flex gap-[1px] items-center text-gray-500">
      {Array.from({ length: amount }, (v, i) => i).map((value) => (
        <HiStar key={value} size={28} className="text-orange-300" />
      ))}
      <span className="inline-block ml-2 font-bold text-lg">{amount}</span>
    </div>
  );
}
