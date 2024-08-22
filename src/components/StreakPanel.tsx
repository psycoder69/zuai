import Image from "next/image";

const StreakPanel = () => {
    return (
        <aside className="hidden w-20 sm:flex flex-col items-end gap-3 p-3 self-stretch">
            <div className="flex flex-col items-end justify-center gap-2 rounded-3xl">
                <div className="flex items-center justify-end gap-1.5 border border-[#eaf0f2] rounded-2xl bg-white pl-1 py-1 pr-2.5">
                    <div className="w-5 h-5 flex items-center justify-center relative">
                        <Image src="/svgs/yellow.svg" alt="icon" width={20} height={20} priority={true} fetchPriority="high" decoding="async" className="absolute" />
                        <Image src="/svgs/orange.svg" alt="icon" width={16} height={16} priority={true} fetchPriority="high" decoding="async" className="absolute" />

                        <span className="text-[6.66px] text-[#834700] font-extrabold leading-normal absolute">
                            ZU
                        </span>
                    </div>

                    <span className="text-[15px] text-[#5b6170] font-['Mont-Bold'] leading-none">
                        125
                    </span>
                </div>

                <div className="flex items-end justify-end gap-1.5 border border-[#eaf0f2] rounded-2xl bg-white pl-1 py-1 pr-2.5">
                    <div className="w-5 h-5 flex items-center justify-center relative">
                        <Image src="/svgs/flame.svg" alt="flame" width={20} height={20} priority={true} fetchPriority="high" decoding="async" />
                    </div>

                    <span className="text-[15px] text-[#5b6170] font-['Mont-Bold'] leading-none">
                        0
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-center rounded-3xl p-1 bg-[#ffffffa3] cursor-pointer">
                <Image src="/svgs/calendar.svg" alt="calendar" width={36} height={36} priority={true} fetchPriority="high" decoding="async" />
            </div>

            <div className="flex items-center justify-center rounded-3xl p-1 bg-[#ffffffa3] cursor-pointer">
                <Image src="/svgs/pages.svg" alt="pages" width={36} height={36} priority={true} fetchPriority="high" decoding="async" />
            </div>
        </aside>
    );
};

export default StreakPanel;