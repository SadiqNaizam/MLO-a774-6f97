import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import MusicPlayerBar from '@/components/layout/MusicPlayerBar';
import TrackRowItem from '@/components/music/TrackRowItem';
import Heading from '@/components/typography/Heading';
import Text from '@/components/typography/Text';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { CurrentTrack } from '@/components/layout/MusicPlayerBar';

// Placeholder data for a specific album
const sampleAlbum = {
  id: 'dark-side',
  name: 'The Dark Side of the Moon',
  artist: 'Pink Floyd',
  releaseYear: 1973,
  coverImageUrl: 'https://placehold.co/400x400/111111/FFFFFF?text=DSOTM+Album',
  tracks: [
    { id: 'dsotm1', title: 'Speak to Me / Breathe', artist: 'Pink Floyd', duration: '3:58', albumArtUrl: 'https://placehold.co/100x100/111111/FFFFFF?text=A1' },
    { id: 'dsotm2', title: 'On the Run', artist: 'Pink Floyd', duration: '3:36', albumArtUrl: 'https://placehold.co/100x100/111111/FFFFFF?text=A2' },
    { id: 'dsotm3', title: 'Time', artist: 'Pink Floyd', duration: '7:01', albumArtUrl: 'https://placehold.co/100x100/111111/FFFFFF?text=A3' },
    { id: 'dsotm4', title: 'Money', artist: 'Pink Floyd', duration: '6:22', albumArtUrl: 'https://placehold.co/100x100/111111/FFFFFF?text=A4' },
  ],
  totalDuration: 'Approx. 43 min',
};

const AlbumPage: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  console.log(`AlbumPage loaded for ID: ${albumId}. Displaying sample: ${sampleAlbum.name}`);
  const album = sampleAlbum;

  const [currentPlayingTrack, setCurrentPlayingTrack] = useState<CurrentTrack | undefined>(undefined);
  const [likedTracks, setLikedTracks] = useState<Set<string | number>>(new Set());

  const handlePlayTrack = (trackId: string | number) => {
    console.log(`AlbumPage: Play track ${trackId}`);
    const trackToPlay = album.tracks.find(t => t.id === trackId);
    if (trackToPlay) {
        setCurrentPlayingTrack({
            id: trackToPlay.id,
            title: trackToPlay.title,
            artist: trackToPlay.artist,
            albumArtUrl: trackToPlay.albumArtUrl || album.coverImageUrl, // Fallback to album cover
            durationSeconds: parseInt(trackToPlay.duration?.split(':')[0] || '3') * 60 + parseInt(trackToPlay.duration?.split(':')[1] || '0'),
        });
    }
  };

  const handlePlayAll = () => {
    console.log(`AlbumPage: Play all tracks from ${album.name}`);
    if (album.tracks.length > 0) {
        handlePlayTrack(album.tracks[0].id);
    }
  };

  const toggleLikeTrack = (trackId: string | number) => {
    setLikedTracks(prev => {
        const newSet = new Set(prev);
        if (newSet.has(trackId)) {
            newSet.delete(trackId);
        } else {
            newSet.add(trackId);
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
            {/* Album Header */}
            <header className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
              <img 
                src={album.coverImageUrl} 
                alt={`${album.name} cover`} 
                className="w-48 h-48 md:w-56 md:h-56 rounded-lg shadow-lg object-cover"
              />
              <div className="flex-1 text-center md:text-left">
                <Text size="sm" variant="subtle" className="uppercase tracking-wider">Album</Text>
                <Heading as="h1" variant="pageTitle" className="text-4xl md:text-5xl lg:text-6xl my-2 !border-b-0 !pb-0 !mb-1">
                  {album.name}
                </Heading>
                <Text size="lg" weight="medium" className="mb-1">{album.artist}</Text>
                <div className="flex items-center justify-center md:justify-start space-x-2 text-sm text-muted-foreground">
                  <span>{album.releaseYear}</span>
                  <span>•</span>
                  <span>{album.tracks.length} songs</span>
                  <span>•</span>
                  <span>{album.totalDuration}</span>
                </div>
                <Button size="lg" className="mt-6 bg-green-500 hover:bg-green-600 text-white" onClick={handlePlayAll}>
                  <Play className="mr-2 h-5 w-5 fill-current" /> Play Album
                </Button>
              </div>
            </header>

            {/* Track List */}
            <div className="space-y-1">
              {album.tracks.map((track, index) => (
                <TrackRowItem
                  key={track.id}
                  {...track}
                  album={album.name} // Explicitly pass album name
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

export default AlbumPage;