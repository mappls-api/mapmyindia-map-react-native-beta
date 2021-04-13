import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import MapmyIndiaGL from 'mapmyindia-map-react-native-beta';
import {DEFAULT_CENTER_COORDINATE} from '../utils/index';
import exampleIcon from '../assets/marker.png';
import Toast from 'react-native-simple-toast';

class AddElocMarkerActivity extends Component {
  



  render() {
    return (
      <View style={{flex: 1}}>
        <MapmyIndiaGL.MapView
          style={{flex: 1}}>
          <MapmyIndiaGL.Camera zoomLevel={15} centerELoc="MMI000" />

          <MapmyIndiaGL.PointAnnotation
            id="markerId"
            title="Marker"
            eLoc="MMI000">

            <MapmyIndiaGL.Callout title="xyz" />
          </MapmyIndiaGL.PointAnnotation>
        </MapmyIndiaGL.MapView>
      </View>
    );
  }
}

export default AddElocMarkerActivity;
