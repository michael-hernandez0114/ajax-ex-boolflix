$(document).ready(function() {

    //var source = $('#card-template').html();
    //var template = Handlebars.compile(source);

    //console.log(template);

    $.ajax({
        url : 'https://flynn.boolean.careers/exercises/api/array/music',
        method : 'GET',
        success: function(data) {
            //console.log(data.response);

            var albumList = data.response;

            for (var i = 0; i < albumList.length; i++) {
                //console.log(albumList[i]);

                var album = {
                    imgAlbum: albumList[i].poster,
                    albumName: albumList[i].title,
                    artist: albumList[i].author,
                    genre: albumList[i].genre,
                    year: albumList[i].year
                }

                var cardAlbum = template(album);
                $('.card-block').append(cardAlbum);

            }
        },
        error: function() {
        alert('Failed to call API')
        }


    });



})
