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

    // chiamata ajax per film
    chiamataAjax("https://api.themoviedb.org/3/search/movie", "d038cec7530a2aa194a0bd6917afb94d", "it-IT", valoreInput, "Film");

    // chiamata ajax per Serie
    chiamataAjax("https://api.themoviedb.org/3/search/tv", "d038cec7530a2aa194a0bd6917afb94d", "it-IT", valoreInput, "Serie tv");

  });


  // FUNZIONI

  // funzione per generare chiamata ajax
  function chiamataAjax(url, apiKey, lingua, query, tipologia) {
    $.ajax({
      url: url,
      method: "GET",
      data: {
        api_key: apiKey,
        dataType: "json",
        language: lingua,
        query: query
      },
      success: function(risultato,stato){
        // salvo in una variabile l'array di serie
        var listaFilm = risultato.results;
        // faccio partire la funzione per generare l'output
        generaOutput(listaFilm, tipologia);
      },
      error: function(richiesta,stato,errore){
        alert("Chiamata fallita!!!");
      }
    });
  };

  // Funzione per generare output in pagina
  function generaOutput(array, tipo) {

    //ciclo i film ed estrapolo ciò che mi serve per la stampa in pagina
    for (var i = 0; i < array.length; i++) {
      var singoloItem= array[i];

      // inizializzo variabili titolo e titolo originale
      var title, originalTitle;

      // a seconda che sia film o serie tv: titolo e titolo originale
      if(tipo === "Film"){
        title = singoloItem.title;
        originalTitle = singoloItem.original_title;
      } else if(tipo === "Serie tv"){
        title = singoloItem.name;
        originalTitle = singoloItem.original_name;
      };

      // inserisco i valori che dovranno essere inseriti su html
      var context = {
        "titolo": title,
        "titoloOriginale": originalTitle,
        "lingua": generaBandiera(singoloItem.original_language),
        "voto": votoStelle(singoloItem.vote_average),
        "tipo": tipo,
        "poster": generaPoster(singoloItem.poster_path),
        "trama": overview(singoloItem.overview)
      };
      var html = template(context);
      // stampo in pagina i film
      $('.risultato-ricerca').append(html);

      // hover su poster fa apparire le specifiche del film
      $('.blocco-film').on({
        mouseenter: function () {
          $(this).children('.info-film').addClass('active');
        }, mouseleave: function (){
          $(this).children('.info-film').removeClass('active');
        }
      });

    };

  };

  // Funzione per generare voto con stelle
  function votoStelle(voto) {
    // cambio voto da 1 a 5
    var voto = parseInt(voto / 2);
    // creo 5 stelle che riempio a seconda che del voto corrispondente
    var stelle = "";
    for(var j = 1; j <= 5; j++) {
      if(j <= voto) {
        stelle += '<i class="fas fa-star piena"></i>';
      } else {
        stelle += '<i class="far fa-star vuota"></i>';
      }
    }
    return stelle;
  };

  // Funzione genera bandiere al posto della Lingua
  function generaBandiera(lingua) {
    // stampo una bandiera al posto della Lingua
    var imgBandiere = ["it", "en"];
    var bandiera;
    if(imgBandiere.includes(lingua)){
      bandiera = '<img class="bandiera" src="img/' + lingua + '.svg" alt="it">';
    } else {
      bandiera = lingua;
    }
    return bandiera;
  };

  // Funzione genera poster
  function generaPoster(poster) {
    var copertinaFilm;
    if(poster) {
      copertinaFilm = '<img src="https://image.tmdb.org/t/p/w342' + poster + '">';
    } else {
      copertinaFilm = '<div class="no-copertina">Poster non disponibile</div>' ;
    }
    return copertinaFilm;
  };

  // Funzione genera overview
  function overview(overview) {
    var trama;
    if(overview){
      trama = '<b>Overview: </b>' + overview;
    } else {
      trama = "";
    }
    return trama;
  };

})
