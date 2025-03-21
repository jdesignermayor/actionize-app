'use client';

import { TaskType } from "@/app/models/taks.model";
import { useState } from "react";

export default function Task({ name, description }: TaskType) {
    const [isEditMode, setIsEditMode] = useState(false);

    return <>
        {isEditMode ? <div className="flex flex-col gap-3 items-left p-5 cursor-pointer bg-black hover:border-b-[#dfdfdf] border-b border-b-[#444444]" onClick={() => setIsEditMode(false)}>
            edit mode enabled
            <p>{name}</p>
        </div> : <div tabIndex={0} className="flex flex-col gap-3 items-left p-5 cursor-pointer hover:font-bold hover:border-b-[#dfdfdf] border-b border-b-[#444444]" onClick={() => setIsEditMode(true)}>
            <p className=" text-text-gray-main text-sm">{name}</p>
            <p className="">{description}</p>
        </div>}
    </>
}