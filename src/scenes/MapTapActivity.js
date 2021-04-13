import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import MapmyIndiaGL from 'mapmyindia-map-react-native-beta';
import {DEFAULT_CENTER_COORDINATE} from '../utils/index';
import Toast from 'react-native-simple-toast';

class MapTapActivity extends Component {


  onPress(event){
     const {geometry,properties} =event;
      const longitude=geometry.coordinates[0];
      const latitude=geometry.coordinates[1];
      Toast.show("Longitude :"+longitude+" Latitude :"+latitude,Toast.SHORT);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MapmyIndiaGL.MapView style={{flex: 1}} onPress={(event)=>this.onPress(event)}>
          <MapmyIndiaGL.Camera
            zoomLevel={12}
            ref={c => (this.camera = c)}
            centerCoordinate={DEFAULT_CENTER_COORDINATE}
          />
        </MapmyIndiaGL.MapView>
      </View>
    );
  }
}

export default MapTapActivity;
