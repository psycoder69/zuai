"use client";

import NavBar from "@/components/NavBar";
import Evaluator from "@/components/Evaluator";
import StreakPanel from "../components/StreakPanel";

export default function Home() {
    return (
        <div className="size-full flex items-start flex-grow flex-shrink-0 basis-0 self-stretch bg-[#e5ecf3] relative">
            <NavBar />
            <Evaluator />
            <StreakPanel />
        </div>
    );
};
