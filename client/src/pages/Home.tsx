import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import FontSamples from "@/components/FontSamples";
import ImageUpload from "@/components/ImageUpload";
import TipsSection from "@/components/TipsSection";
import ProgressStats from "@/components/ProgressStats";
import { Font, defaultFonts } from "@/lib/fonts";
import { type AnalysisResult } from "@shared/schema";
import { cn } from "@/lib/utils";

export default function Home() {
  const [fonts, setFonts] = useState<Font[]>(defaultFonts);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Fetch fonts from the API
  const { data: apiFonts, isLoading } = useQuery({
    queryKey: ["/api/fonts"],
    staleTime: Infinity, // Fonts don't change frequently
  });

  useEffect(() => {
    if (apiFonts) {
      // Use the data from the API directly
      setFonts(
        apiFonts.map((apiFont: any) => {
          return {
            ...apiFont,
            bestScore: 0,
          };
        })
      );
    }
  }, [apiFonts]);

  const handleResultUpdate = (result: AnalysisResult) => {
    setFonts((currentFonts) => {
      return currentFonts.map((font, idx) => {
        if (idx === selectedIndex) {
          // Update the best score if the current result is better
          const bestScore = font.bestScore || 0;
          return {
            ...font,
            bestScore: result.matchPercentage > bestScore ? result.matchPercentage : bestScore,
          };
        }
        return font;
      });
    });
  };

  return (
    <Layout>
      {/* Introduction */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">El Yazınızı Geliştirin</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          5 farklı el yazısı fontunu taklit ederek pratik yapın ve yazınızın ne kadar benzediğini görün. 
          Bir font seçin, örneği inceleyin, kendi yazınızı yükleyin ve karşılaştırma sonucunu alın.
        </p>
      </div>

      {/* Font Selector Tabs */}
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="border-b border-gray-200 mb-6 flex space-x-6 overflow-x-auto">
          {fonts.map((font, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                cn(
                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm outline-none",
                  selected
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )
              }
            >
              {font.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {fonts.map((font, index) => (
            <Tab.Panel key={index}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Left Column: Sample Font */}
                <FontSamples font={font} />
                
                {/* Right Column: Upload & Results */}
                <ImageUpload 
                  font={font}
                  onResultUpdate={handleResultUpdate}
                />
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      
      {/* Tips Section */}
      <TipsSection />
      
      {/* Progress Stats */}
      <ProgressStats fonts={fonts} />
    </Layout>
  );
}
