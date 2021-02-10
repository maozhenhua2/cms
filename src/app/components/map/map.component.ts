import {Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input} from '@angular/core';

import 'node_modules/leaflet/dist/leaflet';
import 'node_modules/leaflet.markercluster/dist/leaflet.markercluster';
//  方法1
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// import 'src/assets/vendor/leaflet/images/marker-icon.png';
// import 'src/assets/vendor/leaflet/images/marker-icon-2x.png';
// import 'src/assets/vendor/leaflet/images/marker-shadow.png';

// 方法2
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('map') map: ElementRef;
  @Input() datas: any = [];

  @Output() loadView = new EventEmitter<any>();

  constructor() {
    // this.patchLeafletMarker(L);
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    // if ('locs' in this.datas) {
    //   console.log('ngOnChanges');
    //   this.initMap(this.datas.locs);
    // }
    if (this.datas.length) {
      this.initMap(this.datas);
    }
  }

  ngAfterViewInit() {
  }

  initMap(loc: any): void {
    // let center = {lat: 37.09023980307208, lng: 100.19531250000001};
    let center = {lat: 38.90937971951893, lng: 1.4337331758275254};
    let url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    // let map = L.map('map').setView([center.lat, center.lng], 3);
    let map = L.map(this.map.nativeElement).setView([center.lat, center.lng], 12);
    L.tileLayer(url).addTo(map);
    let markers = L.markerClusterGroup();
    // markers.addLayer(L.marker(new L.LatLng(center.lat, center.lng), {
    //   title: ''
    // }));
    for (let i = 0; i < loc.length; i++) {
      let datas = loc[i];
      let title = datas.name_en;
      // console.log(datas.lat, datas.lon);
      if (datas.lat && datas.lon) {
        // let marker = L.marker(L.LatLng(datas.lat, datas.lon), {
        let marker = L.marker(new L.LatLng(datas.lat, datas.lon), {
          title: title
        });
        marker.bindPopup(title);
        markers.addLayer(marker);
      }

    }
    // console.log(map);
    map.addLayer(markers);

    map.on('click', function(data) {
      console.log(data, map.getCenter());
    });

  }

  // patchLeafletMarker(L) {
  //   let Icon = L.Icon;
  //   let IconDefault = Icon.Default;
  //
  //   function getStyle(el, style) {
  //     let value = el.style[style] || (el.currentStyle && el.currentStyle[style]);
  //
  //     if ((!value || value === 'auto') && document.defaultView) {
  //       let css = document.defaultView.getComputedStyle(el, null);
  //       value = css ? css[style] : null;
  //     }
  //     return value === 'auto' ? null : value;
  //   }
  //
  //   // @function create(tagName: String, className?: String, container?: HTMLElement): HTMLElement
  //   // Creates an HTML element with `tagName`, sets its class to `className`, and optionally appends it to `container` element.
  //   function create$1(tagName, className, container) {
  //     let el = document.createElement(tagName);
  //     el.className = className || '';
  //
  //     if (container) {
  //       container.appendChild(el);
  //     }
  //     return el;
  //   }
  //
  //   IconDefault.prototype._getIconUrl = function(name) {
  //     if (!IconDefault.imagePath) {
  //       // Deprecated, backwards-compatibility only
  //       let path = this._detectIconPath(name);
  //       // Compatible with webpack
  //       // Don't attach data url onto IconDefault.imagePath
  //       if (path.indexOf('data:image/') === 0) {
  //         return path;
  //       }
  //       IconDefault.imagePath = path;
  //     }
  //
  //     // @option imagePath: String
  //     // `Icon.Default` will try to auto-detect the location of the
  //     // blue icon images. If you are placing these images in a non-standard
  //     // way, set this option to point to the right path.
  //     return ((this.options.imagePath || IconDefault.imagePath) + Icon.prototype._getIconUrl.call(this, name));
  //   };
  //
  //   IconDefault.prototype._detectIconPath = function(name) {
  //     let el = create$1('div', 'leaflet-default-marker-' + name, document.body);
  //     let path = getStyle(el, 'background-image') || getStyle(el, 'backgroundImage'); // IE8
  //
  //     document.body.removeChild(el);
  //
  //     if (path === null || path.indexOf('url') !== 0) {
  //       path = '';
  //     } else {
  //       // Compatible with webpack
  //       path = path.replace(/^url\((["']?)(.+?)(marker-(icon|shadow)\.png)?\1\)/, '$2');
  //     }
  //
  //     return path;
  //   };
  //   // CSS
  //   let css = [
  //     `.leaflet-default-marker-icon {background-image: url(${markerIcon});}`,
  //     `.leaflet-default-marker-icon-2x {background-image: url(${markerIcon2x});}`,
  //     `.leaflet-default-marker-shadow {background-image: url(${markerShadow});}`
  //   ].join('\n');
  //   const style = create$1('style', null, document.head);
  //   style.setAttribute('data-type', 'leaflet-marker-patch');
  //   style.appendChild(document.createTextNode(css));
  // }

}


