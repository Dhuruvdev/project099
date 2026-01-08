import { ToolCard } from "@/components/ToolCard";
import { Sidebar } from "@/components/Sidebar";
import { useTools } from "@/hooks/use-tools";
import { Image, FileText, Video, BrainCircuit, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const CATEGORY_ICONS: Record<string, any> = {
  image: <Image className="w-6 h-6" />,
  pdf: <FileText className="w-6 h-6" />,
  video: <Video className="w-6 h-6" />,
  ai: <BrainCircuit className="w-6 h-6" />,
};

export default function Dashboard() {
  const { data: tools, isLoading } = useTools();

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header */}
          <section className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 lg:p-12 shadow-2xl shadow-primary/25">
            <div className="relative z-10 max-w-2xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl lg:text-5xl font-display font-bold mb-4"
              >
                Supercharge your workflow
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-primary-foreground/80 mb-8"
              >
                Access powerful digital tools for images, PDFs, video, and more. All in one place.
              </motion.p>
            </div>
            
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </section>

          {/* Popular Tools */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold">Popular Tools</h2>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools?.slice(0, 6).map((tool, idx) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <ToolCard
                      title={tool.name}
                      description={tool.description}
                      slug={tool.slug}
                      icon={CATEGORY_ICONS[tool.category] || <BrainCircuit className="w-6 h-6" />}
                      isPopular={idx < 2}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* Categories Preview */}
          <section>
             <h2 className="text-2xl font-display font-bold mb-6">Explore Categories</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Image', 'PDF', 'Video', 'AI'].map((cat, idx) => (
                  <div key={cat} className="group p-6 bg-card border border-border rounded-xl hover:border-primary transition-colors cursor-pointer text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-muted group-hover:bg-primary/10 rounded-full flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                      {CATEGORY_ICONS[cat.toLowerCase()] || <BrainCircuit />}
                    </div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{cat} Tools</h3>
                  </div>
                ))}
             </div>
          </section>

        </div>
      </main>
    </div>
  );
}
