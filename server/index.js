const express = require("express");
const query = require("./mysql.js");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/top_songs/", query.getTopSongsHandler);
app.get("/top_artists/", query.getTopArtistsHandler);
app.get("/top_albums/", query.getTopAlbumsHandler);
app.get("/top_playlists/", query.getTopPlaylistsHandler);

app.get("/songs/:id", query.getSongByIdHandler);
app.get("/artists/:id/songs", query.getArtistSongs);
app.get("/artists/:id/albums", query.getArtistAlbums);
app.get("/artists/:id", query.getArtistByIdHandler);
app.get("/albums/:id/songs", query.getAlbumSongs);
app.get("/albums/:id", query.getAlbumByIdHandler);
app.get("/playlists/:id/songs", query.getPlaylistSongs);
app.get("/playlists/:id", query.getPlaylistByIdHandler);
app.get("/interactions", query.getSongInteractionsByIdHandler);
app.get("/user", query.getUserByEmailHandler);

app.post("/songs", query.postToSongsHandler);
app.post("/artists", query.postToArtistsHandler);
app.post("/albums", query.postToAlbumsHandler);
app.post("/playlists", query.postToPlaylistHandler);
app.post("/interactions", query.postToInteracionsHandler);
app.post("/users", query.postToUsersHandler);

app.put("/songs/:id", query.putToSongsHandler);
app.put("/artists/:id", query.putToArtistsHandler);
app.put("/albums/:id", query.putToAlbumsHandler);
app.put("/playlists/:id", query.putToPlaylistHandler);
app.put("/interactions", query.putToInteractionsHandler);

app.delete("/songs/:id", query.deleteSongByIdHandler);
app.delete("/artists/:id", query.deleteArtistByIdHandler);
app.delete("/albums/:id", query.deleteAlbumByIdHandler);
app.delete("/playlists/:id", query.deletePlaylistByIdHandler);

// let calcOddsForBirthdayMatch = (numberOfParticipants) => {
//     let oddsForNoMatch = 1;
//     for (let i = 0; i < numberOfParticipants; i++) {
//         oddsForNoMatch = oddsForNoMatch * ((364-i)/365)
//     }
//     return 1 - oddsForNoMatch;
// }
// let oddForMatch = calcOddsForBirthdayMatch(23);
// console.log(oddForMatch);

/// ERROR HANDLING
const unknownEndpoint = (request, response) => {
  response.status(404).send("error: unknown endpoint");
};
app.use(unknownEndpoint);
/// PORT DETAILS
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
