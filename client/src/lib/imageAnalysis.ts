import { apiRequest } from "./queryClient";
import { AnalysisResult } from "@shared/schema";

export async function analyzeHandwriting(
  imageFile: File,
  fontName: string
): Promise<AnalysisResult> {
  // Create a FormData object to send the file
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("fontName", fontName);

  // Make a POST request to the API
  const response = await fetch("/api/analyze", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to analyze handwriting: ${text}`);
  }

  return await response.json();
}
