/* global React, mapboxgl */
mapboxgl.accessToken = localStorage.accessToken;

// initialize map
var map = new mapboxgl.Map({
  container: 'map',
  zoom: 12,
  center: [43.6579, -79.3712],
  style: 'https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v7.json'
});

// add gl-draw controls
map.addControl(new mapboxgl.Navigation({
  position: 'top-left'
}));

map.addControl(mapboxgl.Draw());

class App extends React.Component { // eslint-disable-line

  constructor() {
    super();
    this.state = {
      geojson: {
        type: 'FeatureCollection',
        features: []
      }
    };
  }

  componentWillMount() {
    map.on('draw.feature.update', e => {
      this.setState({ geojson: e.geojson });
    });
  }

  setMap(e) {
    this.setState({ geojson: JSON.parse(e.target.value) });
  }

  render() {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <textarea
          type='text'
          style={{ height: '100%', width: '100%' }}
          onChange={this.setMap}
          value={JSON.stringify(this.state.geojson, null, 4)}
        >
        </textarea>
      </div>
    );
  }

}

React.render(<App />, document.getElementById('geojson'));
