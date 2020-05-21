import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { loadModules } from 'esri-loader';

let Map = null;
let MapView = null;
let Graphic = null;
let GraphicsLayer = null;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;
  view: any;
  map: any;

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  async initMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      [Map, MapView, Graphic, GraphicsLayer] = await loadModules(['esri/Map', 'esri/views/MapView',
        'esri/Graphic', 'esri/layers/GraphicsLayer'
      ]);
      console.log('ha', Map);

      // Configure the Map
      const mapProperties = {
        basemap: 'streets'
      };

      this.map = new Map(mapProperties);

      // Initialize the MapView
      const mapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: [0.1278, 51.5074],
        zoom: 10,
        map: this.map
      };

      this.view = new MapView(mapViewProperties);

      // this.addPoint(0.1278, 51.5074);

      return this.view;
    } catch (error) {
      console.log('error load map', error);
    }
  }

  addPoint() {
    try {
      const graphicLayer = new GraphicsLayer();
      this.map.add(graphicLayer);

      const simpleMarkerSymbol = {
        type: 'simple-marker',
        color: [226, 119, 40],  // orange
        outline: {
          color: [255, 255, 255], // white
          width: 1
        }
      };

      const point = {
        type: 'point',
        longitude: 0.1278,
        latitude: 51.5074
      };

      const pointGraphic = new Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol
      });

      graphicLayer.add(pointGraphic);

      // return this.map;
    } catch (error) {
      console.log('error', error);
    }
  }
}
