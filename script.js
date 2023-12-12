// display variables
var displayMap;
var view;
var gL;
var graphicsLayer;
var url;
var arrayOfDisplayedGraphics = [
  {
    CurrentMethod: "point",
    LocationName: "Location 1",
    LocationPoints: [2883671.710763707, 4670243.505248234],
    Color: "Yellow",
    Data: {
      Id: 1,
      ProjectName: "Project 1",
      SideName: "dd",
      ContractorName: "dd",
      camera: "data",
      IsFuture: true,
    },
  },
  {
    CurrentMethod: "point",
    LocationName: "Location 1",
    LocationPoints: [4783671.710763707, 1370243.505248234],
    Color: "red",
    Data: {
      Id: 6,
      ProjectName: "Project 1",
      SideName: "dd",
      ContractorName: "dd",
      camera: "data",
      IsFuture: true,
    },
  },
  {
    CurrentMethod: "polygon",
    LocationName: "Location 1",
    LocationPoints: [
      [2783671.710763707, 4670243.505248234],
      [2183671.710763707, 4570243.505248234],
      [2283671.710763707, 4370243.505248234],
      [2783671.710763707, 4670243.505248234],
    ],
    Color: "Green",
    Data: {
      Id: 2,
      ProjectName: "Project 2",
      SideName: "polygon",
      ContractorName: "polyg",
      camera: "data",
      IsFuture: false,
    },
  },
];
var sarr = [
  {
    CurrentMethod: "point",
    LocationName: "Location 1",
    LocationPoints: [2583671.710763707, 4370243.505248234],
    Color: "Yellow",
    Data: {
      Id: 64,
      ProjectName: "Project 1",
      SideName: "ggf",
      ContractorName: "dd",
      camera: "data",
    },
  },
  {
    CurrentMethod: "point",
    LocationName: "Location 2",
    LocationPoints: [2583671.710763707, 5370243.505248234],
    Color: "blue",
    Data: {
      Id: 33,
      ProjectName: "Project 2",
      SideName: "vv",
      ContractorName: "dcsa",
      camera: "data",
    },
  },
  {
    CurrentMethod: "point",
    LocationName: "Location 3",
    LocationPoints: [8583671.710763707, 7370243.505248234],
    Color: "green",
    Data: {
      Id: 24,
      ProjectName: "Project 3",
      SideName: "cv",
      ContractorName: "bb",
      camera: "data",
    },
  },
  {
    CurrentMethod: "point",
    LocationName: "Location 4",
    LocationPoints: [4583671.710763707, 2370243.505248234],
    Color: "red",
    Data: {
      Id: 55,
      ProjectName: "Project 4",
      SideName: "ew",
      ContractorName: "xc",
      camera: "data",
    },
  },
];
var pointGraphic;
var polygonGraphic;
var polylineGraphic;
var gra;
var N = 6;

function loadModule(moduleName) {
  return new Promise((resolve, reject) => {
    require([moduleName], (module) => {
      if (module) {
        resolve(module);
      } else {
        reject(new Error(`Module not found: ${moduleName}`));
      }
    }, (error) => {
      reject(error);
    });
  });
}

async function initializeMap() {
  try {
    if (!view) {
      const [esriConfig, Map, MapView, intl, GraphicsLayer, KMLLayer, FeatureLayer] = await Promise.all(
        [
          loadModule("esri/config"),
          loadModule("esri/Map"),
          loadModule("esri/views/MapView"),
          loadModule("esri/intl"),
          loadModule("esri/layers/GraphicsLayer"),
        ]
      );

      intl.setLocale("ar");
      esriConfig.apiKey = "AAPK756f006de03e44d28710cb446c8dedb4rkQyhmzX6upFiYPzQT0HNQNMJ5qPyO1TnPDSPXT4EAM_DlQSj20ShRD7vyKa7a1H";

      displayMap = new Map({
        basemap: "dark-gray-vector",
      });

      view = new MapView({
        // center: [31.233334, 30.033333], // longitude, latitude, centered on Egypt
        center: [42.515378351097986, 24.23433841501793], // longitude, latitude, centered on SA
        container: "displayMap",
        map: displayMap,
        zoom: 6,
      });

      gL = new GraphicsLayer({
        title: "المشاريع",
      });
      displayMap.add(gL);

      // const glLayerView = await view.whenLayerView(gL);
      // glLayerView.highlightOptions = {
      //   color: "#39ff14",
      //   haloOpacity: 0.9,
      //   fillOpacity: 0
      // };

      graphicsLayer = new GraphicsLayer({
        title: "طبـقة الرسـم",
      });
      displayMap.add(graphicsLayer);

      await view.when();

      //add widgets
      addWidgets()
        .then(([view, displayMap]) => {
          console.log("Widgets Returned From Require Scope", view, displayMap);
          // You can work with the view object here
        })
        .catch((error) => {
          // Handle any errors here
        });

      //intiate graphics
      getGraphics(arrayOfDisplayedGraphics)
        .then(([view, displayMap, gL]) => {
          console.log("gL Returned From Require Scope", gra);

          // You can work with the view object here
        })
        .catch((error) => {
          // Handle any errors here
        });

      view.when(function () {
        view.goTo(
          {
            target: gra,
            // zoom: 13
          },
          { duration: 4000 }
        );
      });
    }
    return [view, displayMap, gL]; // You can return the view object
  } catch (error) {
    console.error("Error initializing map:", error);
    throw error; // Rethrow the error to handle it further, if needed
  }
}

// calling
initializeMap()
  .then(() => {
    console.log("Map Returned From Require Scope", displayMap);
    // You can work with the view object here
  })
  .catch((error) => {
    // Handle any errors here
  });


async function addWidgets() {
    try {
      // await initializeMap();
  
      const [
        BasemapGallery,
        Expand,
        ScaleBar,
        AreaMeasurement2D,
        Search,
        Home,
        LayerList,
      ] = await Promise.all([
        loadModule("esri/widgets/BasemapGallery"),
        loadModule("esri/widgets/Expand"),
        loadModule("esri/widgets/ScaleBar"),
        loadModule("esri/widgets/AreaMeasurement2D"),
        loadModule("esri/widgets/Search"),
        loadModule("esri/widgets/Home"),
        loadModule("esri/widgets/LayerList"),
      ]);
  
      var basemapGallery = new BasemapGallery({
        view: view,
      });
  
      var Expand22 = new Expand({
        view: view,
        content: basemapGallery,
        expandIcon: "basemap",
        group: "top-right",
        // expanded: false,
        expandTooltip: "معرض خريطة الأساس",
        collapseTooltip: "اغلاق",
      });
      view.ui.add([Expand22], { position: "manual", index: 6 });
  
      var scalebar = new ScaleBar({
        view: view,
        unit: "metric",
      });
      view.ui.add(scalebar, "bottom-right");
  
      var search = new Search({
        //Add Search widget
        view: view,
      });
      view.ui.add(search, { position: "top-left", index: 0 }); //Add to the map
  
      var homeWidget = new Home({
        view: view,
      });
      view.ui.add(homeWidget, "top-left");
  
      var layerList = new LayerList({
        view: view,
        // listItemCreatedFunction: function (event) {
        //   var item = event.item;
        //   // displays the legend for each layer list item
        //   item.panel = {
        //     content: "legend",
        //   };
        // },
        // showLegend: true
      });
      var Expand5 = new Expand({
        view: view,
        content: layerList,
        expandIcon: "layers",
        group: "top-right",
        // expanded: false,
        expandTooltip: "قائمة الطبقات",
        collapseTooltip: "اغلاق",
      });

      view.ui.add([Expand5], { position: "top-right", index: 6 });
      // view.ui.add([Expand4], { position: "top-left", index: 3 });

      await view.when();
      return [view, displayMap]; // You can return the view object
    } catch (error) {
      console.error("Error initializing map:", error);
      throw error; // Rethrow the error to handle it further, if needed
    }
}

async function getGraphics(arrayOfDisplayedGraphics) {
  try {
    const [Graphic, reactiveUtils, Color] = await Promise.all([
      loadModule("esri/Graphic"),
      loadModule("esri/core/reactiveUtils"),
      loadModule("esri/Color"),
    ]);

    // sidePoint = [arrayOfDisplayedGraphics[0].Side[0], arrayOfDisplayedGraphics[0].Side[1], arrayOfDisplayedGraphics[0].Side[2]];

    gL.removeAll();
    var detailsAction = {
      title: "اضغط لعرض التفاصيل",
      id: "details",
      className: "esri-icon-right-arrow-circled",
    };

    var popupTemplate = {
      title: "بيانات المشروع",
      content: [
        {
          type: "fields",
          fieldInfos: [
            {
              fieldName: "اسم المشروع",
            },
            {
              fieldName: "اسم الجهة",
            },
            {
              fieldName: "نوع المشروع",
            },
            {
              fieldName: "اسم الموقع",
            },
          ],
        },
      ],
      actions: [detailsAction],
    };

    let filteredGrWithCoords = arrayOfDisplayedGraphics.filter((item) => {
      if (item.LocationPoints?.length > 0) return item;
      else return undefined;
    });
    for (var l = 0; l < filteredGrWithCoords.length; l++) {
      var objData = filteredGrWithCoords[l].Data;
      var valuesObj = Object.values(objData);

      if (filteredGrWithCoords[l].CurrentMethod === "point") {
        const intializePoint = {
          //Create a point
          type: filteredGrWithCoords[l].CurrentMethod,
          x: filteredGrWithCoords[l].LocationPoints[0],
          y: filteredGrWithCoords[l].LocationPoints[1],
          spatialReference: {
            wkid: 3857, // Assuming the coordinates are in Web Mercator (WKID 3857)
          },
        };
        const stringColor = filteredGrWithCoords[l].Color;
        const toRgbaColor = new Color(stringColor).toRgba();
        toRgbaColor[3] = 0.5; // Set the alpha value to 0.5 (50% transparency)
        const simpleMarkerSymbolPoint = {
          type: "simple-marker",
          color: toRgbaColor,
          outline: {
            color: [255, 255, 255], // White
            width: 1,
          },
        };
        pointGraphic = new Graphic({
          geometry: intializePoint,
          symbol: simpleMarkerSymbolPoint,
        });

        var attributesPoints = {
          "اسم المشروع": valuesObj[1],
          "اسم الجهة": valuesObj[2],
          "نوع المشروع": valuesObj[3],
          "اسم الموقع": valuesObj[4],
          id: valuesObj[0],
          IsFuture: valuesObj[5],
          type: filteredGrWithCoords[l].CurrentMethod,
        };

        pointGraphic.attributes = attributesPoints;
        pointGraphic.popupTemplate = popupTemplate;

        gL.add(pointGraphic);
      } else if (filteredGrWithCoords[l].CurrentMethod === "polygon") {
        const intializePolygon = {
          //Create a point
          type: filteredGrWithCoords[l].CurrentMethod,
          rings: filteredGrWithCoords[l].LocationPoints,
          spatialReference: {
            wkid: 3857, // Assuming the coordinates are in Web Mercator (WKID 3857)
          },
        };
        const stringColor = filteredGrWithCoords[l].Color;
        const toRgbaColor = new Color(stringColor).toRgba();
        toRgbaColor[3] = 0.5; // Set the alpha value to 0.5 (50% transparency)
        const simpleFillSymbolPolygon = {
          type: "simple-fill",
          color: toRgbaColor,
          outline: {
            color: [255, 255, 255], // White
            width: 1,
          },
        };
        polygonGraphic = new Graphic({
          geometry: intializePolygon,
          symbol: simpleFillSymbolPolygon,
        });

        var attributesPolygons = {
          "اسم المشروع": valuesObj[1],
          "اسم الجهة": valuesObj[2],
          "نوع المشروع": valuesObj[3],
          "اسم الموقع": valuesObj[4],
          id: valuesObj[0],
          IsFuture: valuesObj[5],
          type: filteredGrWithCoords[l].CurrentMethod,
        };

        polygonGraphic.attributes = attributesPolygons;
        polygonGraphic.popupTemplate = popupTemplate;

        gL.add(polygonGraphic);
      } else if (filteredGrWithCoords[l].CurrentMethod === "polyline") {
        const intializePolyline = {
          //Create a point
          type: filteredGrWithCoords[l].CurrentMethod,
          paths: filteredGrWithCoords[l].LocationPoints,
          spatialReference: {
            wkid: 3857, // Assuming the coordinates are in Web Mercator (WKID 3857)
          },
        };
        const stringColor = filteredGrWithCoords[l].Color;
        const toRgbaColor = new Color(stringColor).toRgba();
        toRgbaColor[3] = 0.5; // Set the alpha value to 0.5 (50% transparency)
        const simpleLineSymbolPolyline = {
          type: "simple-line",
          color: toRgbaColor,
          outline: {
            color: [255, 255, 255], // White
            width: 1,
          },
        };
        polylineGraphic = new Graphic({
          geometry: intializePolyline,
          symbol: simpleLineSymbolPolyline,
        });

        var attributesPolylines = {
          "اسم المشروع": valuesObj[1],
          "اسم الجهة": valuesObj[2],
          "نوع المشروع": valuesObj[3],
          "اسم الموقع": valuesObj[4],
          id: valuesObj[0],
          IsFuture: valuesObj[5],
          type: filteredGrWithCoords[l].CurrentMethod,
        };

        polylineGraphic.attributes = attributesPolylines;
        polylineGraphic.popupTemplate = popupTemplate;

        gL.add(polylineGraphic);
      }
    }

    reactiveUtils.on(
      () => view.popup,
      "trigger-action",
      (event) => {
        if (event.action.id === "details") {
          const attr = view.popup.selectedFeature.attributes;
          console.log(attr);
          if (attr) {
            if (attr.IsFuture === true) {
              var info = "/Projects/GetFutureProjectByID/" + attr.id;
              window.open(info.trim());
            } else {
              var info = "/Projects/ViewProject/" + attr.id;
              window.open(info.trim());
            }
          }
        }
      }
    );

    gra = gL.graphics;
    console.log(gra);
    await view.when();
    return gra; // You can return the view object
  } catch (error) {
    console.error("Error initializing map:", error);
    throw error; // Rethrow the error to handle it further, if needed
  }
}
















