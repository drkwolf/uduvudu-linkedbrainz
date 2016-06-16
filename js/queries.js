var prefixes =`
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dc: <http://purl.org/dc/elements/1.1/> 
PREFIX mo: <http://purl.org/ontology/mo/>
PREFIX event: <http://purl.org/NET/c4dm/event.owl#> 
PREFIX lkb: <http://linkedbrainz.org/>
PREFIX dbpedia: <http://dbpedia.org/resource/>
PREFIX dbpedia-owl: <http://dbpedia.org/ontology/>
PREFIX ov: <http://open.vocab.org/terms/>
`;
var search_hint =prefixes+`
construct {
  lkb:hints foaf:name ?name.
}
where {
 ?artist_gid foaf:name ?name;
  rdf:type ?type.
  
    FILTER STRSTARTS(LCASE(str(?name)), LCASE("{artist}"))
} LIMIT 10
`;

var q1 = prefixes +`
construct {
  lkb:_ArtistName a mo:MusicArtist;
      lkb:artistName '{artist}';
      lkb:ArtistType ?type;
      foaf:isPrimaryTopicOf ?url;
      foaf:gender ?gender;
      dbpedia-owl:abstract ?abstract ;
      dbpedia-owl:thumbnail ?thumbnail;
      lkb:members ?members.
     
  ?members a lkb:members;
    foaf:name ?name;
    foaf:gender ?m_gender.
}
where {
  ?artist_gid foaf:name '{artist}';
  rdf:type ?type.
  OPTIONAL {?artist_gid foaf:gender ?gender .}.
  OPTIONAL {
	  ?artist_gid foaf:isPrimaryTopicOf ?url.
  SERVICE <http://dbpedia.org/sparql> {
         ?dbpedia_url foaf:isPrimaryTopicOf  ?url;
         dbpedia-owl:abstract ?abstract ;
        dbpedia-owl:thumbnail ?thumbnail .

   FILTER (langMatches(lang(?abstract),"en"))
  }
}
  OPTIONAL {
  ?members mo:member_of ?artist_gid;
    foaf:name ?name;
    foaf:gender ?m_gender.
  }

 FILTER (?type != <http://purl.org/ontology/mo/MusicArtist>)
}
`;

var q2 = prefixes+`
construct {
  lkb:_ArtistName a  foaf:name;
  lkb:release ?release.

 ?release a lkb:release;
    dc:title ?title;
    dc:date ?date;
    lkb:link ?release;
    event:place ?placeTitle.
}
where {
  ?artist_gid foaf:name '{artist}'; foaf:made ?release.
  ?release dc:title ?title.
  ?release_event mo:release ?release; dc:date ?date; event:place ?place.
  ?place rdfs:label ?placeTitle.
} ORDER BY DESC(?date) 
  Limit 40
`;

var q3_track= prefixes+`
construct {
  lkb:_ArtistName a mo:MusicArtist;
    lkb:track ?track.

  ?track a lkb:track;
    dc:title ?_title;
    mo:duration ?_duration.
}
where {
<{release}> dc:title ?r_title;
mo:record ?record.
?record mo:track ?track.
?track dc:title ?_title;
 mo:duration ?_duration.

bind( xsd:integer(?_duration) as ?duration )
bind( str(?_title) as ?title )
} 
`;

var q3= prefixes+`
construct {
lkb:_ArtistName a mo:MusicArtist;
    lkb:track ?track.

  ?track a lkb:track;
    dc:title ?_title;
    dc:title ?r_title;
    mo:duration ?_duration.
}
where {
  ?artist_gid foaf:name '{artist}'; foaf:made ?release.
  ?release mo:record ?record; dc:title ?r_title.
  ?record mo:track ?track.
  ?track dc:title ?_title; mo:duration ?_duration.

  bind( xsd:integer(?_duration) as ?duration )
  bind( str(?_title) as ?title )

} Limit {limit} offset {offset}
`;

var q5 = prefixes+`
construct{
	   lkb:_ArtistName a foaf:name;
	   rdfs:seeAlso ?seeAlso;
	   rdfs:comment ?comment.
	}
	           
	where {
	     ?artist_gid foaf:name '{artist}'.
	    {?artist_gid rdfs:seeAlso ?seeAlso} UNION {?artist_gid rdfs:comment ?comment} 
	   
}
`;
