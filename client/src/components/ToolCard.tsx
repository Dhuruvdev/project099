import { Link } from "wouter";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  title: string;
  description: string;
  slug: string;
  icon?: React.ReactNode;
  isPopular?: boolean;
}

export function ToolCard({ title, description, slug, icon, isPopular }: ToolCardProps) {
  return (
    <Link href={`/tools/${slug}`}>
      <div className="group relative bg-card hover:bg-muted/30 border border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:border-primary/20 cursor-pointer h-full flex flex-col">
        {isPopular && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold border border-amber-500/20">
              <Sparkles className="w-3 h-3" /> Popular
            </span>
          </div>
        )}
        
        <div className="mb-4 p-3 w-fit rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
          {icon}
        </div>
        
        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
          {description}
        </p>
        
        <div className="flex items-center text-sm font-semibold text-primary/80 group-hover:text-primary mt-auto">
          Try Tool <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
