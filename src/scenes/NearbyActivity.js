import React, { Component } from 'react';
import { Text, View, FlatList, TextInput } from 'react-native';
import MapmyIndiaGL from 'mapmyindia-map-react-native-beta';
import { DEFAULT_CENTER_COORDINATE } from '../utils/index';
import Mapmyindia from 'mapmyindia-restapi-react-native-beta';
import Toast from 'react-native-simple-toast';
import { points } from '@turf/helpers';
import exampleIcon from '../assets/marker.png';
import { Button, Icon } from 'react-native-elements';

const styles = {
  icon: {
    iconAllowOverlap: false,
    iconOptional: false,
    iconImage: exampleIcon,
    iconAllowOverlap: true,
    iconSize: 0.1,
    textField: 'hello',
    textSize: 14,
    textAnchor: '',
    textColor: 'white',
    textAllowOverlap: false,
    textPadding: 20,
  },
};

class NearbyActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placesList: '',
      visibleList: false,
      iconName: 'list',
      locations: [],
      keyword: "coffee",
      filter: undefined,
      featureCollection: {
        type: 'FeatureCollection',
        features: [],
      },
    };
  }

  async callNearby(latitude, longitude) {
    Toast.show('Please wait...', Toast.SHORT);
    let arr = [];
    let placeArr = [];
    Mapmyindia.atlas_nearby(
      { keywords: this.state.keyword, refLocation: `${latitude},${longitude}`, filter: this.state.filter },
      response => {
        console.log(JSON.stringify(response));

        if (response.suggestedLocations) {

          const suggestedLocation = response.suggestedLocations;
          for (let i = 0; i < suggestedLocation.length; i++) {
            arr.push({
              type: 'Feature',
              id: i,
              properties: {
                placeName: suggestedLocation[i].placeName,
              },
              geometry: {
                coordinates: [
                  suggestedLocation[i].longitude,
                  suggestedLocation[i].latitude,
                ],
                type: 'Point',
              },
            });
            placeArr.push(suggestedLocation[i].placeName);
          }

          this.setState({
            //  locations: arr,
            placesList: placeArr,
            featureCollection: {
              type: 'FeatureCollection',
              features: arr,
            },
          });

        }


        //console.log(this.state.placesList);
      },
    );
  }

  componentDidMount() {
    Toast.show('Tap on map to get nearby ', Toast.SHORT);
  }

  //onPress of mapView
  onPress(event) {
    const { geometry, properties } = event;
    const longitude = geometry.coordinates[0];
    const latitude = geometry.coordinates[1];
    this.setState({
      featureCollection: {
        type: 'FeatureCollection',
        features: [],
      },
    });
    this.callNearby(latitude, longitude);
  }

  //onClick of specific marker
  onMarkerClick(e) {
    const f = e.nativeEvent.payload;
    console.log("marker click "+JSON.stringify(f));
    console.log(f.properties.placeName);
    Toast.show(f.properties.placeName, Toast.SHORT);
  }

  //floating button click
  onfloatingButtonClick() {
    if (this.state.iconName === 'list') {
      this.setState({
        visibleList: true,
        iconName: 'map-marker',
      });
    } else if (this.state.iconName === 'map-marker') {
      this.setState({
        visibleList: false,
        iconName: 'list',
      });
    }
  }

  render() {

    const list =
      this.state.visibleList != false ? (
        <View>
          <FlatList
            data={this.state.placesList}
            keyExtractor={(item, index) => item.key}
            renderItem={dataItem => (
              <Text key={dataItem.item.key}>{dataItem.item}</Text>
            )}
          />
        </View>
      ) : null;

    return (
      <View style={{ flex: 1 }}>
        <MapmyIndiaGL.MapView
          style={{ flex: 1 }}
          onPress={event => this.onPress(event)}>
          <MapmyIndiaGL.Camera
            zoomLevel={15}
            centerCoordinate={DEFAULT_CENTER_COORDINATE}
          />

          <MapmyIndiaGL.ShapeSource
            id="symbolLocationSource"
            onPress={e => this.onMarkerClick(e)}
            hitbox={{ width: 20, height: 20 }}
            shape={this.state.featureCollection}>
            <MapmyIndiaGL.SymbolLayer
              id="symbolLocationSymbols"
              minZoomLevel={1}
              style={{
                iconImage: exampleIcon,
                iconSize: 0.2,
                textField: ['get', 'placeName'],
                iconAnchor: 'top',
                textOffset: [0, -2.0],
                textSize: 12,
                iconAllowOverlap: true,
                textAllowOverlap: false,
                textOptional: true,
                textJustify: 'center',
                textColor: 'black',
                textHaloColor: 'white',
                textHaloWidth: 5,
              }}
            />
          </MapmyIndiaGL.ShapeSource>
        </MapmyIndiaGL.MapView>
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, backgroundColor: 'white' }} >
          <TextInput style={{ padding: 20, marginBottom: 10 }} placeholder='keyword' value={this.state.keyword} onChangeText={(text) => this.setState({ keyword: text })} />
          <TextInput style={{ padding: 20 }} placeholder='filter' value={this.state.filter} onChangeText={(text) => this.setState({ filter: text })} />
        </View>
        {list}
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
                name={this.state.iconName}
                size={35}
                type="font-awesome"
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

export default NearbyActivity;
