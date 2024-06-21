import spotify, { getToken } from "./lib/spotify";
import { SongList } from "./components/SongList";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    spotify.getPopularSongs();
  }, []);  
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-8 mb-20">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Music App1</h1>
        </header>
        <section>
          <h2 className="text-2xl font-semibold mb-5">Popular Songs</h2>
          <SongList/>
        </section>
      </main>
    </div>
  );
}
