import React, { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Maximize2, // For fullscreen or expand view
  ListMusic, // For queue
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CurrentTrack {
  id: string | number;
  title: string;
  artist: string;
  albumArtUrl?: string;
  durationSeconds: number; // Total duration in seconds
}

interface MusicPlayerBarProps {
  initialTrack?: CurrentTrack;
  className?: string;
}

const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({ initialTrack, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(initialTrack || null);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [volume, setVolume] = useState(50); // 0 to 100
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState<'off' | 'one' | 'all'>('off');

  // Dummy audio ref for simulation
  const audioRef = useRef<HTMLAudioElement>(null); // In a real app, this would control the actual audio element

  console.log("Rendering MusicPlayerBar. Current track:", currentTrack?.title, "Playing:", isPlaying);

  const handlePlayPause = () => {
    if (!currentTrack) return;
    setIsPlaying(!isPlaying);
    console.log(isPlaying ? "Pausing" : "Playing", currentTrack.title);
    // Add actual audio play/pause logic here
  };

  const handleSkipNext = () => {
    if (!currentTrack) return;
    console.log("Skipping to next track");
    // Add logic to load and play next track
  };

  const handleSkipPrevious = () => {
     if (!currentTrack) return;
    console.log("Skipping to previous track");
    // Add logic to load and play previous track
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(value[0] === 0);
    console.log("Volume changed to:", value[0]);
    // Add actual audio volume change logic
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? 50 : 0); // Restore volume or mute
    console.log(isMuted ? "Unmuting" : "Muting");
    // Add actual audio mute/unmute logic
  };

  const handleProgressChange = (value: number[]) => {
    setProgress(value[0]);
    console.log("Seeked to:", value[0] + "%");
    // Add actual audio seek logic
  };
  
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const currentTime = currentTrack ? (progress / 100) * currentTrack.durationSeconds : 0;
  const totalTime = currentTrack ? currentTrack.durationSeconds : 0;


  if (!currentTrack) {
    return (
      <footer className={cn("fixed bottom-0 left-0 right-0 h-20 bg-background border-t p-4 flex items-center justify-center text-muted-foreground", className)}>
        No track selected.
      </footer>
    );
  }

  return (
    <footer className={cn("fixed bottom-0 left-0 right-0 h-[90px] bg-background border-t p-3 grid grid-cols-3 items-center", className)}>
      {/* Left: Track Info */}
      <div className="flex items-center space-x-3 min-w-0">
        <Avatar className="h-12 w-12 rounded">
          <AvatarImage src={currentTrack.albumArtUrl || '/placeholder.svg'} alt={currentTrack.title} />
          <AvatarFallback>{currentTrack.artist.substring(0,1)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">{currentTrack.title}</p>
          <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
        </div>
      </div>

      {/* Center: Player Controls & Progress */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center space-x-2 mb-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsShuffle(!isShuffle)} aria-label="Shuffle">
            <Shuffle className={cn("h-4 w-4", isShuffle ? "text-primary" : "text-muted-foreground")} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleSkipPrevious} aria-label="Previous track">
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button variant="default" size="icon" className="h-10 w-10 rounded-full" onClick={handlePlayPause} aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleSkipNext} aria-label="Next track">
            <SkipForward className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsRepeat(isRepeat === 'off' ? 'all' : isRepeat === 'all' ? 'one' : 'off')} aria-label="Repeat">
            <Repeat className={cn("h-4 w-4", isRepeat !== 'off' ? "text-primary" : "text-muted-foreground")} />
            {isRepeat === 'one' && <span className="absolute text-xs -bottom-1 -right-1">1</span>}
          </Button>
        </div>
        <div className="flex items-center w-full max-w-md space-x-2">
            <span className="text-xs text-muted-foreground w-10 text-right">{formatTime(currentTime)}</span>
            <Slider
                value={[progress]}
                max={100}
                step={1}
                onValueChange={handleProgressChange}
                className="w-full"
                aria-label="Track progress"
            />
            <span className="text-xs text-muted-foreground w-10">{formatTime(totalTime)}</span>
        </div>
      </div>

      {/* Right: Volume & Other Controls */}
      <div className="flex items-center justify-end space-x-2">
        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Queue">
            <ListMusic className="h-4 w-4 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
          {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
        <Slider
          value={[isMuted ? 0 : volume]}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
          className="w-24"
          aria-label="Volume control"
        />
         <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Fullscreen player">
            <Maximize2 className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    </footer>
  );
}
export default MusicPlayerBar;