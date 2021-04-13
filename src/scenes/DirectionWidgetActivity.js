import React from 'react';
import {View, Button} from 'react-native';
import DirectionSettings from '../singletons/DirectionSettings';
import MapmyindiaDirectionWidget, {
  DirectionsCriteria,
  PlaceOptionsConstants,
} from 'mapmyindia-direction-widget-react-native';
import Toast from 'react-native-simple-toast';
import {getFormattedDistance, getFormattedDuration} from '../utils/Utils';

 

class DirectionWidgetActivity extends React.Component {

  openDirection = async () => {
    let instance = DirectionSettings.getInstance();
    console.log(instance.destination);

    try {
      const data = await MapmyindiaDirectionWidget.openDirectionWidget({
        showStartNavigation: instance.showStartNavigation,
        steps: instance.steps,
        showAlternative: instance.showAlternative,
        profile: instance.profile,
        overview: instance.overview,
        attributions: instance.attributions,
        excludes: instance.excludes,
        destination: instance.destination,
        resource: instance.resource,
        searchPlaceOption: {
          location: instance.location,
          backgroundColor: instance.backgroundColor,
          toolbarColor: instance.toolbarColor,
          zoom: parseInt(instance.zoom),
          pod: instance.pod,
          tokenizeAddress: instance.tokenizeAddress,
          saveHistory: instance.saveHistory,
          historyCount: parseInt(instance.historyCount),
          attributionHorizontalAlignment:
            instance.attributionHorizontalAlignment,
          attributionVerticalAlignment: instance.attributionVerticalAlignment,
          logoSize: instance.logoSize,
          filter: instance.filter,
        },
      });
      instance.destination = {};
      console.log(JSON.stringify(data));
      let duration = data.directionsResponse.routes[0].duration;
      let distance = data.directionsResponse.routes[0].distance;
        Toast.show(
          `Duration: ${getFormattedDuration(
            duration,
          )}, Distance: ${getFormattedDistance(distance)}`,
          Toast.SHORT,
        );
        
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          title="Open Direction Widget"
          onPress={() => this.openDirection()}
        />
      </View>
    );
  }
}

DirectionWidgetActivity.navigationOptions = {
  title: 'Hello!',
};

export default DirectionWidgetActivity;
