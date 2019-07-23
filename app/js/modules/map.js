import { placeInfo } from './body';

const mymap = L.map('mapid').setView([52.370216, 4.895168], 13);
let marker;

(function layer () {
  L.tileLayer(
    'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
    {
      attribution:
        "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken:
        'pk.eyJ1IjoiYXJ0aWlrazIiLCJhIjoiY2p5NGNnN3dvMTVlbjNjbXF6YndnY3dpdyJ9.fyu90Ocs8N7dcZchFop_Ow',
    },
  ).addTo(mymap);
}());

export const mapListener = (() => {
  const parsedTable = document.getElementById('parsed-table');
  parsedTable.addEventListener('click', event => mapStruct(event));
})();

function mapStruct ({ target }) {
  try {
    while (target !== this) {
      const id = target.getAttribute('id');
      var information = placeInfo[id];

      if (information) break;
      target = target.parentNode;
    }

    if (marker) marker.remove();
    marker = L.marker([information[4], information[3]])
      .addTo(mymap)
      .bindPopup(target.firstElementChild.innerHTML)
      .openPopup();
    mymap.setView([information[4], information[3]], 13);
  } catch (e) {
    console.log('Doesn\'t have an attribute \'ID\'');
  }
}
