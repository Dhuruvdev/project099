import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Eraser, 
  ImageIcon, 
  Sliders, 
  Type, 
  FileImage, 
  ShieldCheck, 
  Sparkles, 
  Upload, 
  FileText, 
  Video,
  ChevronDown
} from "lucide-react";
import portraitImage from "@assets/generated_images/portrait_of_a_woman_with_curly_hair_on_a_transparent_background_with_purple_accents.png";
import { Helmet } from "react-helmet";

const TOOLS = [
  { id: 'bg-remover', name: 'Background Remover', icon: <Eraser className="w-4 h-4" />, active: true },
  { id: 'compressor', name: 'Image Compressor', icon: <FileImage className="w-4 h-4" /> },
  { id: 'resize', name: 'Image Resize & Crop', icon: <Sliders className="w-4 h-4" /> },
  { id: 'convert', name: 'Convert Image', icon: <ImageIcon className="w-4 h-4" /> },
  { id: 'ocr', name: 'Image to Text (OCR)', icon: <Type className="w-4 h-4" /> },
];

export default function ImageTools() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Helmet>
        <title>Remove Background - Project 099</title>
      </Helmet>
      
      {/* Full Width Top Header */}
      <header className="bg-[#1A0B2E] px-8 py-5 flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-white text-2xl shadow-lg">
            P
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">Project 099</span>
        </div>
        
        <nav className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-1 text-white/90 font-medium cursor-pointer hover:text-white transition-colors">
            Image Tools <ChevronDown className="w-4 h-4 opacity-50" />
          </div>
          <div className="flex items-center gap-1 text-white/90 font-medium cursor-pointer hover:text-white transition-colors">
            Pricing <div className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-[10px]">✕</div>
          </div>
          <div className="text-white/90 font-medium cursor-pointer hover:text-white transition-colors">
            Community
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-white hover:bg-white/10 px-6 rounded-xl font-bold">Login</Button>
          <Button className="bg-white text-[#1A0B2E] hover:bg-slate-100 px-8 rounded-xl font-bold shadow-lg">Sign Up</Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden w-full">
          {/* Sidebar - Matching Screenshot EXACTLY */}
          <aside className="w-[280px] bg-[#F5F7FF] border-r border-slate-200/50 p-8 flex flex-col gap-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[#2D2E5F] font-bold px-2">
                <ImageIcon className="w-5 h-5" />
                <span className="text-lg">Image Tools</span>
              </div>
              <div className="space-y-1">
                {TOOLS.map((tool) => (
                  <button
                    key={tool.id}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[14px] font-bold transition-all text-left ${
                      tool.active 
                        ? 'bg-gradient-to-r from-[#A855F7] to-[#8B5CF6] text-white shadow-xl shadow-purple-200' 
                        : 'text-[#64748B] hover:bg-slate-200/50'
                    }`}
                  >
                    {tool.icon}
                    {tool.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full flex items-center gap-4 px-4 py-3 text-[#64748B] font-bold hover:text-[#2D2E5F] transition-colors">
                <div className="p-2 bg-slate-200/50 rounded-lg"><FileText className="w-4 h-4" /></div>
                <span className="text-[14px]">PDF Tools</span>
              </button>
              <button className="w-full flex items-center gap-4 px-4 py-3 text-[#64748B] font-bold hover:text-[#2D2E5F] transition-colors">
                <div className="p-2 bg-slate-200/50 rounded-lg"><ShieldCheck className="w-4 h-4" /></div>
                <span className="text-[14px]">Video Tools</span>
              </button>
            </div>

            <div className="mt-auto">
              <div className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] rounded-2xl p-4 text-white shadow-lg relative overflow-hidden flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform">
                <div className="flex items-center gap-2">
                  <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] font-black uppercase">Pro</span>
                  <span className="text-[13px] font-bold">Unlock All Features ?</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 bg-white p-8 lg:p-14 overflow-y-auto">
            <div className="max-w-[800px] mx-auto space-y-10">
              <div className="space-y-3">
                <h1 className="text-[44px] font-black text-[#2D2E5F] leading-tight tracking-tight">Remove Background</h1>
                <p className="text-[#64748B] text-lg font-medium">Instantly erase image backgrounds with just one click.</p>
              </div>

              {/* Upload Card - Pixel Perfect UI */}
              <div className="bg-white rounded-[40px] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-2">
                <div className="border-2 border-dashed border-slate-200 rounded-[38px] p-12 flex flex-col items-center justify-center gap-8 bg-[#FAFBFF] hover:bg-white transition-colors cursor-pointer group">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ImageIcon className="w-10 h-10 text-blue-400" />
                  </div>
                  <div className="text-center space-y-5">
                    <p className="text-[#2D2E5F] font-bold text-xl">Drop an image here or</p>
                    <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-12 rounded-2xl h-14 text-lg font-extrabold shadow-[0_15px_30px_rgba(139,92,246,0.3)] border-0">
                      Upload Image
                    </Button>
                  </div>
                </div>

                <div className="flex bg-[#F0F2FF] m-6 p-1 rounded-2xl">
                  <button className="flex-1 py-3 px-4 bg-gradient-to-r from-[#A855F7] to-[#8B5CF6] text-white rounded-xl text-sm font-black shadow-md">Background Remover</button>
                  <button className="flex-1 py-3 px-4 text-[#64748B] text-sm font-bold hover:text-indigo-600 transition-colors">Image Compressor</button>
                  <button className="flex-1 py-3 px-4 text-[#64748B] text-sm font-bold hover:text-indigo-600 transition-colors">Image Resize</button>
                </div>
              </div>
            </div>
          </main>

          {/* Feature Sidebar - Exactly as screenshot */}
          <aside className="w-[380px] bg-white border-l border-slate-100 p-10 flex flex-col gap-10 hidden xl:flex">
            <div className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl group border-4 border-white">
              <div className="absolute inset-0 z-0 bg-[#F0F2FF]" style={{ 
                backgroundImage: 'linear-gradient(45deg, #E0E7FF 25%, transparent 25%, transparent 75%, #E0E7FF 75%, #E0E7FF), linear-gradient(45deg, #E0E7FF 25%, white 25%, white 75%, #E0E7FF 75%, #E0E7FF)',
                backgroundSize: '16px 16px',
                backgroundPosition: '0 0, 8px 8px'
              }} />
              <img src={portraitImage} alt="Preview" className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute bottom-6 left-6 z-20">
                 <div className="w-12 h-12 bg-yellow-400 rounded-full shadow-xl flex items-center justify-center text-white transform rotate-12">
                    <Sparkles className="w-6 h-6 fill-current" />
                 </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-purple-500/20 to-transparent pointer-events-none" />
            </div>

            <div className="space-y-6">
              {[
                { icon: <Sparkles className="w-5 h-5 text-amber-400" />, text: "Remove background fast" },
                { icon: <ShieldCheck className="w-5 h-5 text-blue-500" />, text: "100% automatic & free to use" },
                { icon: <Sliders className="w-5 h-5 text-rose-400" />, text: "Keep high image quality" },
                { icon: <Sparkles className="w-5 h-5 text-slate-800" />, text: "Al-powered processing" },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4 text-[#2D2E5F] font-bold text-[17px]">
                  <div className="p-2 bg-[#F5F7FF] rounded-xl">{feature.icon}</div>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Footer Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#1A0B2E] p-4 flex justify-around items-center z-50 shadow-2xl border-t border-white/10">
        <Link href="/"><ImageIcon className="w-6 h-6 text-white/50 hover:text-white transition-colors" /></Link>
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg"><Upload className="w-6 h-6 text-[#1A0B2E]" /></div>
        <Link href="/pricing"><Sparkles className="w-6 h-6 text-white/50 hover:text-white transition-colors" /></Link>
      </div>
    </div>
  );
}
