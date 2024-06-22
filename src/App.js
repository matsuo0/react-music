import React, { useEffect, useState } from 'react';
import spotify from "./lib/spotify";
import { SongList } from "./components/SongList";

export default function App() {
  const [isSpotifyReady, setIsSpotifyReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [popularSongs, setPopularSongs] = useState([]);

  useEffect(() => {
    fetchPopularSongs();
  }, []);

  const fetchPopularSongs = async () => {
    if (spotify) {
      
    }
    setIsLoading(true);
    const result = await spotify.getPopularSongs();
    const popularSongs = result.items.map((item) => {
      return item.track
    });
    setPopularSongs(popularSongs);
    setIsLoading(false);
  };

  useEffect(() => {
    async function fetchSpotify() {
      while (!spotify) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      setIsSpotifyReady(true);
    }
    fetchSpotify();
  }, []);

  useEffect(() => {
    if (isSpotifyReady) {
      async function fetchSongs() {
        const result = await spotify.getPopularSongs();
        const popularSongs = result.items.map((item) => item.track);
        setPopularSongs(popularSongs); // Use the fetched songs
      }
      fetchSongs();
    }
  }, [isSpotifyReady]); // Remove spotify from dependency array

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-8 mb-20">
        <header lang = "ja" className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Music App</h1>
        </header>
        <section>
          <h2 className="text-2xl font-semibold mb-5">Popular Songs</h2>
          <SongList isLoading={isLoading} songs={popularSongs}/>
        </section>
      </main>
    </div>
  );
}
