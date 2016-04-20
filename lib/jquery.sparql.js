(function( $ ) {

  $.fn.query = function(query ,options) {
    if (options) {
      var opts = $.extend( {}, $.fn.defaults, options);
      $.fn.defaults = opts;
    }
    query = this.prefixesAsString() + query;
    var result = $.ajax(
        {
//          processData: false,
          crossDomain: true,
          dataType: 'jsonp',
//          jsonp: false,
//          jsonpCallback: $.fn.localJsonpCallback,
          type: "GET",
//          async: false, 
          contentType: $.fn.defaults.format,

          url: $.fn.defaults.endpoint, 
          data: {
            "query"             : query,
            "format"            : $.fn.defaults.format,
            "default-query-uri" : $.fn.defaults.uri,
            "debug"             : $.fn.defaults.debug,
            "timeout"           : $.fn.defaults.timeout,
          },
          success: function( data) {
            console.log("success");
          },
          error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
          },
        }
        );
      return result;
    //TODO 
  }
	
  $.fn.localJsonpCallback = function() {
    alert('ok');
  }

  $.fn.verbsForObject = function (object) {
    var results = $(this).query('SELECT distinct ?v where {'+object+' ?v ?o.}');
    var verbs = new Array();

    for (i = 0; i < results.length; i++) {
      verbs.push(results[i].v);
    }
    return verbs;
  }

  $.fn.resolvePrefix = function (str) {
    for (i = 0; i < $.fn.defaults.prefixes.length; i++) {
      var prefix = $.fn.defaults.prefixes[i];
      if (str.indexOf(prefix.value) == 0) {
        return prefix.prefix+str.substr(prefix.value.length);
      }
    }
    return str;
  }

  $.fn.prefixesAsString = function () {
    var str = "";
    $.each($.fn.defaults.prefixes, function (key, value) {
      str += "prefix "+key+" <"+value+"> ";
    });
    return str;
  }
	
	// Plugin defaults
// list of query/format are here
//http://virtuoso.openlinksw.com/dataspace/doc/dav/wiki/Main/VOSSparqlProtocol
	$.fn.defaults = {
		"endpoint":"http://diufpc116.unifr.ch:8890/sparql/", //Defualt source to use out of the sources
    "uri"     : "http://linkedbrainz.org", // default-graph-uri
//    "format"  : "text/n3",
//    "format"  : "application/json",
    "format"  : "application/ld+json",
//    "format"  : "application/x-json+ld",
    "debug": "off",
    "timeout": 0,
		"prefixes": {
        "rdfs:" : "http://www.w3.org/2000/01/rdf-schema#",
        "dct:"  : "http://purl.org/dc/terms/",
        "foaf:" : "http://xmlns.com/foaf/0.1/",
        "dc:"   : "http://purl.org/dc/elements/1.1/",
        "mo:"   : "http://purl.org/ontology/mo/",
		}
	};
	
}( jQuery ));
