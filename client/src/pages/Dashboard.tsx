import heroIllustration from "@assets/file_00000000cb5472069fec77caec25b299_1767956419094.png";
import { Navbar } from "@/components/Navbar";
import { useTools } from "@/hooks/use-tools";
import { Image, FileText, Video, BrainCircuit, ShieldAlert, Braces, Sparkles, ArrowRight, Eraser, Music, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const CATEGORY_ICONS: Record<string, any> = {
  image: <Image className="w-8 h-8" />,
  pdf: <FileText className="w-8 h-8" />,
  video: <Video className="w-8 h-8" />,
  ai: <Sparkles className="w-8 h-8" />,
  security: <ShieldAlert className="w-8 h-8" />,
  dev: <Braces className="w-8 h-8" />,
};

const CATEGORIES = [
  { id: 'image', name: 'Image Tools', desc: 'Background Remover · Image Resize', icon: CATEGORY_ICONS.image, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 'pdf', name: 'PDF Tools', desc: 'Merge PDF · Convert Files', icon: CATEGORY_ICONS.pdf, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { id: 'video', name: 'Video Tools', desc: 'Video Convertor · Compress Video', icon: CATEGORY_ICONS.video, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { id: 'ai', name: 'AI Tools', desc: 'AI Writer · Image Generator', icon: CATEGORY_ICONS.ai, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 'dev', name: 'Development', desc: 'Code Formatter · API Tester', icon: CATEGORY_ICONS.dev, color: 'text-sky-500', bg: 'bg-sky-500/10' },
  { id: 'security', name: 'Security Tools', desc: 'Password Checker · Breach Scan', icon: CATEGORY_ICONS.security, color: 'text-teal-500', bg: 'bg-teal-500/10' },
];

export default function Dashboard() {
  const { data: tools, isLoading } = useTools();

  return (
    <div className="flex min-h-screen bg-background text-foreground flex-col">
      <Navbar />
      
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden premium-gradient text-white pt-32 pb-24 px-8 lg:px-12">
          <div className="absolute inset-0 hero-wash pointer-events-none" />
          {/* Decorative background gradients */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8">
              <div className="space-y-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl lg:text-7xl font-display font-bold leading-tight"
                >
                  All Your Tools.<br/>
                  <span className="text-white/90">One Platform.</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-lg text-white/70 max-w-md"
                >
                  Powerful online tools for everything you need in one place.
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-8 rounded-xl h-12 text-base font-medium border-0 shadow-lg shadow-purple-500/20">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 text-white bg-white/5 backdrop-blur-sm hover:bg-white/10 px-8 rounded-xl h-12 text-base font-medium">
                  Explore Tools
                </Button>
              </motion.div>
            </div>

            {/* Hero Illustration */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10">
                <img 
                  src={heroIllustration} 
                  alt="Project 099 Illustration" 
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-16 relative z-20 pb-20 space-y-12">
          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (idx * 0.1) }}
                className="bg-white border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group relative flex flex-col sm:block"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${cat.bg} ${cat.color}`}>
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold">{cat.name}</h3>
                </div>
                <p className="text-slate-600 text-sm mb-12">{cat.desc}</p>
                <div className="mt-auto sm:absolute sm:bottom-6 sm:right-6 flex items-center gap-3 justify-end">
                  <div className="h-px w-24 bg-slate-100 hidden sm:block" />
                  <Link href={`/category/${cat.id}`}>
                    <Button variant="ghost" className="text-[#8B5CF6] hover:text-[#7C3AED] hover:bg-transparent px-4 rounded-lg h-9 text-sm font-medium border-0 w-full sm:w-auto">
                      View All
                    </Button>
                  </Link>
                  <Link href={cat.id === 'image' ? "/image-tools" : `/tools/${cat.id === 'pdf' ? 'pdf-merge' : cat.id === 'ai' ? 'text-to-image' : tools?.find(t => t.category === cat.id)?.slug || '#'}`}>
                    <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-8 sm:px-6 rounded-lg h-10 sm:h-9 text-base sm:text-sm font-medium border-0 shadow-lg shadow-purple-500/20 w-full sm:w-auto">
                      Try Now
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Popular Tools Section */}
          <section>
            <div className="flex items-center justify-between mb-8 relative">
              <div className="absolute left-1/2 -translate-x-1/2 w-full h-px bg-border/50" />
              <h2 className="relative bg-background px-4 mx-auto text-xl font-display font-semibold text-muted-foreground">Popular Tools</h2>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tools?.filter(t => t.isPopular).slice(0, 4).map((tool, idx) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + (idx * 0.1) }}
                    className="bg-white border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                  >
                    {/* Tool Header Color/Icon based on category */}
                    <div className={`p-4 pb-0 flex flex-col items-center justify-center ${
                      tool.slug === 'remove-bg' ? 'bg-[#EEF2FF]' :
                      tool.slug === 'pdf-merge' ? 'bg-[#FFF1F2]' :
                      tool.slug === 'text-to-image' ? 'bg-[#F0FDF4]' :
                      'bg-[#F8FAFC]'
                    }`}>
                      <div className="flex flex-col items-center justify-center pt-4 pb-2">
                         <h3 className="font-bold text-lg text-slate-900 mb-1">{tool.name}</h3>
                         <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-4 font-semibold">
                           {tool.slug === 'remove-bg' ? 'Instantly erase image backgrounds' : 
                            tool.slug === 'pdf-merge' ? 'Combine your PDF files with ease' : 
                            tool.slug === 'text-to-image' ? 'Generate stunning images from text' : 
                            'Convert video audio in seconds'}
                         </p>
                      </div>
                      
                      <div className="w-full aspect-[4/3] bg-white rounded-t-xl border-x border-t border-slate-100 flex items-center justify-center relative overflow-hidden">
                         {tool.slug === 'remove-bg' ? (
                            <div className="flex flex-col items-center">
                               <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" alt="Preview" className="w-16 h-16 rounded-full object-cover shadow-md mb-2" />
                               <div className="w-24 h-6 bg-[#F1F5F9] border border-slate-200 rounded-lg flex items-center justify-center text-[8px] text-slate-400">Upload Image</div>
                            </div>
                         ) : tool.slug === 'pdf-merge' ? (
                            <div className="flex gap-2">
                               <div className="w-10 h-14 bg-[#FEE2E2] rounded flex items-center justify-center border border-red-200 shadow-sm relative overflow-hidden">
                                  <FileText className="w-6 h-6 text-red-500" />
                               </div>
                               <div className="w-10 h-14 bg-[#D1FAE5] rounded flex items-center justify-center border border-emerald-200 shadow-sm relative overflow-hidden">
                                  <FileText className="w-6 h-6 text-emerald-500" />
                               </div>
                            </div>
                         ) : tool.slug === 'text-to-image' ? (
                            <div className="w-full h-full p-4">
                               <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-inner">
                                  <div className="text-white flex flex-col items-center">
                                     <Sparkles className="w-8 h-8 mb-1" />
                                  </div>
                               </div>
                            </div>
                         ) : (
                            <div className="flex gap-4">
                               <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-700 shadow-xl">
                                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                               </div>
                               <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-700 shadow-xl">
                                  <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
                               </div>
                            </div>
                         )}
                      </div>
                    </div>

                    <div className="p-4 bg-white">
                      <Link href={`/tools/${tool.slug}`}>
                        <Button className={`w-full text-white rounded-lg h-10 text-sm font-medium shadow-md transition-all ${
                          tool.slug === 'remove-bg' ? 'bg-[#FFFFFF] text-slate-600 border border-slate-200 hover:bg-slate-50' :
                          tool.slug === 'pdf-merge' ? 'bg-[#8B5CF6] hover:bg-[#7C3AED]' :
                          tool.slug === 'text-to-image' ? 'bg-[#10B981] hover:bg-[#059669]' :
                          'bg-[#1E40AF] hover:bg-[#1E3A8A]'
                        }`}>
                          {tool.slug === 'remove-bg' ? 'Upload Image' : tool.slug === 'pdf-merge' ? 'Select Files' : tool.slug === 'text-to-image' ? 'Create Now' : 'Convert'}
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* Features Grid */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-border/50">
            {[
              { icon: <ShieldAlert className="w-8 h-8 text-primary" />, title: "Fast & Secure" },
              { icon: <BrainCircuit className="w-8 h-8 text-primary" />, title: "AI Powered" },
              { icon: <Image className="w-8 h-8 text-primary" />, title: "Cloud Storage" },
              { icon: <Braces className="w-8 h-8 text-primary" />, title: "100+ Tools" },
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-3 group">
                <div className="p-4 bg-primary/5 rounded-2xl group-hover:bg-primary/10 transition-colors">
                  {feature.icon}
                </div>
                <span className="font-semibold">{feature.title}</span>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
