import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import MapmyIndiaGL from 'mapmyindia-map-react-native-beta';
import {DEFAULT_CENTER_COORDINATE} from '../utils/index';

class CameraActvity extends Component {
  moveTo() {
    this.camera.moveWithEloc("MMI000");
  }

  easeTo() {
    this.camera.moveTo([77.2312, 28.8343], 2000);
  }

  animateTo() {
    this.camera.flyTo([77.3453, 28.9633], 2000);
  }

  render() {

    //custom buttons for different features 
    const buttons = (
      <View
        style={{flexDirection: 'row', height: '10%', backgroundColor: 'blue'}}>
        <TouchableOpacity style={style.buttons} onPress={() => this.moveTo()}>
          <Text style={style.text}>Move To</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.buttons}
          onPress={() => this.easeTo()}>
          <Text style={style.text}>Ease To</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.buttons}
          onPress={() => this.animateTo()}>
          <Text style={style.text}>Animate To</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={{flex: 1}}>
        <MapmyIndiaGL.MapView style={{flex: 1}}>
          <MapmyIndiaGL.Camera
            zoomLevel={12}
            ref={c => (this.camera = c)}
            centerCoordinate={DEFAULT_CENTER_COORDINATE}
          />
        </MapmyIndiaGL.MapView>
        {buttons}
      </View>
    );
  }
}

const style = StyleSheet.create({
  buttons: {justifyContent: 'center', alignItems: 'center', flex: 1},
  text:{color: 'white', fontWeight: 'bold'}
});

export default CameraActvity;
