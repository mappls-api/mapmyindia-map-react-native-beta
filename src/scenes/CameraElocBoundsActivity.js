import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import MapmyIndiaGL from 'mapmyindia-map-react-native-beta';
import {DEFAULT_CENTER_COORDINATE} from '../utils/index';

class CameraElocBoundsActvity extends Component {
  fitBounds() {
    console.log('fit bounds clicked');
   this.camera.fitBoundsWithEloc(['1T182A', 'MMI000', '122L55','11KDVO'],50,100);
  }

  render() {
    //custom buttons for different features
    const buttons = (
      <View
        style={{flexDirection: 'row', height: '10%', backgroundColor: 'blue'}}>
        <TouchableOpacity style={style.buttons} onPress={() => this.fitBounds()}>
          <Text style={style.text}>Fit Bounds</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={{flex: 1}}>
        <MapmyIndiaGL.MapView style={{flex: 1}}>
          <MapmyIndiaGL.Camera
            zoomLevel={14}
            ref={c => (this.camera = c)}
            centerELoc="MMI000"
          />
          <MapmyIndiaGL.PointAnnotation id="1" eLoc="MMI000" />
          <MapmyIndiaGL.PointAnnotation id="2" eLoc="1T182A" />
          <MapmyIndiaGL.PointAnnotation id="3" eLoc="122L55" />
          <MapmyIndiaGL.PointAnnotation id="3" eLoc="11KDVO" />
        </MapmyIndiaGL.MapView>
        {buttons}
      </View>
    );
  }
}

const style = StyleSheet.create({
  buttons: {justifyContent: 'center', alignItems: 'center', flex: 1},
  text: {color: 'white', fontWeight: 'bold'},
});

export default CameraElocBoundsActvity;
