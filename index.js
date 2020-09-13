const express = require("express");
const query = require('./mysql.js');
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());


app.get('/top_songs/', query.getTopSongsHandler);
app.get('/top_artists/', query.getTopArtistsHandler);
app.get('/top_albums/', query.getTopAlbumsHandler);
app.get('/top_playlists/', query.getTopPlaylistsHandler);

app.get('/songs/:id', query.getSongByIdHandler);
app.get('/artists/:id', query.getArtistByIdHandler);
app.get('/albums/:id', query.getAlbumByIdHandler);
app.get('/playlists/:id', query.getPlaylistByIdHandler);

app.post('/songs', query.postToSongsHandler);
app.post('/artists', query.postToArtistsHandler);
app.post('/albums', query.postToAlbumsHandler);
app.post('/playlists', query.postToPlaylistHandler);

app.delete('/songs/:id', query.deleteSongByIdHandler);
app.delete('/artists/:id', query.deleteArtistByIdHandler);
app.delete('/albums/:id', query.deleteAlbumByIdHandler);
app.delete('/playlists/:id', query.deletePlaylistByIdHandler);


// app.post('/playlist_songs', query.insertIntoPlaylist_Songs)
  



// let calc = (numberOfParticipants) => {
//     let odds = 1;
//     for (let i = 0; i < numberOfParticipants; i++) {
//         odds = odds * ((360-i)/360)
//     }
//     return 1 - odds;
// }
// let result = calc(15);
// console.log(result);






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
  