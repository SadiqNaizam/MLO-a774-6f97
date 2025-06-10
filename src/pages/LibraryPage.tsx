import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MusicPlayerBar from '@/components/layout/MusicPlayerBar';
import PlaylistCard from '@/components/music/PlaylistCard';
import TrackRowItem from '@/components/music/TrackRowItem';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Heading from '@/components/typography/Heading';
import { CurrentTrack } from '@/components/layout/MusicPlayerBar';

// Placeholder library data
const libraryData = {
  likedSongs: [
    { id: 'ls1', title: 'Strobe', artist: 'deadmau5', duration: '10:37', albumArtUrl: 'https://placehold.co/100x100/B10DC9/FFFFFF?text=Strobe', album: 'For Lack of a Better Name' },
    { id: 'ls2', title: 'Midnight City', artist: 'M83', duration: '4:03', albumArtUrl: 'https://placehold.co/100x100/AAAAAA/FFFFFF?text=MC', album: 'Hurry Up, We\'re Dreaming' },
  ],
  playlists: [
    { id: 'lib_p1', title: 'My Driving Mix', description: 'Road trip essentials', coverImageUrl: 'https://placehold.co/300x300/FFDC00/333?text=Driving', playlistUrl: '/playlist/my-driving-mix', itemCount: 42 },
    { id: 'lib_p2', title: 'Gym Power Hours', description: 'High energy for workouts', coverImageUrl: 'https://placehold.co/300x300/F012BE/FFFFFF?text=Gym', playlistUrl: '/playlist/gym-power', itemCount: 60 },
  ],
  albums: [
     { id: 'lib_a1', title: 'Discovery', description: 'Daft Punk', coverImageUrl: 'https://placehold.co/300x300/001f3f/FFFFFF?text=Discovery', playlistUrl: '/album/discovery', itemCount: 14 },
     { id: 'lib_a2', title: 'Random Access Memories', description: 'Daft Punk', coverImageUrl: 'https://placehold.co/300x300/DDDDDD/000000?text=RAM', playlistUrl: '/album/ram', itemCount: 13 },
  ],
  artists: [ // Can be simple cards or links
    { id: 'lib_ar1', name: 'ODESZA', imageUrl: 'https://placehold.co/150x150/39CCCC/FFFFFF?text=OD' },
    { id: 'lib_ar2', name: 'Flume', imageUrl: 'https://placehold.co/150x150/01FF70/333333?text=FL' },
  ]
};

const LibraryPage: React.FC = () => {
  console.log('LibraryPage loaded');
  const [filterTerm, setFilterTerm] = useState('');
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState<CurrentTrack | undefined>(undefined);

  const handlePlayTrack = (trackId: string | number) => {
    console.log(`LibraryPage: Play track ${trackId}`);
    const trackToPlay = libraryData.likedSongs.find(t => t.id === trackId);
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
    console.log(`LibraryPage: Play playlist/album ${playlistId}`);
    const item = [...libraryData.playlists, ...libraryData.albums].find(p => p.id === playlistId);
    setCurrentPlayingTrack({
        id: `track-from-${playlistId}-1`,
        title: `First Track from ${item?.title || 'Item'}`,
        artist: item?.description || "Various Artists",
        albumArtUrl: item?.coverImageUrl || 'https://placehold.co/100x100',
        durationSeconds: 210,
    });
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar className="hidden md:flex" />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 flex-shrink-0 sticky top-0 bg-background z-10 border-b">
          <Heading as="h1" variant="pageTitle" className="mb-4 !border-b-0 !pb-0">Your Library</Heading>
          <Input 
            type="search" 
            placeholder="Filter in your library..." 
            className="w-full md:w-1/2 lg:w-1/3" 
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          />
        </div>

        <ScrollArea className="flex-grow p-6 pt-2">
          <Tabs defaultValue="playlists" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
              <TabsTrigger value="albums">Albums</TabsTrigger>
              <TabsTrigger value="artists">Artists</TabsTrigger>
              <TabsTrigger value="likedSongs">Liked Songs</TabsTrigger>
            </TabsList>

            <TabsContent value="playlists">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {libraryData.playlists.filter(p => p.title.toLowerCase().includes(filterTerm.toLowerCase())).map(playlist => (
                  <PlaylistCard 
                    key={playlist.id} 
                    {...playlist} 
                    onPlay={() => handlePlayPlaylist(playlist.id)}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="albums">
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {libraryData.albums.filter(a => a.title.toLowerCase().includes(filterTerm.toLowerCase())).map(album => (
                  <PlaylistCard // Reusing for albums
                    key={album.id}
                    {...album}
                    onPlay={() => handlePlayPlaylist(album.id)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="artists">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {libraryData.artists.filter(ar => ar.name.toLowerCase().includes(filterTerm.toLowerCase())).map(artist => (
                        <Card key={artist.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <img src={artist.imageUrl} alt={artist.name} className="w-full h-32 object-cover" />
                            <CardContent className="p-3">
                                <p className="font-semibold text-sm truncate">{artist.name}</p>
                                {/* Link to artist page could go here */}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="likedSongs">
              <div className="space-y-1">
                {libraryData.likedSongs.filter(t => t.title.toLowerCase().includes(filterTerm.toLowerCase()) || t.artist.toLowerCase().includes(filterTerm.toLowerCase())).map(track => (
                  <TrackRowItem 
                    key={track.id} 
                    {...track} 
                    onPlayPause={() => handlePlayTrack(track.id)}
                    isPlaying={currentPlayingTrack?.id === track.id}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>
        <MusicPlayerBar 
            initialTrack={currentPlayingTrack}
            className="border-t" 
        />
      </main>
    </div>
  );
};

export default LibraryPage;