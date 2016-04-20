1. get artiste info from dbpedia :
<!:-- Queries 1 -->
 PREFIX dbpedia: <http://dbpedia.org/resource/>
 PREFIX Abs: <http://dbpedia.org/ontology/>
 SELECT ?abstract ?thumbnail,
 WHERE {
       dbpedia:"+artistName+" Abs:abstract ?abstract;
       Abs:thumbnail ?thumbnail .
       filter(langMatches(lang(?abstract) "+lang+"))
 }

2. get artiste releases :
<!--
artist_gid : artiste/gid
release : release/gid
-->
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dc: <http://purl.org/dc/elements/1.1/> 
PREFIX mo: <http://purl.org/ontology/mo/>
PREFIX event: <http://purl.org/NET/c4dm/event.owl#> 

construct {
?release foaf:made ?title;
dc:date ?date;
rdfs:label ?placeTitle.
}
where {
  ?artist_gid foaf:name 'Manowar';
  foaf:made ?release.
  ?release dc:title ?_title.
  ?release_event mo:release ?release;
  dc:date ?_date;
  event:place ?place.
  ?place rdfs:label ?placeTitle.

bind( str(?_date) as ?date )
bind( str(?_title) as ?title )
} GROUP BY ?release


PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dc: <http://purl.org/dc/elements/1.1/> 
PREFIX mo: <http://purl.org/ontology/mo/>

select ?release ?title ?date ?artist_gid
where {
  ?artist_gid foaf:name 'Manowar';
  foaf:made ?release.
  ?release dc:title ?_title.
  ?release_event mo:release ?release;
  dc:date ?_date.

bind( str(?_date) as ?date )
bind( str(?_title) as ?title )
}    
LIMIT 10
[[----]]

3.get album track
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dc: <http://purl.org/dc/elements/1.1/> 
PREFIX mo: <http://purl.org/ontology/mo/>


select ?record ?track ?title ?duration
where {
   <http://musicbrainz.org/release/37e955d4-a53c-45aa-a812-1b23b88dbc13#_> mo:record ?record.
?record mo:track ?track.
?track dc:title ?_title.
?track mo:duration ?_duration.

bind( xsd:integer(?_duration) as ?duration )
bind( str(?_title) as ?title )
}    
LIMIT 10

----
* artist info

PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dc: <http://purl.org/dc/elements/1.1/> 
PREFIX mo: <http://purl.org/ontology/mo/>

select ?artist_gid ?type ?gender ?url
where {
  ?artist_gid foaf:name 'Manowar';
  rdf:type ?type.
  ?artist_gid foaf:isPrimaryTopicOf ?url.
  OPTIONAL {?artist_gid foaf:gender ?gender .}.
}    

----
group groupe [[Membre]]

PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dc: <http://purl.org/dc/elements/1.1/> 
PREFIX mo: <http://purl.org/ontology/mo/>

select ?members ?gender ?name
where {
  bind(<http://musicbrainz.org/artist/65f4f0c5-ef9e-490c-aee3-909e7ae6b2ab#_> as ?artist_gid)

  ?artist_gid rdf:type mo:MusicGroup.
  ?members mo:member_of ?artist_gid.
  ?members foaf:name ?name;
  foaf:gender ?gender.
}  


----
3. get external url about artiste

select ?url
where {
    ?artist_gid rdfs:label "artiste_name";
    rdfs:seeAlso ?url.
}
----

5. artiste twiter :
select ?twiter
where {
    ?artist_gid rdfs:label "artiste_name";
    foaf:account ?twiter.
}
