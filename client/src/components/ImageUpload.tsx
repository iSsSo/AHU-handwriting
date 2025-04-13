import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useDropzone } from "react-dropzone";
import { Upload, Redo, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnalysisResult } from "@shared/schema";
import { analyzeHandwriting } from "@/lib/imageAnalysis";
import { Font } from "@/lib/fonts";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import ResultsDisplay from "./ResultsDisplay";

interface ImageUploadProps {
  font: Font;
  onResultUpdate: (result: AnalysisResult) => void;
}

export default function ImageUpload({ font, onResultUpdate }: ImageUploadProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      // Read file and set preview
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Start analysis
      setIsAnalyzing(true);
      setLoadingProgress(10);

      // Simulating progress updates while the analysis happens
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          const increment = Math.floor(Math.random() * 15);
          const newValue = Math.min(prev + increment, 90);
          return newValue;
        });
      }, 300);

      try {
        // Perform the actual analysis
        const result = await analyzeHandwriting(file, font.name);
        
        // Set loading to 100% and clear interval
        setLoadingProgress(100);
        clearInterval(interval);
        
        // Update the state with results
        setAnalysisResult(result);
        setAnalysisComplete(true);
        setIsAnalyzing(false);
        
        // Notify parent component
        onResultUpdate(result);
      } catch (error) {
        clearInterval(interval);
        toast({
          title: "Analiz hatası",
          description: "Yazınız analiz edilirken bir hata oluştu. Lütfen tekrar deneyin.",
          variant: "destructive",
        });
        setIsAnalyzing(false);
        console.error("Analysis error:", error);
      }
    } catch (error) {
      toast({
        title: "Dosya yükleme hatası",
        description: "Dosya yüklenirken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
      console.error("File upload error:", error);
    }
  }, [font.name, onResultUpdate, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': []
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false
  });

  const resetAnalysis = () => {
    setUploadedImage(null);
    setAnalysisResult(null);
    setAnalysisComplete(false);
    setIsAnalyzing(false);
    setLoadingProgress(0);
  };

  const downloadResults = () => {
    // In a real implementation, this would generate and download a PDF or image with results
    toast({
      title: "İndirme başlatıldı",
      description: "Sonuçlarınız indiriliyor...",
    });
  };

  return (
    <Card className="bg-white shadow-md overflow-hidden h-full">
      <CardContent className="p-6">
        <h3 className="font-medium text-lg text-gray-900 mb-4">Yazınızı Yükleyin</h3>
        
        {/* Upload Area */}
        {!isAnalyzing && !analysisComplete && (
          <div className="mb-6">
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
                ${isDragActive 
                  ? 'border-primary bg-primary-50/50' 
                  : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'
                }`}
            >
              <div className="space-y-3">
                <Upload className="h-10 w-10 mx-auto text-gray-400" />
                <div className="text-gray-600">
                  <p className="font-medium">Dosyayı buraya sürükleyin veya tıklayın</p>
                  <p className="text-sm mt-1">PNG, JPG veya JPEG (maks. 5MB)</p>
                </div>
              </div>
              <input {...getInputProps()} />
            </div>
          </div>
        )}

        {/* Loading/Analyzing State */}
        {isAnalyzing && (
          <div className="mb-6">
            <div className="border border-gray-200 rounded-lg p-8 relative">
              <div className="relative z-10 flex flex-col items-center justify-center">
                <Progress value={loadingProgress} className="w-[80%] mb-4" />
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-900 mb-1">Analiz Ediliyor...</p>
                  <p className="text-sm text-gray-500">{`%${Math.round(loadingProgress)}`}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center"></div>
              {uploadedImage && (
                <img 
                  src={uploadedImage} 
                  className="w-full h-48 object-contain mx-auto" 
                  alt="Yüklenen yazı" 
                />
              )}
            </div>
          </div>
        )}

        {/* Results Area */}
        {analysisComplete && analysisResult && (
          <>
            <ResultsDisplay 
              result={analysisResult} 
              uploadedImage={uploadedImage} 
            />
            
            {/* Action Buttons */}
            <div className="flex space-x-3 mt-6">
              <Button 
                variant="outline" 
                onClick={resetAnalysis}
                className="flex items-center"
              >
                <Redo className="h-4 w-4 mr-1" /> Yeniden Dene
              </Button>
              <Button 
                onClick={downloadResults}
                className="flex items-center"
              >
                <Download className="h-4 w-4 mr-1" /> Sonuçları İndir
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
