import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlayCircle } from 'lucide-react'; // Icon for play button
import { Link } from 'react-router-dom'; // For navigation

interface PlaylistCardProps {
  id: string | number;
  title: string;
  description?: string;
  coverImageUrl: string;
  creatorName?: string; // e.g., "By Spotify" or "By User Name"
  itemCount?: number; // e.g., number of songs
  playlistUrl: string; // URL to navigate to playlist page
  onPlay?: (id: string | number) => void; // Optional: function to play playlist directly
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  id,
  title,
  description,
  coverImageUrl,
  creatorName,
  itemCount,
  playlistUrl,
  onPlay
}) => {
  console.log("Rendering PlaylistCard:", title);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if play action is primary
    if (onPlay) {
      console.log("Play clicked on PlaylistCard:", id);
      onPlay(id);
    } else {
      // If no onPlay, navigation is the default action
      console.log("Navigating from PlaylistCard:", id);
    }
  };

  return (
    <Link to={playlistUrl} className="block group">
      <Card className="w-full overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="p-0 relative">
          <AspectRatio ratio={1 / 1} className="bg-muted">
            <img
              src={coverImageUrl || '/placeholder.svg'}
              alt={`Cover for ${title}`}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
          </AspectRatio>
          {onPlay && (
            <button
              onClick={handlePlayClick}
              aria-label={`Play ${title}`}
              className="absolute bottom-2 right-2 bg-green-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
            >
              <PlayCircle className="h-6 w-6" />
            </button>
          )}
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-base font-semibold truncate group-hover:text-primary">{title}</CardTitle>
          {description && (
            <CardDescription className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {description}
            </CardDescription>
          )}
          {creatorName && (
            <p className="text-xs text-muted-foreground mt-1">
              {creatorName}
            </p>
          )}
        </CardContent>
        {itemCount !== undefined && (
          <CardFooter className="p-4 pt-0">
            <p className="text-xs text-muted-foreground">{itemCount} songs</p>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
export default PlaylistCard;