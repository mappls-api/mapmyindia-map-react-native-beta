import {
  DirectionsCriteria,
  PlaceOptionsConstants,
} from 'mapmyindia-direction-widget-react-native';

export default class PlaceSettings {
  static myInstance = new PlaceSettings();

  backgroundColor = '#FFFFFF';
  toolbarColor = '#FFFFFF';
  zoom = '0';
  pod = undefined;
  tokenizeAddress = true;
  saveHistory = false;
  historyCount = '0';
  attributionVerticalAlignment = PlaceOptionsConstants.GRAVITY_TOP;
  attributionHorizontalAlignment = PlaceOptionsConstants.GRAVITY_LEFT;
  logoSize = PlaceOptionsConstants.SIZE_SMALL;
  location = [];
  filter = '';

  static getInstance() {
    return this.myInstance;
  }
}
