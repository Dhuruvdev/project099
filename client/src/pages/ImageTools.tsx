import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Eraser, ImageIcon, Sliders, Type, FileImage, ShieldCheck, Sparkles, Upload, FileText, Video } from "lucide-react";
import portraitImage from "@assets/generated_images/portrait_of_a_woman_with_curly_hair_on_a_transparent_background_with_purple_accents.png";
import { Helmet } from "react-helmet";

const TOOLS = [
  { id: 'bg-remover', name: 'Background Remover', icon: <Eraser className="w-5 h-5" />, active: true },
  { id: 'compressor', name: 'Image Compressor', icon: <FileImage className="w-5 h-5" /> },
  { id: 'resize', name: 'Image Resize & Crop', icon: <Sliders className="w-5 h-5" /> },
  { id: 'convert', name: 'Convert Image', icon: <ImageIcon className="w-5 h-5" /> },
  { id: 'ocr', name: 'Image to Text (OCR)', icon: <Type className="w-5 h-5" /> },
];

export default function ImageTools() {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#0F0720]">
      <Helmet>
        <title>Remove Background - Project 099</title>
        <meta name="description" content="Instantly erase image backgrounds with just one click." />
      </Helmet>
      
      {/* Header matching dashboard navbar exactly */}
      <Navbar />
      
      <main className="flex-1 flex overflow-hidden p-4 lg:p-8 justify-center items-center">
        <div className="w-full max-w-7xl h-full flex bg-white/95 backdrop-blur-md rounded-[40px] shadow-2xl overflow-hidden border border-white/20">
          
          {/* Left Sidebar - Exact Screenshot Replication */}
          <div className="w-72 bg-[#F3F4F9] border-r border-slate-200/50 p-8 flex flex-col gap-10 hidden lg:flex">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[#2D2E5F] font-bold px-2">
                <ImageIcon className="w-6 h-6 text-indigo-500" />
                <span className="text-lg">Image Tools</span>
              </div>
              <div className="space-y-2">
                {TOOLS.map((tool) => (
                  <button
                    key={tool.id}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                      tool.active 
                        ? 'bg-[#8B5CF6] text-white shadow-xl shadow-purple-200' 
                        : 'text-[#64748B] hover:bg-white/50 hover:text-[#2D2E5F]'
                    }`}
                  >
                    {tool.icon}
                    {tool.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full flex items-center gap-4 px-4 py-3 text-[#64748B] font-semibold hover:text-[#2D2E5F]">
                <div className="p-2 bg-slate-200 rounded-lg"><FileText className="w-5 h-5" /></div>
                PDF Tools
              </button>
              <button className="w-full flex items-center gap-4 px-4 py-3 text-[#64748B] font-semibold hover:text-[#2D2E5F]">
                <div className="p-2 bg-slate-200 rounded-lg"><Video className="w-5 h-5" /></div>
                Video Tools
              </button>
            </div>

            <div className="mt-auto">
              <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden group cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold">PRO</span>
                  <span className="text-sm font-bold">Unlock All Features ?</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Content area */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white">
            <div className="p-8 lg:p-14 space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-[#2D2E5F] tracking-tight">Remove Background</h1>
              <p className="text-[#64748B] text-lg">Instantly erase image backgrounds with just one click.</p>
            </div>

            <div className="flex-1 px-8 lg:px-14 pb-14 grid lg:grid-cols-2 gap-12 items-start overflow-y-auto">
              {/* Upload Card */}
              <div className="bg-[#F8FAFF] rounded-[40px] p-10 border border-slate-100 flex flex-col gap-8 shadow-sm">
                <div className="border-2 border-dashed border-slate-200 rounded-[32px] aspect-[4/3] flex flex-col items-center justify-center gap-6 bg-white hover:border-[#8B5CF6] transition-all cursor-pointer group">
                  <div className="w-20 h-20 bg-[#F1F5F9] rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    <ImageIcon className="w-10 h-10 text-indigo-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-[#2D2E5F] font-bold text-xl">Drop an image here or</p>
                    <Button className="mt-5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-10 rounded-2xl h-14 text-lg font-bold shadow-xl shadow-purple-200 border-0">
                      Upload Image
                    </Button>
                  </div>
                </div>

                <div className="flex bg-[#EEF2FF] p-1.5 rounded-2xl">
                  <button className="flex-1 py-3 px-4 bg-[#8B5CF6] text-white rounded-xl text-sm font-bold shadow-md">Background Remover</button>
                  <button className="flex-1 py-3 px-4 text-[#64748B] text-sm font-bold hover:text-indigo-600">Image Compressor</button>
                  <button className="flex-1 py-3 px-4 text-[#64748B] text-sm font-bold hover:text-indigo-600">Image Resize</button>
                </div>
              </div>

              {/* Preview & Features */}
              <div className="flex flex-col gap-10">
                <div className="aspect-[4/3] rounded-[40px] overflow-hidden relative shadow-2xl border-4 border-white">
                  <div className="absolute inset-0 z-0" style={{ 
                    backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0), linear-gradient(45deg, #f0f0f0 25%, white 25%, white 75%, #f0f0f0 75%, #f0f0f0)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 10px 10px'
                  }} />
                  <img src={portraitImage} alt="Preview" className="w-full h-full object-cover relative z-10" />
                  <div className="absolute bottom-6 right-6 z-20">
                     <div className="w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center text-yellow-400 animate-pulse">
                        <Sparkles className="w-8 h-8 fill-current" />
                     </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  {[
                    { icon: <Sparkles className="w-6 h-6 text-amber-400" />, text: "Remove background fast" },
                    { icon: <ShieldCheck className="w-6 h-6 text-[#8B5CF6]" />, text: "100% automatic & free to use" },
                    { icon: <Sliders className="w-6 h-6 text-rose-400" />, text: "Keep high image quality" },
                    { icon: <Sparkles className="w-6 h-6 text-[#2D2E5F]" />, text: "AI-powered processing" },
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-4 text-[#2D2E5F] font-bold text-lg">
                      <div className="p-2 bg-[#F1F5F9] rounded-xl">{feature.icon}</div>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Footer Navigation - for messy UI fix */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 flex justify-around items-center z-50">
        <Link href="/"><Button variant="ghost" size="icon"><ImageIcon className="w-6 h-6 text-slate-400" /></Button></Link>
        <Button className="bg-[#8B5CF6] rounded-full w-12 h-12 p-0 shadow-lg shadow-purple-200"><Upload className="w-6 h-6" /></Button>
        <Link href="/pricing"><Button variant="ghost" size="icon"><Sparkles className="w-6 h-6 text-slate-400" /></Button></Link>
      </div>
    </div>
  );
}
