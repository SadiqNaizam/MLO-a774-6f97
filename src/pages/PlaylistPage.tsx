import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import MusicPlayerBar from '@/components/layout/MusicPlayerBar';
import TrackRowItem from '@/components/music/TrackRowItem';
import Heading from '@/components/typography/Heading';
import Text from '@/components/typography/Text';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Play, MoreVertical } from 'lucide-react';
import { CurrentTrack } from '@/components/layout/MusicPlayerBar';

// Placeholder data for a specific playlist
const samplePlaylist = {
  id: 'chill-vibes',
  name: 'Chill Vibes Mix',
  description: 'A curated list of relaxing tunes to help you unwind and focus.',
  coverImageUrl: 'https://placehold.co/400x400/7FDBFF/FFFFFF?text=Chill+Playlist',
  creator: { name: 'MusicApp Admin', avatarUrl: 'https://placehold.co/50x50/000/FFF?text=MA' },
  tracks: [
    { id: 'plt1', title: 'Morning Dew', artist: 'Lofi Luke', duration: '2:55', albumArtUrl: 'https://placehold.co/100x100/C2EFEB/333?text=MD', album: 'Sunrise Beats' },
    { id: 'plt2', title: 'Quiet Streets', artist: 'Urban Calm', duration: '3:10', albumArtUrl: 'https://placehold.co/100x100/A9A9A9/FFF?text=QS', album: 'City Murmurs' },
    { id: 'plt3', title: 'Starry Night', artist: 'Cosmic Dreamer', duration: '4:02', albumArtUrl: 'https://placehold.co/100x100/2C3E50/FFF?text=SN', album: 'Galaxy Grooves' },
    { id: 'plt4', title: 'Forest Bath', artist: 'Nature Nurturer', duration: '3:30', albumArtUrl: 'https://placehold.co/100x100/2ECC40/FFF?text=FB', album: 'Wilderness Whispers' },
  ],
  totalDuration: 'Approx. 14 min',
};

const PlaylistPage: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>(); // In a real app, fetch playlist data based on this ID
  console.log(`PlaylistPage loaded for ID: ${playlistId}. Displaying sample: ${samplePlaylist.name}`);
  const playlist = samplePlaylist; // Using sample data

  const [currentPlayingTrack, setCurrentPlayingTrack] = useState<CurrentTrack | undefined>(undefined);
  const [likedTracks, setLikedTracks] = useState<Set<string | number>>(new Set());

  const handlePlayTrack = (trackId: string | number) => {
    console.log(`PlaylistPage: Play track ${trackId}`);
    const trackToPlay = playlist.tracks.find(t => t.id === trackId);
    if (trackToPlay) {
        setCurrentPlayingTrack({
            id: trackToPlay.id,
            title: trackToPlay.title,
            artist: trackToPlay.artist,
            albumArtUrl: trackToPlay.albumArtUrl || 'https://placehold.co/100x100',
            durationSeconds: parseInt(trackToPlay.duration?.split(':')[0] || '3') * 60 + parseInt(trackToPlay.duration?.split(':')[1] || '0'),
        });
    }
  };
  
  const handlePlayAll = () => {
    console.log(`PlaylistPage: Play all tracks from ${playlist.name}`);
    if (playlist.tracks.length > 0) {
        handlePlayTrack(playlist.tracks[0].id);
    }
  };

  const toggleLikeTrack = (trackId: string | number) => {
    setLikedTracks(prev => {
        const newSet = new Set(prev);
        if (newSet.has(trackId)) {
            newSet.delete(trackId);
            console.log(`Track ${trackId} unliked`);
        } else {
            newSet.add(trackId);
            console.log(`Track ${trackId} liked`);
        }
        return newSet;
    });
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar className="hidden md:flex" />
      <main className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-grow">
          <div className="p-6 md:p-8">
            {/* Playlist Header */}
            <header className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
              <img 
                src={playlist.coverImageUrl} 
                alt={`${playlist.name} cover`} 
                className="w-48 h-48 md:w-56 md:h-56 rounded-lg shadow-lg object-cover"
              />
              <div className="flex-1 text-center md:text-left">
                <Text size="sm" variant="subtle" className="uppercase tracking-wider">Playlist</Text>
                <Heading as="h1" variant="pageTitle" className="text-4xl md:text-5xl lg:text-6xl my-2 !border-b-0 !pb-0 !mb-1">
                  {playlist.name}
                </Heading>
                <Text variant="muted" className="mb-2">{playlist.description}</Text>
                <div className="flex items-center justify-center md:justify-start space-x-2 text-sm text-muted-foreground">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={playlist.creator.avatarUrl} alt={playlist.creator.name} />
                    <AvatarFallback>{playlist.creator.name.substring(0,1)}</AvatarFallback>
                  </Avatar>
                  <span>{playlist.creator.name}</span>
                  <span>•</span>
                  <span>{playlist.tracks.length} songs</span>
                  <span>•</span>
                  <span>{playlist.totalDuration}</span>
                </div>
                <Button size="lg" className="mt-6 bg-green-500 hover:bg-green-600 text-white" onClick={handlePlayAll}>
                  <Play className="mr-2 h-5 w-5 fill-current" /> Play All
                </Button>
              </div>
            </header>

            {/* Track List */}
            <div className="space-y-1">
              {playlist.tracks.map((track, index) => (
                <TrackRowItem
                  key={track.id}
                  {...track}
                  isPlaying={currentPlayingTrack?.id === track.id}
                  isLiked={likedTracks.has(track.id)}
                  onPlayPause={() => handlePlayTrack(track.id)}
                  onLikeToggle={() => toggleLikeTrack(track.id)}
                  onAddToQueue={() => console.log('Add to queue:', track.id)}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
        <MusicPlayerBar 
            initialTrack={currentPlayingTrack}
            className="border-t" 
        />
      </main>
    </div>
  );
};

export default PlaylistPage;