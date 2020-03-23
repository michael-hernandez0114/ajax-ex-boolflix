$(document).ready(function() {

    var source = $('#card-template').html();
    var template = Handlebars.compile(source);

    $('#input-search').keyup(function(event){
        if(event.keyCode == 13) {
            var searchInput = $('#input-search').val();

            if(searchInput.length > 0) {
                $('#card-container').empty();
                $('#input-search').val('');
                search('movie', searchInput);
                search('tv', searchInput);
            }
            else {
                alert("Please enter a value in the search bar");
            }
        }

    });

    //console.log(template);
    $('#submit-search').click(function(event){
        var searchInput = $('#input-search').val();

        if(searchInput > 0) {
            $('#card-container').empty();
            $('#input-search').val('');
            search('movie', searchInput);
            search('tv', searchInput);
        }
        else {
            alert("Please enter a value in the search bar");
        }

    });

    function search(category, searchFilter) {

        var baseURL = 'https://api.themoviedb.org/3';

        $.ajax({
            url : baseURL + '/search/' + category,
            data: {
                api_key: 'b1bf34ce942f162a150cd71faf814c6d',
                query: searchFilter,
                language: 'it-IT'
            },
            method : 'GET',
            success: function(data) {
                //console.log(data);
                //console.log('Results for ' + category);
                console.log(data.results);
                var results = data.results;
                processResults(category, results)
            },
            error: function() {
            alert('Failed to call API')
            }
        });
    }

    function processResults(category, resultsObj) {

        if(category === 'movie') {
            for (var i = 0; i < resultsObj.length; i++) {
                var filmObj = {
                                posterURL: createPosterURL(resultsObj[i].poster_path),
                                titolo: resultsObj[i].title,
                                titoloOriginale: resultsObj[i].original_title,
                                lingua: languageOrFlag(resultsObj[i].original_language),
                                voto: showStelle(resultsObj[i].vote_average),
                            }
                //console.log("Adding this film obj:" + filmObj);
                //console.log("filmObj voto has: " + filmObj.voto);
                var filmsToShow = template(filmObj);
                $('#card-container').append(filmsToShow);

            }
        }
        if(category === 'tv') {
            for (var i = 0; i < resultsObj.length; i++) {
                var tvObj = {
                                posterURL: createPosterURL(resultsObj[i].poster_path),
                                titolo: resultsObj[i].name,
                                titoloOriginale: resultsObj[i].original_name,
                                lingua: languageOrFlag(resultsObj[i].original_language),
                                voto: showStelle(resultsObj[i].vote_average),
                            }
                //console.log("Adding this tv obj:" + tvObj);
                //console.log("tvObj voto has: " + tvObj.voto);
                var tvsToShow = template(tvObj);
                $('#card-container').append(tvsToShow);

            }
        }
    }

    function showStelle(votes) {

        var totalStars = Math.ceil(votes / 2);
        var starHTML;

        //console.log('This film/tv has this many stars: ' + totalStars);

        switch(totalStars) {
            case 1:
            starHTML = '<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
            break;
            case 2:
            starHTML = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
            break
            case 3:
            starHTML = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
            break
            case 4:
            starHTML = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>';
            break
            case 5:
            starHTML = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>';
            break
            default:
            starHTML = '<i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';

        }

        return starHTML;

    }

    function createPosterURL(posterURL) {

        var baseImgURL = 'https://image.tmdb.org/t/p/';;
        var imgWidth = 'w342';
        var fullImgURL;

        if(posterURL == null) {
            fullImgURL = 'https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available.jpg';
        }
        else {
            fullImgURL = baseImgURL + imgWidth + posterURL;
        }


        console.log(fullImgURL);

        return fullImgURL;



    }

    function languageOrFlag(lang) {

        var filmTVLang;
        var htmlToDisplay;
        var flagURL;

        if(lang === 'en') {
            filmTVLang = 'us';
        }
        else {
            filmTVLang = lang;
        }

        if(filmTVLang === 'xx') {
            htmlToDisplay = filmTVLang;
        }
        else {
            flagURL = 'https://www.countryflags.io/' + filmTVLang + '/flat/32.png';
            htmlToDisplay = '<img src=\"' + flagURL + '\">';

        }

        return htmlToDisplay;

/*
        $.ajax({
            url : flagURL,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            method : 'GET',
            success: function(data) {
                //htmlToDisplay = '<img src=\"' + flagURL + '\">';
                console.log("found flag! Returning img HTML: " + '<img src=\"' + flagURL + '\">');
            },
            error: function() {
            //alert('No flag found. Returning language code instead');
            //htmlToDisplay = '<span>' + lang + '</span>';
            console.log("Inside error function: " + htmlToDisplay);

            }

        })
*/



    }

})
