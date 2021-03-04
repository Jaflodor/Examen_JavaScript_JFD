var mimapa;
require([
"esri/map",
"dojo/on",
"dojo/dom",
"dijit/layout/TabContainer",
"dijit/layout/ContentPane",
"dijit/layout/BorderContainer",
"esri/layers/FeatureLayer",
"esri/dijit/Scalebar",
"esri/dijit/BasemapToggle",
"esri/tasks/ServiceAreaTask",
"esri/tasks/ServiceAreaParameters",
"esri/graphic",
"esri/tasks/query",
"esri/symbols/SimpleFillSymbol",
"esri/symbols/SimpleLineSymbol",
"esri/Color",
"dojo/_base/array",
"esri/tasks/ServiceAreaSolveResult"


], 
function(
    Map,
    on,
    dom,
    TabContainer,
    ContentPane,
    BorderContainer,
    FeatureLayer,
    Scalebar,
    Toggle,
    ServiceAreaTask,
    ServiceAreaParameters,
    graphic,
    query,
    SimpleFillSymbol,
    SimpleLineSymbol,
    Color,
    arrayUtils,
    serviceAreaSolveResult
    ){

        esriConfig.defaults.io.proxyUrl = "/proxy/"

        var mimapa = new Map ("mapa", {
            basemap: "satellite",
            zoom: 12,
            center: [-3.70256 ,40.4165 ],

        });

        /*Introducimos la feature layer*/

        var centros_salud = "https://services6.arcgis.com/Rd3IgMmWThaCHouh/arcgis/rest/services/Centros_Salud/FeatureServer/0"    

        

        var capa_centros_salud = new FeatureLayer (centros_salud)

        mimapa.addLayer(capa_centros_salud); 
        
        
        /*Introducimos los widgets*/        
        

        var barra_escala = new Scalebar ({
            
            map: mimapa,            
            scalebarStyle: "ruler"
        });

        var toggle = new Toggle({
            map: mimapa,
            basemap: "dark-gray"},
            
            "toggle");
            toggle.startup();
    

                /*-----------Hacemos una query para obtener el FeatureSet de entidades de la FeatureLayer-------------------*/

        var consulta = new query("https://services6.arcgis.com/Rd3IgMmWThaCHouh/arcgis/rest/services/Centros_Salud/FeatureServer/0")

        
        consulta.where= "1=1"

        var hospitales = capa_centros_salud.queryFeatures(consulta)

        capa_centros_salud.on("query-features-complete", mostrar)

        /*on(dojo.byId("boton"), "click", analisis)*/
        

        function mostrar (evt){

            console.log(evt)
            
            var area_servicio = new ServiceAreaTask ("https://formacion.esri.es/server/rest/services/RedMadrid/NAServer/Service%20Area")
    
            var parametros_area_servicio = new ServiceAreaParameters ();
            parametros_area_servicio.outSpatialReference = mimapa.spatialReference
            parametros_area_servicio.facilities = evt
            parametros_area_servicio.defaultBreaks= [10,20,30]
            parametros_area_servicio.splitLinesAtBreaks= true
            parametros_area_servicio.impedanceAttribute = " TiempoCoche"

            area_servicio.solve(parametros_area_servicio, pintar_poligono(serviceAreaSolveResult))

            function pintar_poligono() {

                var poligonos = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([255,0,0]), 2),new Color([255,255,0,0.25])
                );

                 

                


            }




        };

        


        

    })    

        