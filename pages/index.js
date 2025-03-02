import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [language, setLanguage] = useState("ko"); // 'ko' for Korean, 'en' for English
  const [isDragging, setIsDragging] = useState(false);
  
  const translations = {
    en: {
      title: "AI Face Emotion Analysis",
      subtitle: "Upload a photo to analyze facial emotions",
      dropzone: "Drop your photo here",
      language: "English",
      altLanguage: "한국어"
    },
    ko: {
      title: "AI 얼굴 감정 분석",
      subtitle: "사진을 업로드하여 얼굴 감정을 분석해보세요",
      dropzone: "여기에 사진을 끌어다 놓으세요",
      language: "한국어",
      altLanguage: "English"
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    // 여기에 파일 처리 로직을 추가할 수 있습니다
  };

  const toggleLanguage = () => {
    setLanguage(language === "ko" ? "en" : "ko");
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex flex-col items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)] bg-white text-black`}
    >
      <main className="flex flex-col items-center w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">{translations[language].title}</h1>
        <p className="text-sm mb-8">{translations[language].subtitle}</p>
        
        <div className="flex items-center mb-8">
          <button 
            onClick={toggleLanguage}
            className={`px-2 py-1 text-sm ${language === "en" ? "font-bold" : ""}`}
          >
            {translations.en.language}
          </button>
          <button 
            onClick={toggleLanguage}
            className={`px-2 py-1 text-sm ${language === "ko" ? "font-bold" : ""}`}
          >
            {translations.ko.language}
          </button>
        </div>
        
        <div 
          className={`w-full h-64 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center mb-4">
              <span className="text-xl">+</span>
            </div>
            <p className="text-sm text-gray-500">{translations[language].dropzone}</p>
            <input 
              id="fileInput" 
              type="file" 
              className="hidden" 
              accept="image/*"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
