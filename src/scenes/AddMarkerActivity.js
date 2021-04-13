import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import MapmyIndiaGL from 'mapmyindia-map-react-native-beta';
import {DEFAULT_CENTER_COORDINATE} from '../utils/index';

import Toast from 'react-native-simple-toast';
import {Alert} from 'react-native';

class AddMarkerActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: DEFAULT_CENTER_COORDINATE,
    };
  }

  onPress(event) {
    const {geometry, properties} = event;
    let longitude = geometry.coordinates[0];
    let latitude = geometry.coordinates[1];
    this.setState({
      location: [longitude, latitude],
    });
    // Toast.show(this.state.label,Toast.SHORT);
  }

  render() {
    const HackMarker = ({children}) =>
      Platform.select({
        ios: children,
        android: (
          <Text
            style={{
              lineHeight: 88, // there is some weird gap, add 40+ pixels
              backgroundColor: '#dcdcde',
            }}>
            {children}
          </Text>
        ),
      });

    return (
      <View style={{flex: 1}}>
        <MapmyIndiaGL.MapView
          style={{flex: 1}}
          onPress={event => this.onPress(event)}
          onMapError={error =>console.log(error)}>
          <MapmyIndiaGL.Camera
            zoomLevel={12}
            centerCoordinate={DEFAULT_CENTER_COORDINATE}
          />

          <MapmyIndiaGL.PointAnnotation
            id="markerId"
            title="Marker"
            coordinate={this.state.location}>
            <MapmyIndiaGL.Callout title="xyz" />
          </MapmyIndiaGL.PointAnnotation>
        </MapmyIndiaGL.MapView>
      </View>
    );
  }

  _onMapError(error) {
    console.log(error),
      Alert.alert('Error', error.message, [
        {text: 'OK', onPress: () => this.mapView.loadMap()},
      ]);
  }
}

export default AddMarkerActivity;
