
require([
"esri/map",
"dojo/on",
"dijit/layout/TabContainer",
"dijit/layout/ContentPane",
"dijit/layout/BorderContainer",], 
function(
    Map,
    on,
    TabContainer,
    ContentPane,
    BorderContainer){

        var mimapa = new Map ("map", {
            basemap: "osm"

        });

        /*mimapa.on("load", function(evt){
            mimapa.resize();
            mimapa.reposition();
        })*/

    })