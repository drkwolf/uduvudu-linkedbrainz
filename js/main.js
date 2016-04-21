
function hashUrlHandler() {
  if (location.hash) {
    var identifier = location.hash.slice(2);
    //loadArtist(identifier, q1_artist_info);
    loadArtist(identifier, q2_artist_release);
    //loadArtist(identifier, q2_artist_release);
    //loadArtist(identifier, q2_artist_release);
    $('#identifier-search').val(identifier);
    document.title = identifier + ' | Uduvudu LinkedBrainz';
  } else {

  }
}

//query
function get_request(query, options) {
  var endPointUrl = 'http://diufpc116.unifr.ch:8890/sparql';
  var uri = 'http://linkedbrainz.org';
  var format = 'text/turtle';
  //        var format = 'application/rdf+xml';
  //        var format = 'text/n3';
  //        var format = 'application/x-json+ld';

  return endPointUrl+'?default-graph-uri='+encodeURIComponent(uri) +
    '&query='+encodeURIComponent(query) +
    '&format='+encodeURIComponent(format);
}


function loadArtist(name, query) {
  var store = new rdf.LdpStore();
  var resource = 'http://linkedbrainz.org/'+name;
  var request = get_request(query.replace(/{artist}/g, name));
  //      request = 'data/result1.n3';

  //console.log(request);
  // load styles (matcher and templates) from files
  var styles = rdf.createGraph();
  var matcher = new rdf.LdpStore();

  $('#templates').load('templates.html');
  /*
     matcher.graph('matcher.ttl', function(graph, error) {
     if (!error) {
     console.debug('matcher.tll loaded')
     styles.addAll(graph);
     }
     });
     */
  /*  var template = new rdf.LdpStore();
      template.graph('templates.ttl', function(graph, error) {
      if (!error) {styles.addAll(graph);}
      }); */


  store.graph(request, function(graph, error) {

    if (error == null) {
      console.debug('successfully loaded ' + graph.toArray().length + ' triples');
      // resource (entry for template search) is same as source in this example
      console.log(graph.toArray());
      uduvudu.process(graph, {
        resource: resource
      }, function(out) {
        // write the result of the processing in the main div
        $('#main').html(out);
      });
    } else {
      $('#main').html('<div class="alert alert-error" role="alert">Error: ' + error + '</div>');
    }
  });

} //end loadArtist

    //loadArtist("Manowar");
//    loadArtist("Madonna");
//type ahead

