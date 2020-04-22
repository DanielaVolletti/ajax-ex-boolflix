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
            "voto": singoloFilm.vote_average,
            "tipo": "Film"
          };
          var html = template(context);
          // stampo in pagina i film
          $('.risultato-ricerca').append(html);

        };

      },
      error: function(richiesta,stato,errore){
        alert("Chiamata fallita!!!");
      }

    });

    // Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
    $.ajax({
      url: "https://api.themoviedb.org/3/search/tv",
      method: "GET",
      data: {
        api_key: "d038cec7530a2aa194a0bd6917afb94d",
        dataType: "json",
        language: "it-IT",
        query: valoreInput
      },
      success: function(risultato,stato){
        // salvo in una variabile i film
        var serie = risultato.results;

        //ciclo i film ed estrapolo ciò che mi serve per la stampa in pagina
        for (var i = 0; i < serie.length; i++) {
          var singolaSerie= serie[i];

          var context = {
            "titolo": singolaSerie.name,
            "titoloOriginale": singolaSerie.original_name,
            "lingua": singolaSerie.original_language,
            "voto": singolaSerie.vote_average,
            "tipo": "Serie tv"
          };
          var html = template(context);
          // stampo in pagina i film
          $('.risultato-ricerca').append(html);

        };

      },
      error: function(richiesta,stato,errore){
        alert("Chiamata fallita!!!");
      }

    });


  })





})
