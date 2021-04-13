import React, {Component} from 'react';
import {validateCoordinates} from '../utils/Validate';
import {View, TextInput, Button, Keyboard} from 'react-native';
import MapmyIndiaGL from 'mapmyindia-map-react-native-beta';
import Mapmyindia from 'mapmyindia-restapi-react-native-beta';
import {DEFAULT_CENTER_COORDINATE} from '../utils/index';
import Toast from 'react-native-simple-toast';

class ReverseGeoCodeActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      logitude: '',
      markerLat: '',
      markerLng: '',
      label: '',
      center: [77.61234, 27.61234],
    };
  }

  componentDidMount() {
    Toast.show('press on map to call revgeocode api', Toast.SHORT);
    //this.revGeoCodeApi(27.61234, 77.61234);
  }

  revGeoCodeApi(latitude, longitude) {
    Mapmyindia.rev_geocode({lat: latitude, lng: longitude}, response => {
      console.log(response);
      Toast.show(response.results[0].formatted_address, Toast.SHORT);
      this.setState({
        label: response.results[0].formatted_address,
      });
    });
  }

  onClick() {
    const latitude = this.state.latitude;
    const logitude = this.state.logitude;
    if (validateCoordinates(logitude, latitude)) {
      this.revGeoCodeApi(latitude, logitude);
      this.setState({
        markerLat: parseFloat(latitude),
        markerLng: parseFloat(logitude),
        center: [parseFloat(logitude), parseFloat(latitude)],
      });
      //this.moveCamera(latitude, logitude);
      Keyboard.dismiss();
    }
  }

  moveCamera(latitude, longitude) {
    this.camera.moveTo([longitude, latitude]);
  }

  onPress = event => {
    const {geometry, properties} = event;
    const longitude = geometry.coordinates[0];
    const latitude = geometry.coordinates[1];
    // Toast.show("Longitude :"+longitude+" Latitude :"+latitude,Toast.SHORT);
    this.setState({
      markerLat: parseFloat(latitude),
      markerLng: parseFloat(longitude),
      //center:[parseFloat(logitude),parseFloat(latitude)]
    });
    this.revGeoCodeApi(latitude, longitude);
  };

  render() {
    const marker =
      this.state.markerLat != ''&&this.state.markerLng!='' ? (
        <MapmyIndiaGL.PointAnnotation
          id="markerId"
          title="Marker"
          coordinate={[this.state.markerLng, this.state.markerLat]}>
          <MapmyIndiaGL.Callout title={this.state.label} />
        </MapmyIndiaGL.PointAnnotation>
      ) : null;

    return (
      <View style={{flex: 1}}>
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingLeft: 1,
            paddingRight: 1,
          }}>
          <TextInput
            keyboardType="decimal-pad"
            placeholder="Latitude"
            style={{borderWidth: 1, borderRadius: 4}}
            onChangeText={text => this.setState({latitude: text})}
          />
          <TextInput
            keyboardType="decimal-pad"
            placeholder="Longitude "
            style={{borderWidth: 1, borderRadius: 4}}
            onChangeText={text => this.setState({logitude: text})}
          />
          <Button title="call reversegeocode" onPress={() => this.onClick()} />
        </View> */}
        <MapmyIndiaGL.MapView style={{flex: 1}} onPress={e => this.onPress(e)}>
          <MapmyIndiaGL.Camera
            zoomLevel={12}
            ref={c => (this.camera = c)}
            centerCoordinate={this.state.center}
          />
          {marker}
        </MapmyIndiaGL.MapView>
      </View>
    );
  }
}

export default ReverseGeoCodeActivity;
