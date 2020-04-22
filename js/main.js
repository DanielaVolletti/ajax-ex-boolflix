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
        // salvo in una variabile l'array di film
        var films = risultato.results;



        //ciclo i film ed estrapolo ciò che mi serve per la stampa in pagina
        for (var i = 0; i < films.length; i++) {
          var singoloFilm= films[i];

          // salvo in una variabile il voto di ogni film, trasformandolo da 1 a 5 e arrotondando per eccesso
          var voto = singoloFilm.vote_average;
          var votoNoDec = parseInt(voto / 2);

          // devo stampare un numero di stelle che va da 1 a 5 e colorare solo quelle corrispondenti al voto dato

          // stampo una bandiera al posto della Lingua
          var bandiera = singoloFilm.original_language;
          if(singoloFilm.original_language == "it"){
            bandiera = '<img src="img/it.svg" alt="it">';
            console.log(bandiera);
          }
          if(singoloFilm.original_language == "en"){
            bandiera = '<img src="img/en.svg" alt="en">';
            console.log(bandiera);
          }

          var context = {
            "titolo": singoloFilm.title,
            "titoloOriginale": singoloFilm.original_title,
            "lingua": bandiera,
            "voto": votoNoDec,
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

    // Allargo la ricerca anche alle serie tv
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
        // salvo in una variabile l'array di serie
        var serie = risultato.results;

        //ciclo le serie ed estrapolo ciò che mi serve per la stampa in pagina
        for (var i = 0; i < serie.length; i++) {
          var singolaSerie= serie[i];

          // salvo in una variabile il voto di ogni serie, trasformandolo da 1 a 5 e arrotondando per eccesso
          var voto = singolaSerie.vote_average;
          var votoNoDec = parseInt(voto / 2);

          // stampo una bandiera al posto della Lingua
          var bandiera = singoloFilm.original_language;
          if(singoloFilm.original_language == "it"){
            bandiera = '<img src="img/it.svg" alt="it">';
            console.log(bandiera);
          }
          if(singoloFilm.original_language == "en"){
            bandiera = '<img src="img/en.svg" alt="en">';
            console.log(bandiera);
          }

          var context = {
            "titolo": singolaSerie.name,
            "titoloOriginale": singolaSerie.original_name,
            "lingua": singolaSerie.original_language,
            "voto": votoNoDec,
            "tipo": "Serie tv"
          };
          var html = template(context);
          // stampo in pagina le serie
          $('.risultato-ricerca').append(html);

        };

      },
      error: function(richiesta,stato,errore){
        alert("Chiamata fallita!!!");
      }

    });


  })





})
