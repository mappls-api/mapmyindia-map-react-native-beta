import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import MapmyIndiaGL from 'mapmyindia-map-react-native-beta';
import {DEFAULT_CENTER_COORDINATE} from '../utils/index';
import Toast from 'react-native-simple-toast';

class MapLongTapActivity extends Component {


  onLongPress(event){
     const {geometry,properties} =event;
      const longitude=geometry.coordinates[0];
      const latitude=geometry.coordinates[1];
      Toast.show("Longitude :"+longitude+" Latitude :"+latitude,Toast.SHORT);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MapmyIndiaGL.MapView style={{flex: 1}} onLongPress={(event)=>this.onLongPress(event)}>
          <MapmyIndiaGL.Camera
            zoomLevel={12}
            centerCoordinate={DEFAULT_CENTER_COORDINATE}
          />
        </MapmyIndiaGL.MapView>
      </View>
    );
  }
}

export default MapLongTapActivity;
