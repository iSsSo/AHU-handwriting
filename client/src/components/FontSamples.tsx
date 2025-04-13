import { Card, CardContent } from "@/components/ui/card";
import { Font } from "@/lib/fonts";

interface FontSamplesProps {
  font: Font;
}

export default function FontSamples({ font }: FontSamplesProps) {
  return (
    <Card className="bg-white shadow-md overflow-hidden h-full">
      <CardContent className="p-6">
        <h3 className="font-medium text-lg text-gray-900 mb-4">Örnek Yazı</h3>
        
        {/* Font Samples - Both Text and Image */}
        <div className="space-y-4 mb-6">
          {/* Text Sample */}
          <div className={`border border-gray-200 rounded-lg p-4 mb-4 min-h-[100px] font-${font.className}`}>
            <p className="text-2xl mb-2">{font.sampleTitle}</p>
            <p className="text-lg">{font.sampleText}</p>
          </div>
          
          {/* Image Sample */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Yazı Örneği:</h4>
            <img 
              src={font.imagePath} 
              alt={`${font.name} yazı örneği`} 
              className="w-full h-auto rounded"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">Öneriler:</h4>
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
            <li>Yazı stiline dikkat edin</li>
            <li>Harflerin eğimini ve bağlantılarını inceleyin</li>
            <li>Ölçü ve oranları korumaya çalışın</li>
            <li>Kağıdınıza benzer bir örnek yazıp fotoğrafını çekin</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
