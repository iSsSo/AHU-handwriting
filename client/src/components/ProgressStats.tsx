import { Card, CardContent } from "@/components/ui/card";
import { Font, getMatchColorClass } from "@/lib/fonts";

interface ProgressStatsProps {
  fonts: Font[];
}

export default function ProgressStats({ fonts }: ProgressStatsProps) {
  return (
    <Card className="bg-white shadow-md overflow-hidden">
      <CardContent className="p-6">
        <h3 className="font-medium text-lg text-gray-900 mb-4">Gelişim Takibi</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {fonts.map((font, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-700">{font.name}</div>
                <div className="text-sm font-bold">{`%${font.bestScore || 0}`}</div>
              </div>
              <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ease-out ${getMatchColorClass(font.bestScore || 0)}`}
                  style={{width: `${font.bestScore || 0}%`}}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
