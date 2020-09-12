const express = require("express");
const query = require('./mysql.js');
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());


app.get('/songs/:id', query.getSongByIdHandler);
app.get('/artists/:id', query.getArtistByIdHandler);
app.get('/albums/:id', query.getAlbumByIdHandler);
app.get('/playlists/:id', query.getPlaylistByIdHandler);

app.post('/songs', query.postToSongsHandler);
app.post('/artists', query.postToArtistsHandler);
app.post('/albums', query.postToAlbumsHandler);
app.post('/playlists', query.postToPlaylistHandler);

// app.post('/playlist_songs', query.insertIntoPlaylist_Songs)
  



/// ERROR HANDLING
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
  };
  app.use(unknownEndpoint);
  /// PORT DETAILS
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  