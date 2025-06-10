import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MusicPlayerBar from '@/components/layout/MusicPlayerBar';
import PlaylistCard from '@/components/music/PlaylistCard';
import TrackRowItem from '@/components/music/TrackRowItem';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Heading from '@/components/typography/Heading';
import { CurrentTrack } from '@/components/layout/MusicPlayerBar'; // Assuming CurrentTrack interface is exported

// Placeholder search results
const searchResults = {
  tracks: [
    { id: 'st1', title: 'Echoes in Time', artist: 'Chronos', duration: '4:20', albumArtUrl: 'https://placehold.co/100x100/E8117F/FFFFFF?text=ET', album: 'Temporal Shift' },
    { id: 'st2', title: 'Neon Dreams', artist: 'Futurewave', duration: '3:55', albumArtUrl: 'https://placehold.co/100x100/F0F/FFFFFF?text=ND', album: 'Cyber City' },
  ],
  playlists: [
    { id: 'sp1', title: '80s Synthwave Hits', description: 'Retro wave collection', coverImageUrl: 'https://placehold.co/300x300/FF851B/FFFFFF?text=80s', playlistUrl: '/playlist/80s-synth', itemCount: 30 },
    { id: 'sp2', title: 'Lofi Beats to Study', description: 'Chillhop for focus', coverImageUrl: 'https://placehold.co/300x300/3D9970/FFFFFF?text=Lofi', playlistUrl: '/playlist/lofi-study', itemCount: 50 },
  ],
  albums: [ // Assuming PlaylistCard can be used for albums too, or a similar AlbumCard would exist
    { id: 'sa1', title: 'The Dark Side of the Moon', description: 'Pink Floyd', coverImageUrl: 'https://placehold.co/300x300/111111/FFFFFF?text=DSOTM', playlistUrl: '/album/dark-side', itemCount: 10 },
  ],
  artists: [ // Visually represented with a simple card or avatar + name
     { id: 'ar1', name: 'Daft Punk', imageUrl: 'https://placehold.co/150x150/0074D9/FFFFFF?text=DP' },
     { id: 'ar2', name: 'Kraftwerk', imageUrl: 'https://placehold.co/150x150/FF4136/FFFFFF?text=KW' },
  ]
};


const SearchPage: React.FC = () => {
  console.log('SearchPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState<CurrentTrack | undefined>(undefined);

  const handlePlayTrack = (trackId: string | number) => {
    console.log(`SearchPage: Play track ${trackId}`);
     const trackToPlay = searchResults.tracks.find(t => t.id === trackId);
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
    console.log(`SearchPage: Play playlist ${playlistId}`);
    setCurrentPlayingTrack({
        id: `track-from-${playlistId}-1`,
        title: `First Track from Playlist ${playlistId}`,
        artist: "Various Artists",
        albumArtUrl: searchResults.playlists.find(p => p.id === playlistId)?.coverImageUrl || 'https://placehold.co/100x100',
        durationSeconds: 210,
    });
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar className="hidden md:flex" />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 flex-shrink-0 sticky top-0 bg-background z-10 border-b">
          <Input 
            type="search" 
            placeholder="What do you want to listen to?" 
            className="w-full md:w-1/2 lg:w-1/3" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <ScrollArea className="flex-grow p-6 pt-2">
          {searchTerm ? (
            <Tabs defaultValue="tracks" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="tracks">Tracks</TabsTrigger>
                <TabsTrigger value="playlists">Playlists</TabsTrigger>
                <TabsTrigger value="albums">Albums</TabsTrigger>
                <TabsTrigger value="artists">Artists</TabsTrigger>
              </TabsList>

              <TabsContent value="tracks">
                <Heading as="h3" variant="subtle" className="mb-3">Found Tracks</Heading>
                <div className="space-y-1">
                  {searchResults.tracks.map(track => (
                    <TrackRowItem 
                      key={track.id} 
                      {...track} 
                      onPlayPause={() => handlePlayTrack(track.id)}
                      isPlaying={currentPlayingTrack?.id === track.id}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="playlists">
                <Heading as="h3" variant="subtle" className="mb-3">Found Playlists</Heading>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {searchResults.playlists.map(playlist => (
                    <PlaylistCard 
                      key={playlist.id} 
                      {...playlist} 
                      onPlay={() => handlePlayPlaylist(playlist.id)}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="albums">
                <Heading as="h3" variant="subtle" className="mb-3">Found Albums</Heading>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {searchResults.albums.map(album => (
                    <PlaylistCard // Reusing PlaylistCard for albums for simplicity
                      key={album.id} 
                      {...album} 
                      title={album.title}
                      description={album.description} // Artist name
                      playlistUrl={album.playlistUrl} // Album URL
                      onPlay={() => console.log('Play album', album.id)}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="artists">
                <Heading as="h3" variant="subtle" className="mb-3">Found Artists</Heading>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {searchResults.artists.map(artist => (
                        <Card key={artist.id} className="overflow-hidden">
                            <img src={artist.imageUrl} alt={artist.name} className="w-full h-32 object-cover" />
                            <div className="p-3">
                                <p className="font-semibold text-sm">{artist.name}</p>
                                <Button variant="link" size="sm" className="p-0 h-auto mt-1">View Artist</Button>
                            </div>
                        </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="text-center text-muted-foreground py-10">
              <Heading as="h3">Search for your favorite music</Heading>
              <p>Find tracks, artists, albums, and playlists.</p>
            </div>
          )}
        </ScrollArea>
        <MusicPlayerBar 
            initialTrack={currentPlayingTrack}
            className="border-t" 
        />
      </main>
    </div>
  );
};

export default SearchPage;