import {Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input} from '@angular/core';

// 很重要，不然缩放的时候这2张图片会报404
// import 'node_modules/leaflet/dist/images/marker-icon-2x.png';
// import 'node_modules/leaflet/dist/images/marker-shadow.png';
// import 'src/assets/vendor/leaflet/images/marker-icon.png'
import * as L from 'node_modules/leaflet/dist/leaflet';
import 'node_modules/leaflet.markercluster/dist/leaflet.markercluster';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('map') map: ElementRef;
  @Input() datas: any;

  @Output() loadView = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if ('locs' in this.datas) {
      console.log('ngOnChanges');
      this.initMap(this.datas.locs);
    }
  }

  ngAfterViewInit() {
  }

  initMap(loc: any): void {
    let center = {lat: 37.09023980307208, lng: 100.19531250000001};
    let url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    // let map = L.map('map').setView([center.lat, center.lng], 3);
    let map = L.map(this.map.nativeElement).setView([center.lat, center.lng], 3);
    L.tileLayer(url).addTo(map);
    let markers = L.markerClusterGroup();
    for (let i = 0; i < loc.length; i++) {
      let datas = loc[i];
      let title = datas.name_en;
      // console.log(datas.lat, datas.lon);
      if (datas.lat && datas.lon) {
        // let marker = L.marker(L.LatLng(datas.lat, datas.lon), {
        let marker = L.marker([datas.lat, datas.lon], {
          title: title
        });
        // .addTo(map);
        marker.bindPopup(title);
        markers.addLayer(marker);
      }

    }
    // console.log(map);
    map.addLayer(markers);

    // map.on('click', function(data) {
    //   console.log(map.getCenter());
    // });

  }

}
