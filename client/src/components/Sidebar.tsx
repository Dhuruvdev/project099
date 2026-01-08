import { Link, useLocation } from "wouter";
import { 
  LayoutGrid, 
  Image as ImageIcon, 
  FileText, 
  Video, 
  BrainCircuit, 
  Code2, 
  ShieldCheck, 
  Settings,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useCredits } from "@/hooks/use-tools";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutGrid, href: "/" },
  { label: "Image Tools", icon: ImageIcon, href: "/category/image" },
  { label: "PDF Tools", icon: FileText, href: "/category/pdf" },
  { label: "Video Tools", icon: Video, href: "/category/video" },
  { label: "AI Tools", icon: BrainCircuit, href: "/category/ai" },
  { label: "Dev Tools", icon: Code2, href: "/category/dev" },
  { label: "Security", icon: ShieldCheck, href: "/category/security" },
];

export function Sidebar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { data: credits } = useCredits();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-lg shadow-md border border-border"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed lg:sticky top-0 left-0 h-screen w-64 bg-card border-r border-border z-40 transition-transform duration-300 ease-in-out flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo Area */}
        <div className="p-6 border-b border-border/50">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/25 group-hover:scale-105 transition-transform">
                <span className="font-bold text-lg">0</span>
              </div>
              <span className="text-xl font-display font-bold tracking-tight">Project 099</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.href || (item.href !== '/' && location.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer group",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}>
                  <item.icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )} />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </div>

        {/* User / Footer */}
        <div className="p-4 border-t border-border/50 bg-muted/20">
          {user ? (
            <div className="space-y-4">
              <div className="bg-card rounded-xl p-3 border border-border shadow-sm">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>Available Credits</span>
                  <span className="font-mono font-bold text-primary">{credits?.amount ?? 0}</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${Math.min(100, (credits?.amount ?? 0) / 10)}%` }}
                  />
                </div>
                <Link href="/pricing">
                  <div className="mt-2 text-xs text-center text-primary font-medium hover:underline cursor-pointer">
                    Buy more credits
                  </div>
                </Link>
              </div>
              
              <div className="flex items-center gap-3 px-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {user.firstName?.[0] || user.email?.[0] || 'U'}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium truncate">{user.firstName || 'User'}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <Link href="/settings">
                  <Settings className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer" />
                </Link>
              </div>
            </div>
          ) : (
            <Link href="/login">
              <div className="w-full py-2.5 px-4 bg-primary text-primary-foreground rounded-lg font-medium text-sm text-center shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all cursor-pointer">
                Sign In
              </div>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
