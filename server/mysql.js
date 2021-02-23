const mysql = require("mysql");
const moment = require('moment');

require("dotenv").config();
const con = mysql.createConnection({
//   host: "35.230.118.105",
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
con.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log(`Connected to MySQL! on ${process.env.DB_NAME} DB`);
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

const getRecentlyPlayedHandler = (req, res) => { /// do not modify!
        if(!req.params.email) return res.status(400).send('bad request')
        const sql = `SELECT songs.id, songs.title, artists.name, songs.cover_img, i.updated_at FROM songs
        JOIN artists ON artists.id = songs.artist_id
        JOIN interactions i ON i.song_id = songs.id
        JOIN users ON i.user_id = users.id
        WHERE email = '${req.params.email}'
        ORDER BY updated_at DESC
        LIMIT 10;`
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            // if (result[0] === undefined) {res.status(404).send("no results")}
            else {res.send(result)};
          })
};
const getTopSongsHandler = (req, res) => { /// do not modify!
        const sql = `SELECT s.created_at, s.id, s.title AS song_title, s.cover_img, a.name AS artist_name, s.length, SUM(play_count) AS total 
        FROM interactions i 
        JOIN songs s ON s.id = song_id
        JOIN artists a ON s.artist_id = a.id
        GROUP BY song_id 
        ORDER BY total DESC 
        LIMIT 20`
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {res.status(404).send("no results")}
            else {res.send(result)};
          })
};
const getTopArtistsHandler = (req, res) => { /// do not modify!
        const sql = `SELECT a.created_at, a.id AS artist_id ,a.name AS artist_name, a.cover_img, SUM(play_count) AS total_plays 
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
        const sql = `SELECT a.name AS album_name, a.cover_img, a.id AS id, artists.name AS artist_name, SUM(play_count) AS total_plays 
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
        const sql = "SELECT p.name, p.id, SUM(i.play_count) AS num_of_plays, T.num_of_songs FROM interactions i JOIN playlist_songs pls ON i.song_id = pls.song_id JOIN (SELECT *, COUNT(song_id) AS num_of_songs FROM playlist_songs GROUP BY (playlist_id)) AS T ON T.playlist_id = pls.playlist_id  JOIN playlists p ON p.id = pls.playlist_id GROUP BY (pls.playlist_id)";
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {res.status(404).send("no results")}
            else {res.send(result)};
          })
};

////////////// GET SPECIFIC BY ID

const getSongByIdHandler = (req, res) => { /// do not modify!
        con.query(`SELECT songs.*, artists.name AS artist_name FROM songs JOIN artists ON artists.id = songs.artist_id 
        WHERE songs.id = ?`,req.params.id, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {res.status(404).send("Song not found")}
            else {res.send(result[0])};
          })
};
const getArtistByIdHandler = (req, res) => { /// do not modify! 
        con.query(`SELECT * FROM artists 
        JOIN (SELECT artist_id, COUNT(artist_id) AS num_of_songs FROM songs GROUP BY artist_id) AS T  
        ON artists.id = T.artist_id 
        WHERE artists.id = ?`,req.params.id, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {res.status(404).send("Artist not found")}
            else {res.send(result[0])};
        })
};
const getArtistSongs = (req, res) => { /// do not modify! 
    con.query(`SELECT songs.id, songs.title, songs.created_at, songs.length, interactions.play_count
    FROM songs
    LEFT JOIN interactions ON interactions.song_id = songs.id
    WHERE artist_id = ?
    `,req.params.id, function (err, result, fields) {
        if (err) throw err;
        if (result[0] === undefined) {res.status(404).send("Artist not found")}
        else {res.send(result)};
    })
};
const getArtistAlbums = (req, res) => { /// do not modify! 
    con.query(`SELECT albums.name, albums.id, albums.cover_img, albums.created_at, COUNT(albums.name) AS num_of_songs
    FROM albums
    JOIN songs ON songs.album_id = albums.id
    WHERE albums.artist_id = ?
    GROUP BY albums.name`,req.params.id, function (err, result, fields) {
        if (err) throw err;
        if (result[0] === undefined) {res.status(404).send("Artist not found")}
        else {res.send(result)};
    })
};
const getSongInteractionsByIdHandler = (req, res) => { /// do not modify! 
    const params = req.query;
    if(!params.songId || !params.userEmail) return res.status(400).send('bad request');
    con.query(`select play_count
                FROM interactions
                JOIN users ON users.id = user_id
                WHERE users.email = '${params.userEmail}' AND song_id = ${params.songId}`, function (err, result, fields) {
        if (err) throw err;
        if (result[0] === undefined) {res.status(200).send("0")}
        else {res.send(result)};
    })
};
const getUserByEmailHandler = (req, res) => { /// do not modify!
    const params = req.query;
    con.query(`SELECT * FROM users 
    WHERE email LIKE '${params.email}'`, function (err, result, fields) {
        if (err) throw err;
        if (result[0] === undefined) {res.status(404).send("Song not found")}
        else {res.send(result[0])};
      })
};

const getAlbumByIdHandler = (req, res) => { /// do not modify!
            con.query(`SELECT albums.*, num_of_songs, artists.name AS artist_name FROM albums 
            JOIN (SELECT album_id, COUNT(artist_id) AS num_of_songs FROM songs GROUP BY album_id) AS T  
            ON albums.id = T.album_id
            JOIN artists ON albums.artist_id = artists.id
            WHERE albums.id = ?`,req.params.id, function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {res.status(404).send("Album not found")}
            else {res.send(result[0])};
          })
};
const getAlbumSongs = (req, res) => { /// do not modify! 
    con.query(`SELECT songs.id, songs.title, songs.created_at, songs.length, interactions.play_count
    FROM songs
    LEFT JOIN interactions ON interactions.song_id = songs.id
    WHERE album_id = ?
    `,req.params.id, function (err, result, fields) {
        if (err) throw err;
        if (result[0] === undefined) {res.status(404).send("Album not found")}
        else {res.send(result)};
    })
};

const getPlaylistByIdHandler = (req, res) => { /// do not modify!
        con.query(`SELECT pl.*, COUNT(pls.song_id) AS num_of_songs
        FROM playlists pl
        JOIN playlist_songs pls ON pls.playlist_id = pl.id
        WHERE pl.id = ?
        GROUP BY pl.id`,[req.params.id], function (err, result, fields) {
            if (err) throw err;
            if (result[0] === undefined) {res.status(404).send("Playlist not found")}
            else {res.send(result[0])};
          })
};
const getPlaylistSongs = (req, res) => { /// do not modify! 
    con.query(`SELECT songs.id, songs.title, songs.length
    FROM songs
    JOIN playlist_songs ON playlist_songs.song_id = songs.id
    WHERE playlist_songs.playlist_id = ?`,req.params.id, function (err, result, fields) {
        if (err) throw err;
        if (result[0] === undefined) {res.status(404).send("Album not found")}
        else {res.send(result)};
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
const postToInteracionsHandler = (req, res) => { ///!!!!!!
    let body = req.body;
    if(!body.play_count || !body.userEmail || !body.songId) {res.status(400).send("error: missing fields!")}; /// managing missing fields
    con.query(`SELECT play_count
    FROM interactions
    JOIN users ON users.id = user_id
    WHERE users.email = '${body.userEmail}' 
    AND song_id = ${body.songId}`
    , function (err, result, fields) {
        if(err) throw err;
        if (result[0]) {res.status(400).send("interactions already exists")
        } else{
                con.query(`INSERT INTO interactions (user_id, song_id, play_count, created_at, updated_at)
                VALUES (
                    (SELECT id FROM users WHERE email = '${body.userEmail}'), 
                    ${body.songId}, 
                    ${body.play_count}, 
                    '${moment(new Date()).format("YYYY-MM-DD")}'), 
                    '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'); 
                `,
                function (err, result, fields) {
                    if (err) throw err;
                    if(!result) {res.status(400).send("Invalid input")}
                    else {res.send(result)}
                })
        }
    })
};
const postToUsersHandler = (req, res) => {
    let body = req.body;
    if(!body.email) {res.status(400).send("error: email is missing!")}; /// managing missing fields
        con.query(`INSERT INTO users SET ?`,
        {
            "email": body.email,
            "created_at": moment(new Date()).format("YYYY-MM-DD"),
            "is_admin": false,
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
        con.query(`UPDATE songs SET ? WHERE id = ${Number(req.params.id)}`,
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
            con.query(`UPDATE albums SET ? WHERE id = ${Number(req.params.id)}`,
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
        con.query(`UPDATE playlists SET ? WHERE id = ${Number(req.params.id)}`,
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
        con.query(`UPDATE artists SET ? WHERE id = ${Number(req.params.id)}`,
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
const putToInteractionsHandler = (req, res) => { // !!!!!
    let body = req.body;
    if(!body.songId || !body.userEmail || !body.play_count) {res.status(400).send("error: missing fields!")}; /// managing missing fields
    con.query(`SELECT users.id as id, play_count
    FROM interactions
    JOIN users ON users.id = user_id
    WHERE users.email = '${body.userEmail}' AND song_id = ${body.songId}`, function (err, result, fields) {
        if (!result[0]) {
            res.status(404).send("interaction doesn't exist")
        } else {
            const userId = result[0].id;
            con.query(`UPDATE interactions SET ? WHERE song_id = ${body.songId} AND user_id = '${userId}'`,
            {
                "play_count": body.play_count,
                "updated_at": moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            }, 
            function (err, result, fields) {
                if (err) throw err;
                if(!result) {res.status(400).send("Invalid input")}
                else {res.send(fields)}
            })
        }
    })
}



///////////// DELETE A SPECIFIC BY ID
const deleteSongByIdHandler = (req, res) => { /// do not modify!
        con.query(`DELETE FROM songs WHERE id = ?`,[req.params.id], function (err, result, fields) {
            if (err) throw err;
            if (result === undefined) {res.status(404).send("Song not found")}
            else {res.send(result)};
          })
};
const deleteArtistByIdHandler = (req, res) => { /// do not modify!
        con.query(`DELETE FROM artists WHERE id = ?`,[req.params.id], function (err, result, fields) {
            if (err) throw err;
            if (result === undefined) {res.status(404).send("Artist not found")}
            else {res.send(result)};
          })
};
const deleteAlbumByIdHandler = (req, res) => { /// do not modify!
        con.query(`DELETE FROM albums WHERE id = ?`,[req.params.id], function (err, result, fields) {
            if (err) throw err;
            if (result === undefined) {res.status(404).send("Album not found")}
            else {res.send(result)};
          })
};
const deletePlaylistByIdHandler = (req, res) => { /// do not modify!
        con.query(`DELETE FROM playlists WHERE id = ?`,[req.params.id], function (err, result, fields) {
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
    getRecentlyPlayedHandler: getRecentlyPlayedHandler,

    getSongByIdHandler: getSongByIdHandler,
    getArtistByIdHandler: getArtistByIdHandler,
    getArtistSongs: getArtistSongs,
    getArtistAlbums: getArtistAlbums,
    getAlbumByIdHandler: getAlbumByIdHandler,
    getAlbumSongs: getAlbumSongs,
    getPlaylistByIdHandler: getPlaylistByIdHandler,
    getPlaylistSongs: getPlaylistSongs,
    getSongInteractionsByIdHandler: getSongInteractionsByIdHandler,
    getUserByEmailHandler: getUserByEmailHandler,

    postToSongsHandler: postToSongsHandler,
    postToArtistsHandler: postToArtistsHandler,
    postToAlbumsHandler: postToAlbumsHandler,
    postToPlaylistHandler: postToPlaylistHandler,
    postToInteracionsHandler: postToInteracionsHandler,
    postToUsersHandler: postToUsersHandler,

    putToSongsHandler: putToSongsHandler,
    putToArtistsHandler: putToArtistsHandler,
    putToAlbumsHandler: putToAlbumsHandler,
    putToPlaylistHandler: putToPlaylistHandler,
    putToInteractionsHandler: putToInteractionsHandler,

    deleteSongByIdHandler: deleteSongByIdHandler,
    deleteArtistByIdHandler: deleteArtistByIdHandler,
    deleteAlbumByIdHandler: deleteAlbumByIdHandler,
    deletePlaylistByIdHandler: deletePlaylistByIdHandler
};