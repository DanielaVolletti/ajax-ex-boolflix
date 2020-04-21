// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto


$(document).ready(function(){

  $('.sezione-ricerca button').click(function () {
    var valoreInput = $('.sezione-ricerca input').val().toLowerCase();
    console.log(valoreInput);


    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      data: {
        api_key: "d038cec7530a2aa194a0bd6917afb94d",
        language: "it-IT",
        query: valoreInput
      },
      success: function(risultato,stato){
        var films = risultato.results;
        // console.log(films);
        // variabili per handlebars
        var source = $('#film-template').html();
        var template = Handlebars.compile(source);

        for (var i = 0; i < films.length; i++) {
          var singoloFilm= films[i];
          console.log(singoloFilm.title);
          var titoloFilm = singoloFilm.title.toLowerCase();
          if (titoloFilm.includes(valoreInput)) {
            var context = {
              "titolo": singoloFilm.title,
              "titoloOriginale": singoloFilm.original_title,
              "lingua": singoloFilm.original_language,
              "voto": singoloFilm.vote_average
            };
            console.log(context);
            var html = template(context);
            $('.risultato-ricerca').append(html);
          };

        };
      },
      error: function(richiesta,stato,errore){
        alert("Chiamata fallita!!!");
      }

    })

  })





})
