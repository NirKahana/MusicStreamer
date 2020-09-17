const mysql = require("mysql");
const moment = require('moment');

require("dotenv").config();
const con = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
con.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log(`Connected to my sql! on ${process.env.DB_NAME} DB`);
  }
});
/////
getArtistID = (artist_id) => {
    return new Promise((resolve,reject) => {
        con.query(
            `SELECT id FROM artists WHERE id = ${artist_id}`, function(err, result){                                                
                if(err) throw err;
                    if (!result[0]) {
                        reject("coudn't find such an artist")
                    }
                    else {resolve(result[0].id)}
        });
    }) 
}
////////////// GET TOP OF

const getTopSongsHandler = (req, res) => { /// do not modify!
        const sql = `SELECT s.title AS song_title, a.name AS artist_name, SUM(play_count) AS total 
        FROM interactions i 
        JOIN songs s ON s.id = song_id
        JOIN artists a ON s.artist_id = a.id
        GROUP BY song_id 
        ORDER BY total DESC 
        LIMIT 10`
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {res.status(404).send("no results")}
            else {res.send(result)};
          })
};
const getTopArtistsHandler = (req, res) => { /// do not modify!
        const sql = `SELECT a.name AS artist_name, SUM(play_count) AS total_plays 
        FROM interactions i 
        JOIN songs s 
        ON s.id = i.song_id 
        JOIN artists a
        ON a.id = s.artist_id
        GROUP BY artist_id 
        ORDER BY total_plays DESC 
        LIMIT 10;`
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {res.status(404).send("no results")}
            else {res.send(result)};
          })
};
const getTopAlbumsHandler = (req, res) => { /// do not modify!
        const sql = `SELECT a.name AS album_name, artists.name AS artist_name, SUM(play_count) AS total_plays 
        FROM interactions i 
        JOIN songs s 
        ON s.id = i.song_id 
        JOIN albums a ON a.id = s.album_id
        JOIN artists ON s.artist_id = artists.id
        GROUP BY album_id 
        ORDER BY total_plays DESC 
        LIMIT 10;`
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {res.status(404).send("no results")}
            else {res.send(result)};
          })
};
const getTopPlaylistsHandler = (req, res) => { /// do not modify!
        const sql = "SELECT p.name, SUM(i.play_count) AS num_of_plays, T.num_of_songs FROM interactions i JOIN playlist_songs pls ON i.song_id = pls.song_id JOIN (SELECT *, COUNT(song_id) AS num_of_songs FROM playlist_songs GROUP BY (playlist_id)) AS T ON T.playlist_id = pls.playlist_id  JOIN playlists p ON p.id = pls.playlist_id GROUP BY (pls.playlist_id)";
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {res.status(404).send("no results")}
            else {res.send(result)};
          })
};

////////////// GET SPECIFIC BY ID

const getSongByIdHandler = (req, res) => { /// do not modify!
        con.query(`SELECT * FROM songs WHERE id = ${Number(req.params.id)}`, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {res.status(404).send("Song not found")}
            else {res.send(result[0])};
          })
};
const getArtistByIdHandler = (req, res) => { /// do not modify! 
        con.query(`SELECT * FROM artists WHERE id = ${Number(req.params.id)}`, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {res.status(404).send("Artist not found")}
            else {res.send(result[0])};
        })
};
const getAlbumByIdHandler = (req, res) => { /// do not modify!
        con.query(`SELECT * FROM albums WHERE id = ${Number(req.params.id)}`, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {res.status(404).send("Album not found")}
            else {res.send(result[0])};
          })
};
const getPlaylistByIdHandler = (req, res) => { /// do not modify!
        con.query(`SELECT * FROM playlists WHERE id = ${Number(req.params.id)}`, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {res.status(404).send("Playlist not found")}
            else {res.send(result[0])};
          })
};
////////////// POST A NEW

const postToArtistsHandler = (req, res) => { // do not modify!
    let body = req.body;                                                     /// defining body
    if(!body.name) {res.status(400).send("error: artist name is missing!")}; /// managing missing fields
        con.query(`INSERT INTO artists SET ?`,
        {
            "name": body.name,
            "cover_img": body.cover_img,
            "created_at": moment(body.created_at).format("YYYY-MM-DD"),
            "upload_at": moment(new Date()).format("YYYY-MM-DD"),
        }, 
        function (err, result, fields) {
            if (err) throw err;
            if(!result) {res.status(400).send("Invalid input")}
            else {res.send(result)}
        })
}
const postToAlbumsHandler = (req, res) => { // do not
    let body = req.body;
    if(!body.name || !body.artist_id) {res.status(400).send("error: album name or artist_id is missing!")}
        getArtistID(body.artist_id).then(() => {
            con.query(`INSERT INTO albums SET ?`,
            {
                "name": body.name,
                "artist_id": body.artist_id,
                "cover_img": body.cover_img,
                "created_at": moment(body.created_at).format("YYYY-MM-DD"),
                "upload_at": moment(new Date()).format("YYYY-MM-DD"),
            }, 
            function (err, result, fields) {
                if (err) throw err;
                if(!result) {res.status(400).send("Invalid input")}
                else {res.send(result)}
            })
        })
        .catch(err =>{reject(err)})
}
const postToPlaylistHandler = (req, res) => { // do not modify
    let body = req.body;
    if(!body.name) {res.status(400).send("error: playlist name is missing!")}; /// managing missing fields
        con.query(`INSERT INTO playlists SET ?`,
        {
            "name": body.name,
            "cover_img": body.cover_img,
            "created_at": moment(body.created_at).format("YYYY-MM-DD"),
            "upload_at": moment(new Date()).format("YYYY-MM-DD"),
            "upload_at": moment(new Date()).format("YYYY-MM-DD"),
            "list_of_songs": body.list_of_songs
        }, 
        function (err, result, fields) {
            if (err) throw err;
            if(!result) {res.status(400).send("Invalid input")}
            else {res.send(result)}
        })
};
const postToSongsHandler = (req, res) => {
    let body = req.body;
    if(!body.title || !body.artist_id || !body.album_id) {res.status(400).send("error: song name or album or artist is missing!")}; /// managing missing fields
        con.query(`INSERT INTO songs SET ?`,
        {
            "title": body.title,
            "artist_id": body.artist_id,
            "album_id": body.album_id,
            "created_at": moment(body.created_at).format("YYYY-MM-DD"),
            "upload_at": moment(new Date()).format("YYYY-MM-DD"),
            "length": body.length,
            "track_number": body.track_number,
            "lyrics": body.lyrics,
            "youtube_link": body.youtube_link,
        }, 
        function (err, result, fields) {
            if (err) throw err;
            if(!result) {res.status(400).send("Invalid input")}
            else {res.send(result)}
        })
};
///////////// UPADTE A SPECIFIC BY ID

const putToSongsHandler = (req, res) => {
    let body = req.body;
    if(!body.title || !body.artist_id || !body.album_id) {res.status(400).send("error: song name or album or artist is missing!")}; /// managing missing fields
        con.query(`UPDATE songs SET ?`,
        {
            "title": body.title,
            "artist_id": body.artist_id,
            "album_id": body.album_id,
            "created_at": moment(body.created_at).format("YYYY-MM-DD"),
            "length": body.length,
            "track_number": body.track_number,
            "lyrics": body.lyrics,
            "youtube_link": body.youtube_link
        }, 
        function (err, result, fields) {
            if (err) throw err;
            if(!result) {res.status(400).send("Invalid input")}
            else {res.send(result)}
        })
};
const putToAlbumsHandler = (req, res) => { // do not
    let body = req.body;
    if(!body.name || !body.artist_id) {res.status(400).send("error: album name or artist_id is missing!")}
        getArtistID(body.artist_id).then(() => {
            con.query(`UPDATE albums SET ?`,
            {
                "name": body.name,
                "artist_id": body.artist_id,
                "cover_img": body.cover_img,
                "created_at": moment(body.created_at).format("YYYY-MM-DD"),
            }, 
            function (err, result, fields) {
                if (err) throw err;
                if(!result) {res.status(400).send("Invalid input")}
                else {res.send(result)}
            })
        })
        .catch(err =>{reject(err)})
}
const putToPlaylistHandler = (req, res) => { // do not modify
    let body = req.body;
    if(!body.name) {res.status(400).send("error: playlist name is missing!")}; /// managing missing fields
        con.query(`UPDATE playlists SET ?`,
        {
            "name": body.name,
            "cover_img": body.cover_img,
            "created_at": moment(body.created_at).format("YYYY-MM-DD"),
            "list_of_songs": body.list_of_songs
        }, 
        function (err, result, fields) {
            if (err) throw err;
            if(!result) {res.status(400).send("Invalid input")}
            else {res.send(result)}
        })
};
const putToArtistsHandler = (req, res) => { // do not modify!
    let body = req.body;                                                     /// defining body
    if(!body.name) {res.status(400).send("error: artist name is missing!")}; /// managing missing fields
        con.query(`UPDATE artists SET ?`,
        {
            "name": body.name,
            "cover_img": body.cover_img,
            "created_at": moment(body.created_at).format("YYYY-MM-DD"),
        }, 
        function (err, result, fields) {
            if (err) throw err;
            if(!result) {res.status(400).send("Invalid input")}
            else {res.send(result)}
        })
}

///////////// DELETE A SPECIFIC BY ID
const deleteSongByIdHandler = (req, res) => { /// do not modify!
        con.query(`DELETE FROM songs WHERE id = ${Number(req.params.id)}`, function (err, result, fields) {
            if (err) throw err;
            if (result === undefined) {res.status(404).send("Song not found")}
            else {res.send(result)};
          })
};
const deleteArtistByIdHandler = (req, res) => { /// do not modify!
        con.query(`DELETE FROM artists WHERE id = ${Number(req.params.id)}`, function (err, result, fields) {
            if (err) throw err;
            if (result === undefined) {res.status(404).send("Artist not found")}
            else {res.send(result)};
          })
};
const deleteAlbumByIdHandler = (req, res) => { /// do not modify!
        con.query(`DELETE FROM albums WHERE id = ${Number(req.params.id)}`, function (err, result, fields) {
            if (err) throw err;
            if (result === undefined) {res.status(404).send("Album not found")}
            else {res.send(result)};
          })
};
const deletePlaylistByIdHandler = (req, res) => { /// do not modify!
        con.query(`DELETE FROM playlists WHERE id = ${Number(req.params.id)}`, function (err, result, fields) {
            if (err) throw err;
            if (result === undefined) {res.status(404).send("Playlist not found")}
            else {res.send(result)};
          })
};

//// EXPORT
module.exports = {
    getTopSongsHandler: getTopSongsHandler,
    getTopArtistsHandler: getTopArtistsHandler,
    getTopAlbumsHandler: getTopAlbumsHandler,
    getTopPlaylistsHandler: getTopPlaylistsHandler,

    getSongByIdHandler: getSongByIdHandler,
    getArtistByIdHandler: getArtistByIdHandler,
    getAlbumByIdHandler: getAlbumByIdHandler,
    getPlaylistByIdHandler: getPlaylistByIdHandler,

    postToSongsHandler: postToSongsHandler,
    postToArtistsHandler: postToArtistsHandler,
    postToAlbumsHandler: postToAlbumsHandler,
    postToPlaylistHandler: postToPlaylistHandler,

    putToSongsHandler: putToSongsHandler,
    putToArtistsHandler: putToArtistsHandler,
    putToAlbumsHandler: putToAlbumsHandler,
    putToPlaylistHandler: putToPlaylistHandler,

    deleteSongByIdHandler: deleteSongByIdHandler,
    deleteArtistByIdHandler: deleteArtistByIdHandler,
    deleteAlbumByIdHandler: deleteAlbumByIdHandler,
    deletePlaylistByIdHandler: deletePlaylistByIdHandler
};