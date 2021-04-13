import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet,Image} from 'react-native';
import MapmyIndiaGL from 'mapmyindia-map-react-native-beta';
import {DEFAULT_CENTER_COORDINATE} from '../utils/index';
import Toast from 'react-native-simple-toast';
import exampleIcon from '../assets/marker.png';

class MarkerDragging extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <MapmyIndiaGL.MapView
          style={{flex: 1}}>
          <MapmyIndiaGL.Camera
            zoomLevel={12}
            centerCoordinate={DEFAULT_CENTER_COORDINATE}
          />

          <MapmyIndiaGL.PointAnnotation
            id="marker"
            title="xyz"
            draggable={true}
            ref={ref => (this.annotationRef = ref)}      
            coordinate={DEFAULT_CENTER_COORDINATE}>
            <MapmyIndiaGL.Callout title="xyz" />
            <Image
              source={exampleIcon}
              style={{height: 50, width: 50}}
              onLoad={() => this.annotationRef.refresh()}
            />
          </MapmyIndiaGL.PointAnnotation>
        </MapmyIndiaGL.MapView>
      </View>
    );
  }
}

export default MarkerDragging;
