import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, CropIcon, Pen } from "lucide-react";

export default function TipsSection() {
  return (
    <Card className="bg-white shadow-md overflow-hidden mb-8" id="tips">
      <CardContent className="p-6">
        <h3 className="font-medium text-lg text-gray-900 mb-4">Daha İyi Sonuçlar İçin İpuçları</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">İyi Aydınlatma</h4>
              <p className="mt-1 text-sm text-gray-500">Yazınızın net görünmesi için iyi aydınlatılmış bir ortamda fotoğraf çekin.</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <CropIcon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">Yakın Plan Çekim</h4>
              <p className="mt-1 text-sm text-gray-500">Sadece yazınızı içeren yakın plan bir fotoğraf çekin, fazla boşluk bırakmayın.</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <Pen className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">Kalem Seçimi</h4>
              <p className="mt-1 text-sm text-gray-500">Seçtiğiniz yazı stiline uygun kalem kalınlığını tercih edin.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}