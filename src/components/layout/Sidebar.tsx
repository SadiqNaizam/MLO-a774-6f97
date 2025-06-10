import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Home, Search, Library, PlusSquare, Heart, Radio } from 'lucide-react'; // Example icons
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Example navigation items
const mainNavItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/library', label: 'Your Library', icon: Library },
];

const playlistsNavItems = [
  { href: '/playlist/create', label: 'Create Playlist', icon: PlusSquare, action: true },
  { href: '/collection/tracks', label: 'Liked Songs', icon: Heart },
];

// Define props if sidebar content is dynamic
interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  console.log("Rendering Sidebar");
  const location = useLocation();

  const renderNavLink = (item: { href: string; label: string; icon: React.ElementType; action?: boolean }, index: number) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.href;
    return (
      <Link key={index} to={item.href}>
        <Button
          variant={isActive ? 'secondary' : 'ghost'}
          className={cn(
            "w-full justify-start text-sm font-medium",
            isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
          )}
        >
          <Icon className="mr-2 h-4 w-4" />
          {item.label}
        </Button>
      </Link>
    );
  };

  return (
    <aside className={cn("h-screen w-64 flex-col border-r bg-background p-4 space-y-4 hidden md:flex", className)}>
      <div className="px-3 py-2">
        <Link to="/" className="flex items-center space-x-2 mb-6">
          <Radio className="h-8 w-8 text-primary" /> {/* Placeholder Logo */}
          <h2 className="text-xl font-semibold tracking-tight">MusicApp</h2>
        </Link>
        <div className="space-y-1">
          {mainNavItems.map(renderNavLink)}
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Playlists
        </h2>
        <div className="space-y-1">
          {playlistsNavItems.map(renderNavLink)}
          {/* Dynamically list user playlists here */}
        </div>
      </div>
      {/* Add more sections like 'Albums', 'Artists' if needed */}
    </aside>
  );
}
export default Sidebar;