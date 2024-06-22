import axios from "axios";

class SpotifyClient {
  static async initialize() {
    const client = new SpotifyClient();
    await client.authenticate();
    return client;
  }

  async authenticate() {
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
    this.token = response.data.access_token;
  }

  async getPopularSongs() {
    const response = await axios.get(
      "https://api.spotify.com/v1/playlists/7Bh83B3fWMqtdIK67Ld8em/tracks",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.token}`
        },
      }
    );
    return response.data;
  }
}

let spotify;
(async () => {
  spotify = await SpotifyClient.initialize();
})();

export default spotify;