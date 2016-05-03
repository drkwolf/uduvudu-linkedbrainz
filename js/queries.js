var prefixes =`
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dc: <http://purl.org/dc/elements/1.1/> 
PREFIX mo: <http://purl.org/ontology/mo/>
PREFIX event: <http://purl.org/NET/c4dm/event.owl#> 
PREFIX lkb: <http://linkedbrainz.org/>
PREFIX dbpedia: <http://dbpedia.org/resource/>
PREFIX dbpedia-owl: <http://dbpedia.org/ontology/>
`;
var q1 = prefixes +`
construct {
  lkb:{artist} a mo:MusicArtist;
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
  foaf:isPrimaryTopicOf ?url.
  ?artist_gid   rdf:type ?type.
  ?artist_gid foaf:isPrimaryTopicOf ?url.
  OPTIONAL {?artist_gid foaf:gender ?gender .}.
  SERVICE <http://dbpedia.org/sparql> {
         ?dbpedia_url foaf:isPrimaryTopicOf  ?url;
         dbpedia-owl:abstract ?abstract ;
        dbpedia-owl:thumbnail ?thumbnail .

   FILTER (langMatches(lang(?abstract),"fr"))
  }
  ?members mo:member_of ?artist_gid;
  foaf:name ?name;
  foaf:gender ?m_gender.

 FILTER (?type != <http://purl.org/ontology/mo/MusicArtist>)
}
`;

var q2 = prefixes+`
construct {
  lkb:{artist} a  foaf:name;
  lkb:release ?release.

 ?release a lkb:release;
    dc:title ?title;
    dc:date ?date;
    lkb:link ?release;
    event:place ?placeTitle.
}
where {
  ?artist_gid foaf:name '{artist}';
  foaf:made ?release.
  ?release dc:title ?title.
  ?release_event mo:release ?release;
  dc:date ?date;
  event:place ?place.
  ?place rdfs:label ?placeTitle.
} ORDER BY DESC(?date)
`;
var q3= prefixes+`
construct {
  lkb:Manowar a mo:MusicArtist;
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
