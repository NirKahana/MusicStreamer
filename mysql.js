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
                    if (!result[0]) {reject("coudn't find such an artist")}
                    else {resolve(result[0].id)}
        });
    }) 
}

const selectSongByID = (songId) => {  /// do not modify!
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM songs WHERE id = ${Number(songId)}`, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {reject("Song not found"); console.log("rejected");}
            else {resolve(result[0])};
          })
    })
}
const selectArtistByID = (artistId) => { /// do not modify!
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM artists WHERE id = ${Number(artistId)}`, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {reject("Artist not found")}
            else {resolve(result[0])};
          })
    })
}
const selectAlbumByID = (albumId) => {  /// do not modify!
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM albums WHERE id = ${Number(albumId)}`, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {reject("Album not found")}
            else {resolve(result[0])};
          })
    })
}
const selectPlaylistByID = (playlistId) => {  /// do not modify!
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM playlists WHERE id = ${Number(playlistId)}`, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {reject("Playlist not found")}
            else {resolve(result[0])};
          })
    })
}


const insertNewArtist = (dataObject) => { /// do not modify!
    return new Promise((resolve, reject) => {
        con.query(`INSERT INTO artists SET ?`,
        {
            "name": dataObject.name,
            "cover_img": dataObject.cover_img,
            "created_at": moment(dataObject.created_at).format("YYYY-MM-DD"),
            "upload_at": moment(new Date()).format("YYYY-MM-DD"),
        }, 
        function (err, result, fields) {
            if (err) throw err;
            if(!result) {reject("invalid input")}
            else {resolve(result)}
        })

    })
}
const insertNewAlbum = (dataObject) => { /// do not modify!
    return new Promise((resolve, reject) => {
        getArtistID(dataObject.artist_id).then(() => {
            con.query(`INSERT INTO albums SET ?`,
            {
                "name": dataObject.name,
                "artist_id": dataObject.artist_id,
                "cover_img": dataObject.cover_img,
                "created_at": moment(dataObject.created_at).format("YYYY-MM-DD"),
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
}
const insertNewPlaylist = (dataObject) => { 
    return new Promise((resolve, reject) => {
        con.query(`INSERT INTO playlists SET ?`,
        {
            "name": dataObject.name,
            "cover_img": dataObject.cover_img,
            "created_at": moment(dataObject.created_at).format("YYYY-MM-DD"),
            "upload_at": moment(new Date()).format("YYYY-MM-DD"),
            "list_of_songs": dataObject.list_of_songs
        }, 
        function (err, result, fields) {
            if (err) throw err;
            if(!result) {reject("invalid input")}
            else {resolve(result)}
        })
    })
}
const insertNewSong = (dataObject) => { 
    return new Promise((resolve, reject) => {
        con.query(`INSERT INTO songs SET ?`,
        {
            "title": dataObject.title,
            "artist_id": dataObject.artist_id,
            "album_id": dataObject.album_id,
            "created_at": moment(dataObject.created_at).format("YYYY-MM-DD"),
            "upload_at": moment(new Date()).format("YYYY-MM-DD"),
            "length": dataObject.title,
            "track_number": dataObject.track_number,
            "lyrics": dataObject.lyrics,
            "youtube_link": dataObject.youtube_link,
        }, 
        function (err, result, fields) {
            if (err) throw err;
            if(!result) {
                reject("invalid input");
                console.log("rejected");
            }
            else {
                resolve(result);
                console.log("resolved");
            }
        })
    })
}
//////////////

const getSongByIdHandler = (req, res) => { /// do not modify!
    selectSongByID(req.params.id).then(result => res.send(result), err => res.status(404).send(err))
};
const getArtistByIdHandler = (req, res) => { /// do not modify! 
    selectArtistByID(req.params.id).then(result => res.send(result), err => res.status(404).send(err))
};
const getAlbumByIdHandler = (req, res) => { /// do not modify!
    selectAlbumByID(req.params.id).then(result => res.send(result), err => res.status(404).send(err))
};
const getPlaylistByIdHandler = (req, res) => { /// do not modify!
    selectPlaylistByID(req.params.id).then(result => res.send(result), err => res.status(404).send(err))
};
//////////////////////////////////////////////////////

const postToArtistsHandler = (req, res) => { // do not modify!
    let body = req.body;                                                     /// defining body
    if(!body.name) {res.status(400).send("error: artist name is missing!")}; /// managing missing fields
    insertNewArtist(body).then(result => res.send(result), err => res.status(400).send(err)); // sending the query
}
const postToAlbumsHandler = (req, res) => { // do not
    let body = req.body;
    if(!body.name || !body.artist_id) {res.status(400).send("error: album name or artist_id is missing!")}
    insertNewAlbum(body).then(result => res.send(result), err => res.status(400).send(err));
}
const postToPlaylistHandler = (req, res) => { // do not modify
    let body = req.body;
    if(!body.name) {res.status(400).send("error: playlist name is missing!")}; /// managing missing fields
    insertNewPlaylist(body).then(result => res.send(result), err => res.status(400).send(err)); // sending the query
};
const postToSongsHandler = (req, res) => {
    let body = req.body;
    if(!body.title || !body.artist_id || !body.album_id) {res.status(400).send("error: song name or album or artist is missing!")}; /// managing missing fields
    return res.send("sent");
    insertNewSong(body).then(result => res.send(result), err => res.status(400).send(err)); // sending the query
};


//// EXPORT
module.exports = {
    // testFunc: testFunc,
    getSongByIdHandler: getSongByIdHandler,
    getArtistByIdHandler: getArtistByIdHandler,
    getAlbumByIdHandler: getAlbumByIdHandler,
    getPlaylistByIdHandler: getPlaylistByIdHandler,

    postToSongsHandler: postToSongsHandler,
    postToArtistsHandler: postToArtistsHandler,
    postToAlbumsHandler: postToAlbumsHandler,
    postToPlaylistHandler: postToPlaylistHandler,
    // insertIntoPlaylist_Songs: insertIntoPlaylist_Songs,
};