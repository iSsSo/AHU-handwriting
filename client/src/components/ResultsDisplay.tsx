import { AnalysisResult } from "@shared/schema";
import { getMatchColorClass } from "@/lib/fonts";

interface ResultsDisplayProps {
  result: AnalysisResult;
  uploadedImage: string | null;
}

export default function ResultsDisplay({ result, uploadedImage }: ResultsDisplayProps) {
  const { matchPercentage, shapeMatch, slopeMatch, scaleMatch, fluencyMatch } = result;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h4 className="font-medium text-gray-800">Karşılaştırma Sonucu</h4>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-gray-700 font-medium">Benzerlik Oranı</div>
          <div className="font-bold text-lg">{`%${matchPercentage}`}</div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ease-out ${getMatchColorClass(matchPercentage)}`}
            style={{width: `${matchPercentage}%`}}
          />
        </div>
        
        {/* Detailed Feedback */}
        <div className="space-y-3 mb-6">
          <h5 className="font-medium text-gray-800 text-sm">Detaylı Geri Bildirim</h5>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-50 p-3 rounded">
              <div className="text-gray-500 mb-1">Şekil Uyumu</div>
              <div className="font-medium">{`%${shapeMatch}`}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="text-gray-500 mb-1">Eğim Uyumu</div>
              <div className="font-medium">{`%${slopeMatch}`}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="text-gray-500 mb-1">Ölçek Uyumu</div>
              <div className="font-medium">{`%${scaleMatch}`}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="text-gray-500 mb-1">Akıcılık</div>
              <div className="font-medium">{`%${fluencyMatch}`}</div>
            </div>
          </div>
        </div>
        
        {/* Uploaded Image */}
        {uploadedImage && (
          <div>
            <h5 className="font-medium text-gray-800 text-sm mb-2">Yüklenen Yazınız</h5>
            <img 
              src={uploadedImage} 
              className="w-full h-32 object-contain border border-gray-200 rounded" 
              alt="Yüklenen yazı" 
            />
          </div>
        )}
      </div>
    </div>
  );
}
