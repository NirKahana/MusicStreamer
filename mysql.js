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
    const queryPromise = new Promise((resolve, reject) => {
        const sql = `SELECT song_id, play_count
        FROM interactions
        ORDER BY play_count DESC
        LIMIT 3`
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {reject("no results")}
            else {resolve(result)};
          })
    })
    queryPromise.then(result => res.send(result))
    .catch( err => res.status(404).send(err))
};
const getTopArtistsHandler = (req, res) => { /// do not modify!
    const queryPromise = new Promise((resolve, reject) => {
        const sql = `SELECT s.artist_id, SUM(play_count) AS total_plays FROM interactions i JOIN songs s ON s.id = i.song_id GROUP BY artist_id ORDER BY total_plays DESC LIMIT 3`
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {reject("no results")}
            else {resolve(result)};
          })
    })
    queryPromise.then(result => res.send(result))
    .catch( err => res.status(404).send(err))
};
const getTopAlbumsHandler = (req, res) => { /// do not modify!
    const queryPromise = new Promise((resolve, reject) => {
        const sql = `SELECT s.album_id, SUM(play_count) AS total_plays FROM interactions i JOIN songs s ON s.id = i.song_id GROUP BY album_id ORDER BY total_plays DESC LIMIT 3`
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {reject("no results")}
            else {resolve(result)};
          })
    })
    queryPromise.then(result => res.send(result))
    .catch( err => res.status(404).send(err))
};
const getTopPlaylistsHandler = (req, res) => { /// do not modify!
    const queryPromise = new Promise((resolve, reject) => {
        const sql = `SELECT pls.playlist_id, SUM(i.play_count) AS total_playlist_plays 
        FROM playlist_songs pls 
        JOIN interactions i  
        ON pls.song_id = i.song_id 
        GROUP BY pls.playlist_id 
        ORDER BY total_playlist_plays DESC 
        LIMIT 3`;
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {reject("no results")}
            else {resolve(result)};
          })
    })
    queryPromise.then(result => res.send(result))
    .catch( err => res.status(404).send(err))
};

////////////// GET SPECIFIC BY ID

const getSongByIdHandler = (req, res) => { /// do not modify!
    const queryPromise = new Promise((resolve, reject) => {
        con.query(`SELECT * FROM songs WHERE id = ${Number(req.params.id)}`, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {reject("Song not found")}
            else {resolve(result[0])};
          })
    })
    queryPromise.then(result => res.send(result))
    .catch( err => res.status(404).send(err))
};
const getArtistByIdHandler = (req, res) => { /// do not modify! 
    const queryPromise = new Promise((resolve, reject) => {
        con.query(`SELECT * FROM artists WHERE id = ${Number(req.params.id)}`, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {reject("Artist not found")}
            else {resolve(result[0])};
          })
    })
    queryPromise.then(result => res.send(result))
    .catch( err => res.status(404).send(err))
};
const getAlbumByIdHandler = (req, res) => { /// do not modify!
    const queryPromise = new Promise((resolve, reject) => {
        con.query(`SELECT * FROM albums WHERE id = ${Number(req.params.id)}`, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {reject("Album not found")}
            else {resolve(result[0])};
          })
    })
    queryPromise.then(result => res.send(result))
    .catch( err => res.status(404).send(err))
};
const getPlaylistByIdHandler = (req, res) => { /// do not modify!
    const queryPromise = new Promise((resolve, reject) => {
        con.query(`SELECT * FROM playlists WHERE id = ${Number(req.params.id)}`, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {reject("Playlist not found")}
            else {resolve(result[0])};
          })
    })
    queryPromise.then(result => res.send(result))
    .catch( err => res.status(404).send(err))
};
////////////// POST A NEW

const postToArtistsHandler = (req, res) => { // do not modify!
    let body = req.body;                                                     /// defining body
    if(!body.name) {res.status(400).send("error: artist name is missing!")}; /// managing missing fields
    const queryPromise = new Promise((resolve, reject) => {
        con.query(`INSERT INTO artists SET ?`,
        {
            "name": body.name,
            "cover_img": body.cover_img,
            "created_at": moment(body.created_at).format("YYYY-MM-DD"),
            "upload_at": moment(new Date()).format("YYYY-MM-DD"),
        }, 
        function (err, result, fields) {
            if (err) throw err;
            if(!result) {reject("invalid input")}
            else {resolve(result)}
        })

    })
    queryPromise.then(result => res.send(result))
    .catch( err => res.status(400).send(err));
}
const postToAlbumsHandler = (req, res) => { // do not
    let body = req.body;
    if(!body.name || !body.artist_id) {res.status(400).send("error: album name or artist_id is missing!")}
    const queryPromise = new Promise((resolve, reject) => {
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
                if(!result) {reject("Error bad request")}
                else {resolve(result)}
            })
        })
        .catch(err =>{reject(err)})
    })
    queryPromise.then(result => res.send(result))
    .catch( err => res.status(400).send(err));
}
const postToPlaylistHandler = (req, res) => { // do not modify
    let body = req.body;
    if(!body.name) {res.status(400).send("error: playlist name is missing!")}; /// managing missing fields
    const queryPromise = new Promise((resolve, reject) => {
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
            if(!result) {reject("invalid input")}
            else {resolve(result)}
        })
    })
    queryPromise.then(result => res.send(result))
    .catch( err => res.status(400).send(err));
};
const postToSongsHandler = (req, res) => {
    let body = req.body;
    if(!body.title || !body.artist_id || !body.album_id) {res.status(400).send("error: song name or album or artist is missing!")}; /// managing missing fields
    const queryPromise = new Promise((resolve, reject) => {
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
            if(!result) {reject("invalid input")}
            else {resolve(result)}
        })
    })
    queryPromise.then(result => res.send(result))
    .catch( err => res.status(400).send(err));
};
///////////// UPADTE A SPECIFIC BY ID

const putToSongsHandler = (req, res) => {
    let body = req.body;
    if(!body.title || !body.artist_id || !body.album_id) {res.status(400).send("error: song name or album or artist is missing!")}; /// managing missing fields
    const queryPromise = new Promise((resolve, reject) => {
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
            if(!result) {reject("invalid input")}
            else {resolve(result)}
        })
    })
    queryPromise.then(result => res.send(result))
    .catch( err => res.status(400).send(err));
};
const putToAlbumsHandler = (req, res) => { // do not
    let body = req.body;
    if(!body.name || !body.artist_id) {res.status(400).send("error: album name or artist_id is missing!")}
    const queryPromise = new Promise((resolve, reject) => {
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
                if(!result) {reject("Error bad request")}
                else {resolve(result)}
            })
        })
        .catch(err =>{reject(err)})
    })
    queryPromise.then(result => res.send(result))
    .catch( err => res.status(400).send(err));
}
const putToPlaylistHandler = (req, res) => { // do not modify
    let body = req.body;
    if(!body.name) {res.status(400).send("error: playlist name is missing!")}; /// managing missing fields
    const queryPromise = new Promise((resolve, reject) => {
        con.query(`UPDATE playlists SET ?`,
        {
            "name": body.name,
            "cover_img": body.cover_img,
            "created_at": moment(body.created_at).format("YYYY-MM-DD"),
            "list_of_songs": body.list_of_songs
        }, 
        function (err, result, fields) {
            if (err) throw err;
            if(!result) {reject("invalid input")}
            else {resolve(result)}
        })
    })
    queryPromise.then(result => res.send(result))
    .catch( err => res.status(400).send(err));
};
const putToArtistsHandler = (req, res) => { // do not modify!
    let body = req.body;                                                     /// defining body
    if(!body.name) {res.status(400).send("error: artist name is missing!")}; /// managing missing fields
    const queryPromise = new Promise((resolve, reject) => {
        con.query(`UPDATE artists SET ?`,
        {
            "name": body.name,
            "cover_img": body.cover_img,
            "created_at": moment(body.created_at).format("YYYY-MM-DD"),
        }, 
        function (err, result, fields) {
            if (err) throw err;
            if(!result) {reject("invalid input")}
            else {resolve(result)}
        })

    })
    queryPromise.then(result => res.send(result))
    .catch( err => res.status(400).send(err));
}

///////////// DELETE A SPECIFIC BY ID
const deleteSongByIdHandler = (req, res) => { /// do not modify!
    const queryPromise = new Promise((resolve, reject) => {
        con.query(`DELETE FROM songs WHERE id = ${Number(req.params.id)}`, function (err, result, fields) {
            if (err) throw err;
            if (result === undefined) {reject("Song not found")}
            else {resolve(result)};
          })
    })
    queryPromise.then(result => res.send(result))
    .catch( err => res.status(404).send(err))
};
const deleteArtistByIdHandler = (req, res) => { /// do not modify!
    const queryPromise = new Promise((resolve, reject) => {
        con.query(`DELETE FROM artists WHERE id = ${Number(req.params.id)}`, function (err, result, fields) {
            if (err) throw err;
            if (result === undefined) {reject("Song not found")}
            else {resolve(result)};
          })
    })
    queryPromise.then(result => res.send(result))
    .catch( err => res.status(404).send(err))
};
const deleteAlbumByIdHandler = (req, res) => { /// do not modify!
    const queryPromise = new Promise((resolve, reject) => {
        con.query(`DELETE FROM albums WHERE id = ${Number(req.params.id)}`, function (err, result, fields) {
            if (err) throw err;
            if (result === undefined) {reject("Song not found")}
            else {resolve(result)};
          })
    })
    queryPromise.then(result => res.send(result))
    .catch( err => res.status(404).send(err))
};
const deletePlaylistByIdHandler = (req, res) => { /// do not modify!
    const queryPromise = new Promise((resolve, reject) => {
        con.query(`DELETE FROM playlists WHERE id = ${Number(req.params.id)}`, function (err, result, fields) {
            if (err) throw err;
            if (result === undefined) {reject("Song not found")}
            else {resolve(result)};
          })
    })
    queryPromise.then(result => res.send(result))
    .catch( err => res.status(404).send(err))
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