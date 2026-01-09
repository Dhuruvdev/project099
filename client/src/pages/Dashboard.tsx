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
        <section className="relative overflow-hidden bg-[#2C1A5C] text-white pt-32 pb-24 px-8 lg:px-12">
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
                <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-8 rounded-xl h-12 text-base font-medium border-0 hover-elevate">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 rounded-xl h-12 text-base font-medium">
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
                {/* Main Laptop/Screen Mockup */}
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-2 shadow-2xl">
                   <div className="bg-[#1a1b26] rounded-xl aspect-[16/10] overflow-hidden relative shadow-inner">
                      {/* Screen Content Mockup */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-blue-900/40" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-lg border border-white/20 shadow-xl">
                           <Video className="w-10 h-10 text-white" />
                        </div>
                      </div>
                   </div>
                   {/* Floating Elements */}
                   <div className="absolute -top-12 -left-12 p-4 bg-white rounded-2xl shadow-xl animate-bounce duration-[3000ms]">
                      <FileText className="w-8 h-8 text-orange-500" />
                   </div>
                   <div className="absolute -top-8 right-12 p-3 bg-white rounded-2xl shadow-xl animate-bounce duration-[4000ms] delay-700">
                      <Image className="w-6 h-6 text-emerald-500" />
                   </div>
                   <div className="absolute top-1/2 -right-16 p-4 bg-white rounded-2xl shadow-xl animate-bounce duration-[5000ms] delay-500">
                      <BrainCircuit className="w-8 h-8 text-blue-500" />
                   </div>
                   <div className="absolute -bottom-8 -left-8 p-3 bg-white rounded-2xl shadow-xl animate-bounce duration-[3500ms] delay-200">
                      <ShieldAlert className="w-6 h-6 text-teal-500" />
                   </div>
                </div>
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
                className="bg-card hover:bg-card/80 border border-border/50 rounded-2xl p-6 shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${cat.bg} ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                    {cat.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{cat.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{cat.desc}</p>
                <Button className="w-full justify-between bg-primary/5 hover:bg-primary text-primary hover:text-white border-0 group-hover:shadow-md transition-all duration-300">
                  Try Now <ArrowRight className="w-4 h-4" />
                </Button>
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
                    className="group bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-primary/10 relative p-6 flex flex-col items-center justify-center text-center group-hover:from-primary/10 group-hover:to-primary/20 transition-colors">
                      <div className="p-4 bg-white dark:bg-card rounded-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                        {CATEGORY_ICONS[tool.category]}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                         <span className="text-white font-medium text-sm">Launch Tool</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{tool.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{tool.description}</p>
                      <Link href={`/tools/${tool.slug}`}>
                        <Button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl shadow-lg shadow-blue-500/20">
                          {tool.category === 'video' || tool.category === 'pdf' ? 'Convert' : 'Create Now'}
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
