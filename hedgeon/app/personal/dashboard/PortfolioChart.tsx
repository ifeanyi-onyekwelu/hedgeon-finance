// components/Dashboard/PortfolioChart.tsx
import { useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';

const data = [
    { month: 'Jan', value: 4000 },
    { month: 'Feb', value: 3000 },
    { month: 'Mar', value: 5000 },
    { month: 'Apr', value: 2780 },
    { month: 'May', value: 1890 },
    { month: 'Jun', value: 2390 },
    { month: 'Jul', value: 3490 },
    { month: 'Aug', value: 4300 },
    { month: 'Sep', value: 4100 },
    { month: 'Oct', value: 5200 },
    { month: 'Nov', value: 5800 },
    { month: 'Dec', value: 6200 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 shadow-md rounded-lg border border-gray-100">
                <p className="font-medium">{label}</p>
                <p className="text-blue-600">${payload[0].value.toLocaleString()}</p>
            </div>
        );
    }
    return null;
};

export default function PortfolioChart() {
    const [activeIndex, setActiveIndex] = useState<number>(data.length - 1);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                onMouseMove={(e) => {
                    if (e.activeTooltipIndex !== undefined) {
                        setActiveIndex(e.activeTooltipIndex);
                    }
                }}
            >
                <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280' }}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280' }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }} />
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    activeDot={{ r: 6, stroke: '#2563EB', strokeWidth: 2 }}
                />
                {data[activeIndex] && (
                    <text
                        x="50%"
                        y="15%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#111827"
                        fontWeight="bold"
                        fontSize={24}
                    >
                        ${data[activeIndex].value.toLocaleString()}
                    </text>
                )}
            </AreaChart>
        </ResponsiveContainer>
    );
}