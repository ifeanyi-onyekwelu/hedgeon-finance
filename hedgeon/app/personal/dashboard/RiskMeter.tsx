// components/Dashboard/RiskMeter.tsx
import { useState } from 'react';

const riskLevels = [
    { label: 'Conservative', color: 'bg-green-500' },
    { label: 'Moderate', color: 'bg-blue-500' },
    { label: 'Balanced', color: 'bg-yellow-500' },
    { label: 'Growth', color: 'bg-orange-500' },
    { label: 'Aggressive', color: 'bg-red-500' }
];

export default function RiskMeter({ level = 2 }: { level: number }) {
    const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

    return (
        <div className="space-y-4">
            <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Low Risk</span>
                <span className="text-sm text-gray-500">High Risk</span>
            </div>

            <div className="flex h-4 rounded-full bg-gray-200 overflow-hidden">
                {riskLevels.map((_, index) => (
                    <div
                        key={index}
                        className={`flex-1 transition-all duration-300 ${index < level ? riskLevels[index].color : 'bg-gray-300'
                            } ${hoveredLevel !== null && index <= hoveredLevel ? 'opacity-100' : 'opacity-80'}`}
                        onMouseEnter={() => setHoveredLevel(index)}
                        onMouseLeave={() => setHoveredLevel(null)}
                    />
                ))}
            </div>

            <div className="flex justify-center mt-4">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${level <= 1 ? 'bg-green-100 text-green-800' :
                    level <= 2 ? 'bg-blue-100 text-blue-800' :
                        level <= 3 ? 'bg-yellow-100 text-yellow-800' :
                            level <= 4 ? 'bg-orange-100 text-orange-800' :
                                'bg-red-100 text-red-800'
                    }`}>
                    {riskLevels[level - 1]?.label || 'Unknown'}
                </span>
            </div>
        </div>
    );
}