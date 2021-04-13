import React, {Component} from 'react';
import {
  Platform,
  Text,
  View,
} from 'react-native';
import MapmyIndiaGL from 'mapmyindia-map-react-native-beta';
import {DEFAULT_CENTER_COORDINATE} from '../utils/index';
import Toast from 'react-native-simple-toast';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {Button,Icon} from 'react-native-elements'

class CurrentLocationActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gpsState: false,
    };
  }

  componentDidMount() {
    MapmyIndiaGL.locationManager.start();
    Toast.show("To get current location press my location button ",Toast.LONG);
 
  }

  componentWillUnmount() {
    MapmyIndiaGL.locationManager.dispose();
  }

  onUpdate(location) {
   
    console.log(location);
    const {latitude, longitude, accuracy} = location.coords;

    this.camera.moveTo([longitude, latitude]);
    this.camera.zoomTo(10, 1000);
  }

  onfloatingButtonClick(){
     if(Platform.OS == "android") {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then(data => {
        this.setState({
          gpsState: true,
        });
      })
      .catch(err => {
        Toast.show('Please enable gps.');
      });
    } else {
      this.setState({
        gpsState: true,
      });
    }
  }

  render() {
    const locationComponent = this.state.gpsState ? (
      <MapmyIndiaGL.UserLocation
        animated={true}
        visible={true}
        onUpdate={location => this.onUpdate(location)}
      />
    ) : null;

    return (
      <View style={{flex: 1}}>
        <MapmyIndiaGL.MapView style={{flex: 1}}>
          <MapmyIndiaGL.Camera
            ref={c => (this.camera = c)}
            zoomLevel={4}
            centerCoordinate={DEFAULT_CENTER_COORDINATE}
          />
          {locationComponent}
        </MapmyIndiaGL.MapView>
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: 'transparent',
            position: 'absolute',
            top: '80%',
            left: '80%',
            zIndex: 10,
          }}>
          <Button
            icon={
              <Icon
                name='my-location'
                size={35}
                color="white"
              />
            }
            onPress={() => this.onfloatingButtonClick()}
          />
        </View>
      </View>
    );
  }
}
export default CurrentLocationActivity;
