$(document).ready(function() {

    var source = $('#card-template').html();
    var template = Handlebars.compile(source);

    $('#input-search').keyup(function(event){
        if(event.keyCode == 13) {
            search();
        }

    });

    //console.log(template);
    $('#submit-search').click(function(event){
        search();
    });

    function search() {
        $('#card-container').empty();
        var searchInput = $('#input-search').val();
        $('#input-search').val('');
        console.log("User submitted: " + searchInput);
        $.ajax({
            url : 'https://api.themoviedb.org/3/search/movie',
            data: {
                api_key: 'b1bf34ce942f162a150cd71faf814c6d',
                query: searchInput//'back to the future'
            },
            method : 'GET',
            success: function(data) {
                console.log(data);
                console.log(data.results);

                var filmList = data.results;

                for (var i = 0; i < filmList.length; i++) {


                    var film = {
                        titolo: filmList[i].title,
                        titoloOriginale: filmList[i].original_title,
                        lingua: filmList[i].original_language,
                        voto: filmList[i].vote_average,

                    }

                    var filmsToShow = template(film);
                    $('#card-container').append(filmsToShow);

                }

            },
            error: function() {
            alert('Failed to call API')
            }
        });
    }


})
