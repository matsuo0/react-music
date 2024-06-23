import axios from "axios";
// import React from "react";

class SpotifyClient {
  static async initialize() {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", process.env.REACT_APP_SPOTIFY_CLIENT_ID);
    params.append("client_secret", process.env.REACT_APP_SPOTIFY_CLIENT_SECRET);

    const response = await axios.post("https://accounts.spotify.com/api/token", 
      params,
      { 
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    ); 
    let spotify = new SpotifyClient();
    spotify.token = response.data.access_token;
    return spotify;
  }

  async getPopularSongs() {
    const response = await axios.get(
      "https://api.spotify.com/v1/playlists/7Bh83B3fWMqtdIK67Ld8em/tracks",
      {
        // headers: {
        //   "Authorization": `Bearer ${this.token}`,
        // },
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.token}`,
        },
      }
    );
    return response.data;
  }

  async searchSongs(keyword, limit, offset) {
    const response = await axios.get(
      `https://api.spotify.com/v1/search`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.token}`,
        },
        params: {
          "q": keyword,
          "type": "track",
          "limit": limit,
          "offset": offset
        }
      }      
    );
    return response.data.tracks;
  }
}



const spotify = await SpotifyClient.initialize();
export default spotify;