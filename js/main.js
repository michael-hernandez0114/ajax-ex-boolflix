$(document).ready(function() {

    var source = $('#card-template').html();
    var template = Handlebars.compile(source);

    $('#input-search').keyup(function(event){
        if(event.keyCode == 13) {
            $('#card-container').empty();
            search('movie');
            search('tv');
        }
    });

    //console.log(template);
    $('#submit-search').click(function(event){
        $('#card-container').empty();

        var searchInput = $('#input-search').val();
        $('#input-search').val('');
        console.log("User submitted: " + searchInput);
        search('movie', searchInput);
        search('tv', searchInput);
    });

    function search(category, searchFilter) {

        var baseURL = 'https://api.themoviedb.org/3';

        $.ajax({
            url : baseURL + '/search/' + category,
            data: {
                api_key: 'b1bf34ce942f162a150cd71faf814c6d',
                query: searchFilter//'back to the future'
            },
            method : 'GET',
            success: function(data) {
                //console.log(data);
                //console.log(data.results);
                var results = data.results;
                processResults(category, results)
            },
            error: function() {
            alert('Failed to call API')
            }
        });
    }

    function processResults(category, resultsObj) {

        for (var i = 0; i < resultsObj.length; i++) {
            var singleObj = {
                            titolo: resultsObj[i].title,
                            titoloOriginale: resultsObj[i].original_title,
                            lingua: resultsObj[i].original_language,
                            voto: resultsObj[i].vote_average,

                        }

            var objToShow = template(singleObj);
            $('#card-container').append(objToShow);

        }
    }


})
