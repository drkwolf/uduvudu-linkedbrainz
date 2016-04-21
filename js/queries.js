var prefixes =`
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dc: <http://purl.org/dc/elements/1.1/> 
PREFIX mo: <http://purl.org/ontology/mo/>
PREFIX event: <http://purl.org/NET/c4dm/event.owl#> 
PREFIX lkb: <http://linkedbrainz.org/>
`;
var q1 = prefixes +`
construct {
  lkb:{artist} a mo:MusicArtist;
      lkb:ArtistType ?type;
      foaf:isPrimaryTopicOf ?url;
      foaf:gender ?gender.
}
where {
  ?artist_gid foaf:name '{artist}';
  rdf:type ?type.
    ?artist_gid foaf:isPrimaryTopicOf ?url.
    OPTIONAL {?artist_gid foaf:gender ?gender .}.
    FILTER (?type != <http://purl.org/ontology/mo/MusicArtist>)
}`;

var q2 = prefixes+`
construct {
  lkb:{artist} a  foaf:name;
  lkb:release ?release.

 ?release a lkb:release;
    dc:title ?title;
    dc:date ?date;
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
}
`;

