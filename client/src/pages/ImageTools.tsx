import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Eraser, ImageIcon, Sliders, Type, FileImage, ShieldCheck, Sparkles, Upload, Loader2 } from "lucide-react";
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
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Helmet>
        <title>Professional Online Image Tools - Background Remover, Compressor & More | Project 099</title>
        <meta name="description" content="Access professional online image tools. Instantly remove backgrounds with AI, compress images without quality loss, resize, and convert images for free. Fast, secure, and easy to use." />
        <meta property="og:title" content="Professional Online Image Tools | Project 099" />
        <meta property="og:description" content="AI-powered background removal, high-quality image compression, and professional resizing tools in one platform." />
        <meta name="keywords" content="background remover, image compressor, image resizer, online image tools, AI image editor, remove bg online" />
      </Helmet>
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
              
              {/* Left Sidebar - Tool Selection */}
              <div className="w-full lg:w-72 bg-[#F8FAFC] border-r border-slate-100 p-6 flex flex-col gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-900 font-bold px-2">
                    <ImageIcon className="w-5 h-5 text-indigo-600" />
                    <span>Image Tools</span>
                  </div>
                  <div className="space-y-1">
                    {TOOLS.map((tool) => (
                      <button
                        key={tool.id}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          tool.active 
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        {tool.icon}
                        {tool.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100">
                    <FileImage className="w-5 h-5" />
                    PDF Tools
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100">
                    <ShieldCheck className="w-5 h-5" />
                    Video Tools
                  </button>
                </div>

                <div className="mt-auto">
                  <div className="bg-indigo-600 rounded-xl p-4 text-white relative overflow-hidden group cursor-pointer">
                    <div className="absolute top-0 right-0 p-2 opacity-20">
                      <Sparkles className="w-12 h-12" />
                    </div>
                    <p className="text-xs font-bold mb-1 uppercase tracking-wider">Pro</p>
                    <p className="text-sm font-bold">Unlock All Features ?</p>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 p-8 lg:p-12 flex flex-col gap-8">
                <div className="space-y-2">
                  <h1 className="text-4xl font-display font-bold text-slate-900">Remove Background</h1>
                  <p className="text-slate-500">Instantly erase image backgrounds with just one click.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Upload Area */}
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-slate-200 rounded-[24px] p-12 flex flex-col items-center justify-center gap-6 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ImageIcon className="w-8 h-8 text-indigo-400" />
                      </div>
                      <div className="text-center">
                        <p className="text-slate-900 font-bold text-lg">Drop an image here or</p>
                        <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-8 rounded-xl h-12 shadow-lg shadow-indigo-200">
                          Upload Image
                        </Button>
                      </div>
                    </div>

                    <div className="flex bg-slate-100 p-1 rounded-xl">
                      <button className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-sm">Background Remover</button>
                      <button className="flex-1 py-2 px-4 text-slate-500 text-sm font-medium">Image Compressor</button>
                      <button className="flex-1 py-2 px-4 text-slate-500 text-sm font-medium">Image Resize</button>
                    </div>
                  </div>

                  {/* Preview/Feature Area */}
                  <div className="relative">
                    <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 relative">
                       {/* Checkerboard pattern simulation */}
                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 10%, transparent 10%)', backgroundSize: '10px 10px' }} />
                      <img src={portraitImage} alt="Preview" className="w-full h-full object-cover relative z-10" />
                      <div className="absolute bottom-4 right-4 z-20">
                         <div className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-indigo-600">
                            <Sparkles className="w-6 h-6" />
                         </div>
                      </div>
                    </div>

                    <div className="mt-8 space-y-4">
                      {[
                        { icon: <Sparkles className="w-5 h-5 text-amber-500" />, text: "Remove background fast" },
                        { icon: <ShieldCheck className="w-5 h-5 text-indigo-500" />, text: "100% automatic & free to use" },
                        { icon: <Sliders className="w-5 h-5 text-rose-500" />, text: "Keep high image quality" },
                        { icon: <Sparkles className="w-5 h-5 text-slate-900" />, text: "AI-powered processing" },
                      ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                          {feature.icon}
                          <span>{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
