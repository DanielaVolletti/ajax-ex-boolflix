// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto


$(document).ready(function(){

  // variabili per handlebars
  var source = $('#film-template').html();
  var template = Handlebars.compile(source);

  // evento click sul bottone di ricerca
  $('.sezione-ricerca button').click(function () {

    // pulisco la sezione in cui appaiono i film
    var containerRicerca = $('.risultato-ricerca').html("");
    // salvo la ricerca dell'utente e normalizzo i caratteri
    var valoreInput = $('.sezione-ricerca input').val();

    // chiamata ajax per trovare i film e stamparli in pagina con handlebars
    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      data: {
        api_key: "d038cec7530a2aa194a0bd6917afb94d",
        dataType: "json",
        language: "it-IT",
        query: valoreInput
      },
      success: function(risultato,stato){
        // salvo in una variabile i film
        var films = risultato.results;

        //ciclo i film ed estrapolo ciò che mi serve per la stampa in pagina
        for (var i = 0; i < films.length; i++) {
          var singoloFilm= films[i];

          var context = {
            "titolo": singoloFilm.title,
            "titoloOriginale": singoloFilm.original_title,
            "lingua": singoloFilm.original_language,
            "voto": singoloFilm.vote_average
          };
          var html = template(context);
          // stampo in pagina i film
          $('.risultato-ricerca').append(html);

        };

      },
      error: function(richiesta,stato,errore){
        alert("Chiamata fallita!!!");
      }

    })

  })





})
