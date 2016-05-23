function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function msToTime(duration) {
  var //milliseconds = parseInt((duration%1000)/100),
     seconds = parseInt((duration/1000)%60)
    , minutes = parseInt((duration/(1000*60))%60)
    , hours = parseInt((duration/(1000*60*60))%24);

  var time= "";
  if(hours > 9) {
    time = hours + ':';
  } else if (hours > 0) {
    time = "0" + hours +":";
  }

  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return time  + minutes + ":" + seconds
}

function loadQ3(event, ele) {
  var identifier = unescape(location.hash.slice(2));
  var link  = $(ele).attr('link');
  var q = q3_track.replace(/{release}/g, link)  ;
//   $('[data-tab=q3]').parent().addClass('active').siblings().removeClass('active')
   p = loadArtist(identifier, q, $('#q3'));
   p.then(function(finished){
   $('#release-modal-title').text($(ele).text());

     $('[role=duration]').each(function () {
       duration =msToTime($(this).text());
       $(this).text(duration);
     });
     $('#release-modal').modal('show');


   });
         console.log($(ele).text());
}

function hashUrlHandler() {
  if (location.hash) {
    var identifier =unescape( location.hash.slice(2));
    loadArtist(identifier, q1, $('#q1'), false);
      $('#q1').addClass('active').siblings('[data-tab]').removeClass('active');
    $('#identifier-search').val(identifier);
    document.title = identifier + ' | Uduvudu LinkedBrainz';
  } else {

  }
}

function get_count(query, artist) {

 query = query.replace(/{artist}/g, artist);
 var request = get_request(query, false);
 var store = new rdf.LdpStore();
 var resource = 'http://linkedbrainz.org/_ArtistName';
 var total = 0;

 var promise = new Promise(function(resolve, reject) {
   store.graph(request, function(graph, error) {
     if (error == null) {
       console.debug('successfully loaded ' + graph.toArray().length + ' triples');
       console.log(graph.toArray());
       total = graph.toArray()[3].object.valueOf();
       resolve(total);
     } else {
       //TODO showErro
     }
   });
 });
  return promise;
}

//query
function get_request(query, service, format) {
  var endPointUrl = 'http://diufpc116.unifr.ch:8890/sparql';
  var uri = 'http://linkedbrainz.org';
  if(!service) uri = '';
  var format = format || 'text/turtle';
  //        var format = 'application/rdf+xml';
  //        var format = 'text/n3';
  //        var format = 'application/x-json+ld';

  return endPointUrl+'?default-graph-uri='+encodeURIComponent(uri) +
    '&query='+encodeURIComponent(query) +
    '&format='+encodeURIComponent(format);
}


function loadArtist(name, query, elem, service) {
  if (service === undefined) {
    service = false;
  }
  var store = new rdf.LdpStore();
  var resource = 'http://linkedbrainz.org/_ArtistName';

  query = query.replace(/{artist}/g, name);
  
  var request = get_request(query, service);
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


 var promise = new Promise(function(resolve, reject) {
  store.graph(request, function(graph, error) {

    if (error == null) {
      //console.debug('successfully loaded ' + graph.toArray().length + ' triples');
      // resource (entry for template search) is same as source in this example
      //console.log(graph.toArray());
      uduvudu.process(graph, {
        resource: resource
      }, function(out) {
        // write the result of the processing in the main div
        elem.html(out);
        resolve(true);
      });
    } else {
//      $('#main').html('<div class="alert alert-error" role="alert">Error: ' + error + '</div>');
    }
  });
});
  return promise;

} //end loadArtist


