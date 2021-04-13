import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import MapmyIndiaGL from 'mapmyindia-map-react-native-beta';
import {DEFAULT_CENTER_COORDINATE} from '../utils/index';
import Toast from 'react-native-simple-toast';
import {point} from '@turf/helpers'
import exampleIcon from '../assets/marker.png';

const styles = {
    icon: {
      iconImage: exampleIcon,
      iconAllowOverlap: true,
      iconSize:0.2,
      iconAnchor:'bottom'
    },
  };

class CustomMarkerActivity extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <MapmyIndiaGL.MapView
          style={{flex: 1}}>
          <MapmyIndiaGL.Camera
            zoomLevel={12}
            centerCoordinate={DEFAULT_CENTER_COORDINATE}
          />

          <MapmyIndiaGL.ShapeSource
            id="symbolLocationSource"
            shape={point(DEFAULT_CENTER_COORDINATE)}>
            <MapmyIndiaGL.SymbolLayer
              id="symbolLocationSymbols"
              minZoomLevel={1}
              style={styles.icon}
            />
          </MapmyIndiaGL.ShapeSource>
        </MapmyIndiaGL.MapView>
      </View>
    );
  }
}

export default CustomMarkerActivity;
