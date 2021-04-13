import React, {Component} from 'react';
import {Text, View, Keyboard, Modal, Button} from 'react-native';
import MapmyIndiaGL from 'mapmyindia-map-react-native-beta';
import Mapmyindia from 'mapmyindia-restapi-react-native-beta';
import {DEFAULT_CENTER_COORDINATE} from '../utils/index';
import Toast from 'react-native-simple-toast';
import {TextInput} from 'react-native-gesture-handler';
import exampleIcon from '../assets/marker.png';
import {validateCoordinates} from '../utils/Validate';

class GetDistance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: '',
      duration: '',
      source: '90.33687,23.470314',
      dest: '90.497009,23.546286',
      markerSourceCoordinates: [90.33687, 23.470314],
      markerDestCoordinates: [90.497009, 23.546286],
      markerSourceEloc:null,
      markerDestEloc:null,
      isVisible: false,
    };
  }

  componentDidMount() {
    console.log(this.state.markerSourceCoordinates instanceof Array);;
    this.getDistanceApi('90.33687,23.470314', '90.497009,23.546286');
  }

  getDistanceApi(sourceData, destinationData) {
    const sourceCoordinates = this.state.source.split(',');
    const destinationCoordinates = this.state.dest.split(',');
    Mapmyindia.distance_matrix(
      {source: sourceData, destinations: destinationData},
      response => {
        console.log(response);
        if (response.results) {
          const sourceCoordinates = this.state.source.split(',');
          const destinationCoordinates = this.state.dest.split(',');
          this.setState({
            distance: this.getFormattedDistance(
              response.results.distances[0][1],
            ),
            duration: this.getFormattedDuration(
              response.results.durations[0][1],
            ),
          });
        } else {
          Toast.show('No data found', Toast.SHORT);
        }
      },
    );
  }

  getFormattedDistance(distance) {
    if (distance / 1000 < 1) {
      return distance + 'mtr.';
    }
    let dis = distance / 1000;
    dis = dis.toFixed(2);
    return dis + 'Km.';
  }

  getFormattedDuration(duration) {
    let min = parseInt((duration % 3600) / 60);
    let hours = parseInt((duration % 86400) / 3600);
    let days = parseInt(duration / 86400);
    if (days > 0) {
      return (
        days +
        ' ' +
        (days > 1 ? 'Days' : 'Day') +
        ' ' +
        hours +
        ' ' +
        'hr' +
        (min > 0 ? ' ' + min + ' ' + 'min.' : '')
      );
    } else {
      return hours > 0
        ? hours + ' ' + 'hr' + (min > 0 ? ' ' + min + ' ' + 'min' : '')
        : min + ' ' + 'min.';
    }
  }

  onClick() {
    if (this.state.source.includes(',') && this.state.dest.includes(',')) {
      const sourceCoordinates = this.state.source.split(',');
      const destinationCoordinates = this.state.dest.split(',');

      this.setState({
        markerSourceCoordinates: [
          parseFloat(sourceCoordinates[0]),
          parseFloat(sourceCoordinates[1]),
        ],
        markerDestCoordinates: [
          parseFloat(destinationCoordinates[0]),
          parseFloat(destinationCoordinates[1]),
        ],
        markerDestEloc:null,
        markerSourceEloc:null
      });

      if (
        validateCoordinates(sourceCoordinates[0], sourceCoordinates[1]) &&
        validateCoordinates(
          destinationCoordinates[0],
          destinationCoordinates[1],
        )
      ) {
        Keyboard.dismiss();
        this.getDistanceApi(this.state.source, this.state.dest);
        this.camera.fitBounds(
          [parseFloat(sourceCoordinates[0]), parseFloat(sourceCoordinates[1])],
          [
            parseFloat(destinationCoordinates[0]),
            parseFloat(destinationCoordinates[1]),
          ],
          70,
        );
      }
    } else {
      if (!this.state.source.includes(',') && !this.state.dest.includes(',')) {
        console.log("eloc method");
        this.setState({
          markerSourceCoordinates: null,
          markerDestCoordinates: null,
          markerDestEloc:this.state.dest.trim(),
          markerSourceEloc:this.state.source.trim()
        });
        this.getDistanceApi(this.state.source, this.state.dest);
        this.camera.fitBoundsWithEloc([this.state.source, this.state.dest],50);
      } else {
        if (this.state.source.includes(',') && !this.state.dest.includes(',')) {
          const sourceCoordinates = this.state.source.split(',');
          this.camera.setCamera({
            centerELoc:this.state.dest,
            zoomLevel:15,
            animationDuration:200
          })
          this.setState({
            markerSourceCoordinates: [
              parseFloat(sourceCoordinates[0]),
              parseFloat(sourceCoordinates[1]),
            ],
            markerSourceEloc:null,
            markerDestCoordinates: null,
            markerDestEloc:this.state.dest.trim()
          });
        } else {
          const destinationCoordinates = this.state.dest.split(',');
           this.camera.setCamera({
             centerELoc: this.state.source,
             zoomLevel: 15,
             animationDuration: 200,
           });
          this.setState({
            markerSourceCoordinates: null,
            markerDestEloc:null,
            markerSourceEloc:this.state.source.trim(),
            markerDestCoordinates: [
              parseFloat(destinationCoordinates[0]),
              parseFloat(destinationCoordinates[1]),
            ],
          });
        }
        this.getDistanceApi(this.state.source, this.state.dest);
      }
      // Toast.show(
      //   'please provide source and destination coordinates separated with comma(,)',
      //   Toast.LONG,
      // );
    }

    this.setState({
      isVisible: false,
    });
  }

  render() {
    const destMarker = (
        <MapmyIndiaGL.PointAnnotation
          id="destM"
          coordinate={this.state.markerDestCoordinates}
          eLoc={this.state.markerDestEloc}
        />
      );

    const soruceMarker = (
        <MapmyIndiaGL.PointAnnotation
          id="sourceM"
          coordinate={this.state.markerSourceCoordinates}
          eLoc={this.state.markerSourceEloc}
        />
      );

    const customDataView = (
      <Modal
        transparent={true}
        animationType="fade"
        onRequestClose={() => this.setState({isVisible: false})}
        visible={this.state.isVisible}>
        <View
          style={{
            marginLeft: 10,
            marginRight: 10,
            elevation: 5,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 5,
            borderWidth: 1,
            borderColor: 'blue',
            backgroundColor: 'white',
            borderRadius: 5,
            top: '30%',
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'column', flex: 1}}>
            <TextInput
              placeholder="Source:Lng,Lat OR Eloc"
              style={{borderWidth: 1, margin: 3, borderRadius: 5, padding: 10}}
              onChangeText={text =>
                this.setState({
                  source: text.trim(),
                })
              }
            />
            <TextInput
              placeholder="Destination:Lng,Lat OR Eloc"
              style={{borderWidth: 1, margin: 3, borderRadius: 5, padding: 10}}
              onChangeText={text =>
                this.setState({
                  dest: text.trim(),
                })
              }
            />
          </View>
          <Button
            title="get Distance"
            style={{flex: 1}}
            onPress={() => this.onClick()}
          />
        </View>
      </Modal>
    );

    return (
      <View style={{flex: 1}}>
        <Button
          title="get distance with custom data"
          onPress={() => this.setState({isVisible: true})}
        />
        {customDataView}
        <MapmyIndiaGL.MapView style={{flex: 1}}>
          <MapmyIndiaGL.Camera
            zoomLevel={10}
            ref={c => (this.camera = c)}
            centerCoordinate={[90.40687, 23.500314]}
          />

          {soruceMarker}
          {destMarker}
        </MapmyIndiaGL.MapView>
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            height: '10%',
            alignItems: 'center',
            paddingLeft: 5,
          }}>
          <Text style={{color: 'red'}}>{this.state.distance}</Text>
          <Text>({this.state.duration})</Text>
        </View>
      </View>
    );
  }
}

export default GetDistance;
