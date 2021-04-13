import React, {Component} from 'react';
import {
  View,
  TextInput,
  Button,
  Keyboard,
} from 'react-native';
import MapmyIndiaGL from 'mapmyindia-map-react-native-beta';
import Mapmyindia from 'mapmyindia-restapi-react-native-beta';
import Toast from 'react-native-simple-toast';

class GeoCodeActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      lat: 0,
      lng: 0,
      label: '',
    };
  }

  async componentDidMount() {
    this.geoCodeApi('lucknow');
  }

  geoCodeApi(placeName) {
    Mapmyindia.atlas_geocode({address: placeName}, response => {
      const longitude = response.copResults.longitude;
      const latitude = response.copResults.latitude;
      const eLoc = response.copResults.eLoc;
      this.setState({
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      });
      console.log(response);

      Toast.show(
        `Longitude :${longitude} Latitude :${latitude} Eloc :${eLoc}`,
        Toast.LONG,
      );
      this.setState({
        label: response.copResults.formattedAddress,
      });
    });
  }

  onClick() {
    if (this.state.query.trim().length > 0) {
      this.setState({
        markerLat: this.state.lat,
        markerLng: this.state.lng,
      });
      this.geoCodeApi(this.state.query);
      Keyboard.dismiss();
      // this.moveCamera(this.state.lng,this.state.lat);
    } else {
      Toast.show('please enter some value');
    }
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 1,
            paddingRight: 1,
          }}>
          <TextInput
            placeholder="Enter address to get geocode details "
            style={{borderWidth: 1, borderRadius: 4,height:40,padding:10,margin:5,minWidth:200}}
            onChangeText={text => this.setState({query: text})}
          />
          <Button title="call geocode" onPress={() => this.onClick()} />
        </View>
        <MapmyIndiaGL.MapView style={{flex: 1}}>
          <MapmyIndiaGL.Camera
            zoomLevel={12}
            ref={c => (this.camera = c)}
            centerCoordinate={[this.state.lng, this.state.lat]}
          />

          <MapmyIndiaGL.PointAnnotation
            id="markerId"
            title="Marker"
            coordinate={[this.state.lng, this.state.lat]}>
            <MapmyIndiaGL.Callout title={this.state.label} />
          </MapmyIndiaGL.PointAnnotation>
        </MapmyIndiaGL.MapView>
      </View>
    );
  }
}

export default GeoCodeActivity;
