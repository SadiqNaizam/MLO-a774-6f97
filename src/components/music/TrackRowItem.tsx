import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Play, Pause, MoreHorizontal, Heart, Download } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


interface TrackRowItemProps {
  id: string | number;
  title: string;
  artist: string;
  album?: string;
  duration: string; // e.g., "3:45"
  albumArtUrl?: string;
  isPlaying?: boolean;
  isLiked?: boolean;
  onPlayPause: (id: string | number) => void;
  onLikeToggle?: (id: string | number) => void;
  onAddToQueue?: (id: string | number) => void;
  // Add more actions as needed
}

const TrackRowItem: React.FC<TrackRowItemProps> = ({
  id,
  title,
  artist,
  album,
  duration,
  albumArtUrl,
  isPlaying = false,
  isLiked = false,
  onPlayPause,
  onLikeToggle,
  onAddToQueue,
}) => {
  console.log("Rendering TrackRowItem:", title, "- Playing:", isPlaying);

  return (
    <div
      className={cn(
        "flex items-center p-2 hover:bg-muted/50 rounded-md group cursor-pointer transition-colors",
        isPlaying ? "bg-primary/10 text-primary" : ""
      )}
      onClick={() => !isPlaying && onPlayPause(id)} // Play if not already playing on row click
    >
      <Button
        variant="ghost"
        size="icon"
        className="mr-3 h-8 w-8"
        onClick={(e) => {
          e.stopPropagation(); // Prevent row click event
          onPlayPause(id);
        }}
        aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>

      {albumArtUrl && (
        <Avatar className="h-10 w-10 mr-3 rounded">
          <AvatarImage src={albumArtUrl} alt={`${album || title} cover art`} />
          <AvatarFallback>{artist.substring(0, 1)}</AvatarFallback>
        </Avatar>
      )}

      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-medium truncate", isPlaying ? "text-primary" : "text-foreground")}>{title}</p>
        <p className="text-xs text-muted-foreground truncate">{artist}</p>
      </div>

      {album && <p className="hidden md:block text-xs text-muted-foreground mx-4 truncate w-1/4">{album}</p>}

      <div className="flex items-center space-x-2 ml-auto">
        {onLikeToggle && (
           <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", isLiked ? "text-red-500" : "text-muted-foreground opacity-0 group-hover:opacity-100 focus:opacity-100")}
            onClick={(e) => {e.stopPropagation(); onLikeToggle(id);}}
            aria-label={isLiked ? `Unlike ${title}` : `Like ${title}`}
          >
            <Heart className={cn("h-4 w-4", isLiked ? "fill-current" : "")} />
          </Button>
        )}
        <span className="text-xs text-muted-foreground w-10 text-right">{duration}</span>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 focus:opacity-100"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="More options"
                >
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {onAddToQueue && <DropdownMenuItem onClick={() => onAddToQueue(id)}>Add to queue</DropdownMenuItem>}
                <DropdownMenuItem>Add to playlist</DropdownMenuItem>
                {/* Example: More options */}
                <DropdownMenuItem className="text-destructive">Remove from playlist</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
export default TrackRowItem;