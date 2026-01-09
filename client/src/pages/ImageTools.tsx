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
  ChevronDown,
  Menu,
  X
} from "lucide-react";
import portraitImage from "@assets/generated_images/portrait_of_a_woman_with_curly_hair_on_a_transparent_background_with_purple_accents.png";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const TOOLS = [
  { id: 'bg-remover', name: 'Background Remover', icon: <Eraser className="w-4 h-4" />, active: true },
  { id: 'compressor', name: 'Image Compressor', icon: <FileImage className="w-4 h-4" /> },
  { id: 'resize', name: 'Image Resize & Crop', icon: <Sliders className="w-4 h-4" /> },
  { id: 'convert', name: 'Convert Image', icon: <ImageIcon className="w-4 h-4" /> },
  { id: 'ocr', name: 'Image to Text (OCR)', icon: <Type className="w-4 h-4" /> },
];

export default function ImageTools() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden">
      <Helmet>
        <title>Remove Background - Project 099</title>
      </Helmet>
      
      {/* Full Width Top Header */}
      <header className="bg-[#1A0B2E] px-4 lg:px-8 py-4 lg:py-5 flex items-center justify-between w-full sticky top-0 z-[60]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-white text-xl lg:text-2xl shadow-lg">
            P
          </div>
          <span className="text-xl lg:text-2xl font-bold text-white tracking-tight">Project 099</span>
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

        <div className="flex items-center gap-2 lg:gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="ghost" className="text-white hover:bg-white/10 px-4 lg:px-6 rounded-xl font-bold">Login</Button>
            <Button className="bg-white text-[#1A0B2E] hover:bg-slate-100 px-6 lg:px-8 rounded-xl font-bold shadow-lg">Sign Up</Button>
          </div>
          
          {/* Hamburger Menu for Mobile */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-white/10">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-[#F5F7FF] p-0 border-r-0">
              <div className="flex flex-col h-full">
                <div className="p-6 bg-[#1A0B2E] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-white text-lg">P</div>
                    <span className="text-lg font-bold text-white">Project 099</span>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Image Tools</p>
                    <div className="space-y-1">
                      {TOOLS.map((tool) => (
                        <button
                          key={tool.id}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${
                            tool.active 
                              ? 'bg-gradient-to-r from-[#A855F7] to-[#8B5CF6] text-white shadow-lg' 
                              : 'text-[#64748B] hover:bg-slate-200/50'
                          }`}
                        >
                          {tool.icon}
                          {tool.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 text-slate-400">
                    <p className="text-xs font-bold uppercase tracking-wider px-2">Other Categories</p>
                    <div className="space-y-1">
                      <button className="w-full flex items-center gap-4 px-4 py-3 text-[#64748B] font-bold hover:text-[#2D2E5F] transition-colors text-left">
                        <FileText className="w-4 h-4" /> PDF Tools
                      </button>
                      <button className="w-full flex items-center gap-4 px-4 py-3 text-[#64748B] font-bold hover:text-[#2D2E5F] transition-colors text-left">
                        <ShieldCheck className="w-4 h-4" /> Video Tools
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-200 space-y-4">
                   <Button className="w-full bg-[#1A0B2E] text-white rounded-xl h-12 font-bold">Sign Up</Button>
                   <Button variant="outline" className="w-full border-slate-200 rounded-xl h-12 font-bold text-slate-600">Login</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden w-full relative">
        {/* Desktop Sidebar - Hidden on mobile/tablet */}
        <aside className="w-[280px] bg-[#F5F7FF] border-r border-slate-200/50 p-8 flex flex-col gap-10 hidden lg:flex shrink-0">
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
        <main className="flex-1 bg-white p-4 lg:p-14 overflow-y-auto">
          <div className="max-w-[800px] mx-auto space-y-6 lg:space-y-10">
            <div className="space-y-2 lg:space-y-3">
              <h1 className="text-3xl lg:text-[44px] font-black text-[#2D2E5F] leading-tight tracking-tight">Remove Background</h1>
              <p className="text-[#64748B] text-base lg:text-lg font-medium">Instantly erase image backgrounds with just one click.</p>
            </div>

            {/* Upload Card - Responsive UI */}
            <div className="bg-white rounded-[24px] lg:rounded-[40px] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-2">
              <div className="border-2 border-dashed border-slate-200 rounded-[22px] lg:rounded-[38px] p-6 lg:p-12 flex flex-col items-center justify-center gap-6 lg:gap-8 bg-[#FAFBFF] hover:bg-white transition-colors cursor-pointer group">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-8 h-8 lg:w-10 lg:h-10 text-blue-400" />
                </div>
                <div className="text-center space-y-4 lg:space-y-5 w-full">
                  <p className="text-[#2D2E5F] font-bold text-lg lg:text-xl">Drop an image here or</p>
                  <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white w-full sm:w-auto px-12 rounded-2xl h-12 lg:h-14 text-base lg:text-lg font-extrabold shadow-[0_15px_30px_rgba(139,92,246,0.3)] border-0">
                    Upload Image
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row bg-[#F0F2FF] m-4 lg:m-6 p-1 rounded-2xl gap-1 sm:gap-0">
                <button className="flex-1 py-3 px-4 bg-gradient-to-r from-[#A855F7] to-[#8B5CF6] text-white rounded-xl text-xs lg:text-sm font-black shadow-md">Background Remover</button>
                <button className="flex-1 py-3 px-4 text-[#64748B] text-xs lg:text-sm font-bold hover:text-indigo-600 transition-colors">Image Compressor</button>
                <button className="flex-1 py-3 px-4 text-[#64748B] text-xs lg:text-sm font-bold hover:text-indigo-600 transition-colors">Image Resize</button>
              </div>
            </div>

            {/* AI Preview Section - Shown on mobile below upload, hidden on XL where sidebar exists */}
            <div className="xl:hidden space-y-8 mt-12 pb-10">
              <div className="relative aspect-square sm:aspect-video lg:aspect-square rounded-[32px] lg:rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
                <div className="absolute inset-0 z-0 bg-[#F0F2FF]" style={{ 
                  backgroundImage: 'linear-gradient(45deg, #E0E7FF 25%, transparent 25%, transparent 75%, #E0E7FF 75%, #E0E7FF), linear-gradient(45deg, #E0E7FF 25%, white 25%, white 75%, #E0E7FF 75%, #E0E7FF)',
                  backgroundSize: '16px 16px',
                  backgroundPosition: '0 0, 8px 8px'
                }} />
                <img src={portraitImage} alt="Preview" className="w-full h-full object-cover relative z-10" />
                <div className="absolute bottom-6 left-6 z-20">
                   <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-400 rounded-full shadow-xl flex items-center justify-center text-white transform rotate-12">
                      <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 fill-current" />
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                {[
                  { icon: <Sparkles className="w-5 h-5 text-amber-400" />, text: "Remove background fast" },
                  { icon: <ShieldCheck className="w-5 h-5 text-blue-500" />, text: "100% automatic & free" },
                  { icon: <Sliders className="w-5 h-5 text-rose-400" />, text: "High quality output" },
                  { icon: <Sparkles className="w-5 h-5 text-slate-800" />, text: "AI processing" },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-[#2D2E5F] font-bold text-sm lg:text-[17px] bg-[#F5F7FF] p-4 rounded-2xl">
                    <div className="p-2 bg-white rounded-xl shadow-sm">{feature.icon}</div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Desktop Feature Sidebar - Hidden on mobile/tablet */}
        <aside className="w-[380px] bg-white border-l border-slate-100 p-10 flex flex-col gap-10 hidden xl:flex shrink-0">
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
              { icon: <Sparkles className="w-5 h-5 text-slate-800" />, text: "AI-powered processing" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 text-[#2D2E5F] font-bold text-[17px]">
                <div className="p-2 bg-[#F5F7FF] rounded-xl">{feature.icon}</div>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </aside>
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
