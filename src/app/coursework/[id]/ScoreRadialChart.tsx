import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const ScoreRadialChart = ({ size, score, maximumScore }: { size: number, score: number, maximumScore: number }) => {
    const percentage = ((score / maximumScore) * 100);

    const getScoreColor = (percentage: number) => {
        return (percentage >= 70 ? "#3cc28a" : (percentage >= 40 ? "#f9c94e" : "#eb751f"));
    };

    const chartData = [
        { name: "Score", value: percentage, fill: getScoreColor(percentage) },
    ]

    const chartConfig = {
        value: {
            label: "Score",
        }
    } satisfies ChartConfig

    return (
        <ChartContainer
            config={chartConfig}
            className={`mx-auto size-[${size}px] aspect-square`}
        >
            <RadialBarChart
                data={chartData}
                startAngle={90}
                endAngle={90 - ((percentage / 100) * 360)}
                innerRadius={36}
                outerRadius={56}
                width={size}
                height={size}
            >
                <PolarGrid
                    gridType="circle"
                    radialLines={false}
                    stroke="#d6dfe4"
                    strokeWidth={8}
                    className="first:fill-muted last:fill-background"
                    polarRadius={[36, 36]}
                />

                <RadialBar dataKey="value" background cornerRadius={10} />

                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fontSize={10}
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-foreground text-base text-[#1e2026] font-['Mont-ExtraBold'] leading-normal"
                                        >
                                            {
                                                `${score}/${maximumScore}`
                                            }
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 12}
                                            className="fill-muted-foreground"
                                        >
                                        </tspan>
                                    </text>
                                )
                            }
                        }}
                    />
                </PolarRadiusAxis>
            </RadialBarChart>
        </ChartContainer>
    );
};

export default ScoreRadialChart;