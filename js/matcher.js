var combineMatchers = [{
  matcherName: "releaseInfo",
  templateVariable: "release",
  abstractTemplate: "release",
  combineIds: ["title", "date", "place"],
  order: 21000
},{
  matcherName: "artistInfo",
  abstractTemplate: "artistInfo",
  combineIds: ["artistType", "gender", "ArtistWiki"],
  order: 82000
}];

var linkMatchers = [{
  matcherName: "releaseLink",
  predicate: "http://linkedbrainz.org/release",
  templateVariable: "releaseLink",
  abstractTemplate: "releaseLink",
  order: 22000,
  linkIds: ["releaseInfo"]
}];


var predicateMatchers = [{
  matcherName: "date",
  predicate: "http://purl.org/dc/elements/1.1/date",
  templateVariable: "date",
  abstractTemplate: "date",
  order: 90000
},{
  matcherName: "label",
  predicate: "http://www.w3.org/2000/01/rdf-schema#label",
  templateVariable: "label",
  abstractTemplate: "label",
  order: 90003
}, {
  matcherName: "title",
  predicate: "http://purl.org/dc/elements/1.1/title",
  templateVariable: "title",
  abstractTemplate: "title",
  order: 90000
}, {
  matcherName: "place",
  predicate: "http://purl.org/NET/c4dm/event.owl#place",
  templateVariable: "place",
  abstractTemplate: "place",
  order: 90000
}, {
  matcherName: "ArtistType",
  predicate: "http://linkedbrainz.org/ArtistType",
  templateVariable: "artistType",
  abstractTemplate: "artistType",
  order: 90000
}, {
  matcherName: "TypeGroup",
  predicate: "http://purl.org/ontology/mo/MusicGroup",
  templateVariable: "TypeGroup",
  abstractTemplate: "TypeGroup",
  order: 90000
},{
  matcherName: "ArtistWiki",
  predicate: "http://xmlns.com/foaf/0.1/isPrimaryTopicOf" ,
  templateVariable: "ArtistWiki",
  abstractTemplate: "ArtistWiki",
  order: 90000
}, { //q2,
  matcherName: "gender",
  predicate: "http://xmlns.com/foaf/0.1/gender" ,
  templateVariable: "gender",
  abstractTemplate: "gender",
  order: 90000
}, {
  matcherName: "releases",
  predicate: "http://musicbrainz.org/release",
  templateVariable: "release",
  abstractTemplate: "release",
  order: 1100000
} 

];


