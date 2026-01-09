import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="absolute top-0 w-full z-50 border-b border-white/10 bg-[#2C1A5C]/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-white text-xl">
            P
          </div>
          <span className="text-xl font-bold text-white">Project 099</span>
        </div>

        {/* Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <Link href="/tools">
                  <span className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10 hover:text-white cursor-pointer`}>
                    Tools
                  </span>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/pricing">
                  <span className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10 hover:text-white cursor-pointer`}>
                    Pricing
                  </span>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/community">
                  <span className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10 hover:text-white cursor-pointer`}>
                    Community
                  </span>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
               <span className="text-white/80 text-sm hidden sm:inline">Hi, {user.firstName || 'User'}</span>
               <Button onClick={() => logout()} variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                 Logout
               </Button>
            </div>
          ) : (
            <>
              <a href="/api/login">
                <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                  Login
                </Button>
              </a>
              <a href="/api/login">
                <Button className="bg-white text-[#2C1A5C] hover:bg-white/90">
                  Get Started
                </Button>
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
