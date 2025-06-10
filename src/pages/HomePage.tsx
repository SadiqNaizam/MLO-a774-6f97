import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MusicPlayerBar from '@/components/layout/MusicPlayerBar';
import PlaylistCard from '@/components/music/PlaylistCard';
import TrackRowItem from '@/components/music/TrackRowItem';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Heading from '@/components/typography/Heading';
import { CurrentTrack } from '@/components/layout/MusicPlayerBar'; // Assuming CurrentTrack interface is exported

// Placeholder data
const featuredPlaylists = [
  { id: 'fp1', title: 'Chill Vibes', description: 'Relax and unwind', coverImageUrl: 'https://placehold.co/300x300/7FDBFF/FFFFFF?text=Chill+Vibes', playlistUrl: '/playlist/chill-vibes', creatorName: 'MusicApp', itemCount: 15 },
  { id: 'fp2', title: 'Workout Hits', description: 'Energy boost for your workout', coverImageUrl: 'https://placehold.co/300x300/FF4136/FFFFFF?text=Workout', playlistUrl: '/playlist/workout-hits', creatorName: 'MusicApp', itemCount: 20 },
  { id: 'fp3', title: 'Focus Flow', description: 'Instrumental tracks for concentration', coverImageUrl: 'https://placehold.co/300x300/2ECC40/FFFFFF?text=Focus', playlistUrl: '/playlist/focus-flow', creatorName: 'MusicApp', itemCount: 25 },
];

const recentlyPlayedTracks = [
  { id: 'rt1', title: 'Sunset Drive', artist: 'Synthwave Kid', duration: '3:45', albumArtUrl: 'https://placehold.co/100x100/FFDC00/333333?text=SD', album: 'Nightscapes' },
  { id: 'rt2', title: 'Ocean Breath', artist: 'Ambient Sphere', duration: '5:12', albumArtUrl: 'https://placehold.co/100x100/0074D9/FFFFFF?text=OB', album: 'Meditations' },
];

const HomePage: React.FC = () => {
  console.log('HomePage loaded');
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState<CurrentTrack | undefined>(undefined);

  const handlePlayTrack = (trackId: string | number) => {
    console.log(`HomePage: Play track ${trackId}`);
    // Find track from a list or API and set it
    const trackToPlay = recentlyPlayedTracks.find(t => t.id === trackId) || 
                        // Simulate finding a track from a playlist to play
                        { id: trackId, title: 'Sample Track', artist: 'Sample Artist', durationSeconds: 180, albumArtUrl: 'https://placehold.co/100x100' };
    
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

  const handlePlayPlaylist = (playlistId: string | number) => {
    console.log(`HomePage: Play playlist ${playlistId}`);
    // Simulate playing the first track of the playlist
    setCurrentPlayingTrack({
        id: `track-from-${playlistId}-1`,
        title: `First Track from Playlist ${playlistId}`,
        artist: "Various Artists",
        albumArtUrl: featuredPlaylists.find(p => p.id === playlistId)?.coverImageUrl || 'https://placehold.co/100x100',
        durationSeconds: 210,
    });
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar className="hidden md:flex" />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 flex-shrink-0">
          <Input type="search" placeholder="Search for songs, artists, playlists..." className="w-full md:w-1/2 lg:w-1/3" />
        </div>
        <ScrollArea className="flex-grow p-6 pt-0 space-y-8">
          <section>
            <Heading as="h1" variant="pageTitle" className="mb-6">Welcome Back!</Heading>
          </section>

          <section>
            <Heading as="h2" variant="default" className="mb-4">Featured Playlists</Heading>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {featuredPlaylists.map(playlist => (
                <PlaylistCard 
                  key={playlist.id}
                  {...playlist}
                  onPlay={() => handlePlayPlaylist(playlist.id)}
                />
              ))}
            </div>
          </section>

          <section>
            <Heading as="h2" variant="default" className="mb-4">Recently Played</Heading>
            <Card>
              <CardContent className="p-0">
                {recentlyPlayedTracks.map(track => (
                  <TrackRowItem
                    key={track.id}
                    {...track}
                    onPlayPause={() => handlePlayTrack(track.id)}
                    isPlaying={currentPlayingTrack?.id === track.id}
                  />
                ))}
              </CardContent>
            </Card>
          </section>
          {/* Add more sections like New Releases, Recommendations etc. */}
        </ScrollArea>
        <MusicPlayerBar 
          initialTrack={currentPlayingTrack}
          className="border-t" 
        />
      </main>
    </div>
  );
};

export default HomePage;