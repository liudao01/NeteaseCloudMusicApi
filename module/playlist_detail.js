
// 歌单详情

module.exports = (query, request) => {
    const data = {
        id: query.id,
        n: 100000,
        s: query.s || 8
    }
    return getData(query, data, request);
}

async function getData(query, data, request) {
    // var json = {status: 500, body: {}, cookie: []}

    const json = await request(
        'POST', `https://music.163.com/weapi/v3/playlist/detail`, data,
        {crypto: 'linuxapi', cookie: query.cookie, proxy: query.proxy}
    )

    // json.body = json.body.playlist;

    // console.log( json.body);

    // console.log(promise.body);
    // return promise;
    // var track_json = json;
    //
    // var info = {
    //     'id': 'neplaylist_' + list_id,
    //     'cover_img_url': data.playlist.coverImgUrl,
    //     'title': data.playlist.name,
    //     'source_url': 'http://music.163.com/#/playlist?id=' + list_id
    // };
    //
    //
    var tracks = [];
    json.body.playlist.tracks.forEach(function (track_json, index) {
        console.log(index.name + track_json);
        var default_track = {
            'id': '0',
            'title': '',
            'artist': '',
            'artist_id': 'neartist_0',
            'album': '',
            'album_id': 'nealbum_0',
            'source': 'netease',
            'source_url': 'http://www.xiami.com/song/0',
            'img_url': '',
            'url': ''
        };
        default_track.id = 'netrack_' + track_json.id;
        default_track.title = track_json.name;
        default_track.artist = track_json.ar[0].name;
        default_track.artist_id = 'neartist_' + track_json.ar[0].id;
        default_track.album = track_json.al.name;
        default_track.album_id = 'nealbum_' + track_json.al.id;
        default_track.source_url = 'http://music.163.com/#/song?id=' + track_json.id;
        default_track.img_url = track_json.al.picUrl;
        default_track.url = default_track.id;

        tracks.push(default_track);
    });
    // console.log(tracks);
    let newbody ={}
    newbody.tracks = tracks;
    json.body = newbody;
    json.body.privileges = [];
    json.body.trackIds = [];
    return json;
}