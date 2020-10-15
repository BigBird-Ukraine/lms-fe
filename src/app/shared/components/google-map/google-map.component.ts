import {Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {MapsAPILoader} from '@agm/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  @Input() city: string;
  @Output() coordinates = new EventEmitter<object>();
  statusAddress = false;
  statusCitiesEquals = false;

  latitude: number;
  longitude: number;

  zoom: number;
  private geoCoder;

  @ViewChild('search', {static: false})
  public searchElementRef: ElementRef;


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
  }


  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      // tslint:disable-next-line:new-parens
      this.geoCoder = new google.maps.Geocoder;

      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        componentRestrictions: {country: 'ua'}
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {

          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.getAddress(place.geometry.location.lat(), place.geometry.location.lng());

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  markerDragEnd($event: any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;

    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({location: {lat: latitude, lng: longitude}}, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          const selectedCity = results[0].address_components[3].long_name;
          if (selectedCity === this.city) {
            this.coordinates.emit({latitude, longitude});
            this.statusCitiesEquals = false;
            this.statusAddress = true;
          } else {
            this.statusAddress = false;
            this.statusCitiesEquals = true;
          }
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
}
