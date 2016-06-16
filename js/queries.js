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
  
    FILTER STRSTARTS(LCASE(str(?name)), LCASE("{artist_reg}"))
} LIMIT 10
`;

var search_q= prefixes+`
construct {
  lkb:_ArtistName a mo:MusicArtist;
 lkb:members ?artist_gid.
 
 ?artist_gid a lkb:members;
  foaf:name ?name;
  ov:sortLabel ?slable;
  foaf:isPrimaryTopicOf ?url;
  rdf:type ?type;
  foaf:gender ?gender .
}
where {
 ?artist_gid foaf:name ?name;
  ov:sortLabel ?slable;
  rdf:type ?type.
  
  OPTIONAL {?artist_gid foaf:gender ?gender .}.
   OPTIONAL {?artist_gid foaf:isPrimaryTopicOf ?url.}.

    FILTER STRSTARTS(LCASE(str(?name)), LCASE("{artist_reg}"))
}

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
/*
var count_release = prefixes+`
select count(?release)
  where {
    ?release rdf:type mo:Release.
    {artist_id} foaf:name ?name; foaf:made ?release.
    ?release dc:title ?title.

  } group by ?name
`;

var count_tracks = prefixes+`

select count(?track)
where {
  ?release rdf:type mo:Release.
  ?track rdf:type mo:Track.
  ?record rdf:type mo:Record.
  {artist_id} foaf:name ?name; foaf:made ?release.
  ?release mo:record ?record.
  ?record mo:track ?track.
} Group by ?name
`;

var count_search2 = prefixes+`
select ?track_nb ?release_nb where {
{
  select count(?track) as ?track_nb
  where {
    ?release rdf:type mo:Release.
    ?track rdf:type mo:Track.
    ?record rdf:type mo:Record.
    {artist_id} foaf:name ?name; foaf:made ?release.
    ?release mo:record ?record.
    ?record mo:track ?track.
 } Group by ?name 
} union {
  select count(?release)  as ?release_nb 
    where {
      ?release rdf:type mo:Release.
      {artist_id} foaf:name ?name; foaf:made ?release.
      ?release dc:title ?title.
  } group by ?name
 }

}
`;
var count_search = prefixes+`
select count(*)as ?total
where {
  ?artist_gid foaf:name ?name;
  rdf:type mo:MusicArtist.
  FILTER regex(str(?name), "{artist}", "i")
} 
`;
*/

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
