import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import MapmyIndiaGL from 'mapmyindia-map-react-native-beta';

const layerStyles = {
  route: {
    lineColor: 'blue',
    lineCap: "round",
    lineWidth: 3,
    lineOpacity: 0.84,
  },
};

class DrawPolylineActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [77.100462, 28.705436],
            [77.100784, 28.705191],
            [77.101514, 28.704646],
            [77.101171, 28.704194],
            [77.101066, 28.704083],
            [77.101318, 28.7039],
          ],
        },
      },
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MapmyIndiaGL.MapView style={{flex: 1}}>
          <MapmyIndiaGL.Camera
            zoomLevel={16}
            centerCoordinate={[77.100462, 28.705436]}
          />

          <MapmyIndiaGL.ShapeSource id="routeSource" shape={this.state.route}>
            <MapmyIndiaGL.LineLayer id="routeFill" style={layerStyles.route} />
          </MapmyIndiaGL.ShapeSource>
        </MapmyIndiaGL.MapView>
      </View>
    );
  }
}

export default DrawPolylineActivity;
