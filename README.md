
![MapmyIndia APIs](https://www.mapmyindia.com/api/img/mapmyindia-api.png)

# Mapmyindia Maps SDK for React Native beta

**Easy To Integrate Maps & Location APIs & SDKs For Web & Mobile Applications**

Powered with India's most comprehensive and robust mapping functionalities.
**Now Available**  for Srilanka, Nepal, Bhutan and Bangladesh

1. For further information contact MapmyIndia here:
Email: [apisupport@mapmyindia.com](mailto:apisupport@mapmyindia.com).
2. You can get your api key to be used in this document here: [https://www.mapmyindia.com/api/signup](https://www.mapmyindia.com/api/signup)
3. The beta code is provided to help you understand the basic functionality of MapmyIndia maps APIs working on React Native development platform.

## Version History

| Version | Last Updated | Author |
| ---- | ---- | ---- |
| 0.1.0 | March 2021 |MapmyIndia API Team ([Mohammad Akram](https://github.com/mdakram), [Robin Kukreja] |
| 0.0.15 | February 2021 |MapmyIndia API Team ([Mohammad Akram](https://github.com/mdakram), [Robin Kukreja] |
| 0.0.14 | February 2021 | MapmyIndia API Team ([Mohammad Akram](https://github.com/mdakram), [Robin Kukreja](https://github.com/spacekingindia)) |
| 0.0.13 | January 2021 | MapmyIndia API Team ([Mohammad Akram](https://github.com/mdakram), [Robin Kukreja](https://github.com/spacekingindia)) |
## What is Mapmyindia?

Mapmyindia is the location data platform for mobile and web applications. We provide [building blocks](https://www.mapmyindia.com/) to add location features like maps, search, and navigation into any experience you create. Use our simple and powerful APIs & SDKs for interactivity and control.

## Sign up for Mapmyindia

Not a Mapmyindia user yet? [Sign up for an account here](https://www.mapmyindia.com/api/signup). Once you’re signed in, all you need to start building is a Mapmyindia key. Use this same short code with all of our interactive mapping libraries, JavaScript SDKs, and directly against our REST APIs. You can create and manage your access tokens on your [Mapmyindia Account page](https://www.mapmyindia.com/api/dashboard).

## API Usage
Your MapmyIndia Maps SDK usage needs a set of license keys ([get them here](http://www.mapmyindia.com/api/signup) ) and is governed by the API [terms and conditions](https://www.mapmyindia.com/api/terms-&-conditions).
As part of the terms and conditions, you cannot remove or hide the MapmyIndia logo and copyright information in your project.
Please see [branding guidelines](https://www.mapmyindia.com/api/advanced-maps/API-Branding-Guidelines.pdf) on MapmyIndia [website](https://www.mapmyindia.com/api) for more details.
The allowed SDK hits are described on the plans page. Note that your usage is
shared between platforms, so the API hits you make from a web application, Android app or an iOS app all add up to your allowed daily limit.


## Installation

**Dependencies**

* [node](https://nodejs.org)
* [npm](https://www.npmjs.com/)
* [React Native](https://facebook.github.io/react-native/):  recommended version 0.60 or greater

**npm**
```
  npm install mapmyindia-map-react-native-beta --save
```

## Installation Guides

* [iOS](https://github.com/mappls-api/mapmyindia-map-react-native-beta/wiki/iOSInstall)
* [Android](https://github.com/mappls-api/mapmyindia-map-react-native-beta/wiki/android_install)

## How to Add a MapView

~~~javascript
import React, { Component } from "react";
import {View } from "react-native";
import  MapmyIndiaGL  from  'mapmyindia-map-react-native-beta';

MapmyIndiaGL.setMapSDKKey("");//place your mapsdkKey
MapmyIndiaGL.setRestAPIKey("");//your restApiKey
MapmyIndiaGL.setAtlasClientId("");//your atlasClientId key
MapmyIndiaGL.setAtlasClientSecret(""); //your atlasClientSecret key
MapmyIndiaGL.setAtlasGrantType("");


export default class App extends Component {
  render() {
    return (
      <View style={{flex:1}}>
          <MapmyIndiaGL.MapView style={{flex:1}} >
		  <MapmyIndiaGL.Camera
                ref={c  => (this.camera = c)}
                zoomLevel={12}
                minZoomLevel={4}
                maxZoomLevel={22}
                centerCoordinate={[77.231409,28.6162]}
                 />
		 </MapmyIndiaGL.MapView>
      </View>
    );
  }
}
~~~

## Documentation

### Components
* [MapView](https://github.com/mappls-api/mapmyindia-map-react-native-beta/wiki/MapView)
* [Light](https://github.com/mappls-api/mapmyindia-map-react-native-beta/wiki/Light)
* [PointAnnotation](https://github.com/mappls-api/mapmyindia-map-react-native-beta/wiki/PointAnnotation)
* [Callout](https://github.com/mappls-api/mapmyindia-map-react-native-beta/wiki/Callout)
*  [Camera](https://github.com/mappls-api/mapmyindia-map-react-native-beta/wiki/Camera)
* [UserLocation](https://github.com/mappls-api/mapmyindia-map-react-native-beta/wiki/UserLocation)
*  [Images](https://github.com/mappls-api/mapmyindia-map-react-native-beta/wiki/Images)

### Sources
* [ShapeSource](https://github.com/mappls-api/mapmyindia-map-react-native-beta/wiki/ShapeSource)
*  [VectorSource](https://github.com/mappls-api/mapmyindia-map-react-native-beta/wiki/VectorSource)
* [RasterSource](https://github.com/mappls-api/mapmyindia-map-react-native-beta/wiki/RasterSource)

### Layers
* [BackgroundLayer](https://github.com/mappls-api/mapmyindia-map-react-native-beta/wiki/BackgroundLayer)
* [CircleLayer](https://github.com/mappls-api/mapmyindia-map-react-native-beta/wiki/CircleLayer)
* [FillLayer](https://github.com/mappls-api/mapmyindia-map-react-native-beta/wiki/FillLayer)
* [LineLayer](https://github.com/mappls-api/mapmyindia-map-react-native-beta/wiki/LineLayer)
* [SymbolLayer](https://github.com/mappls-api/mapmyindia-map-react-native-beta/wiki/SymbolLayer)

## IMPORTANT

>To read further, please refer to documentation available here: [https://github.com/mappls-api/mapmyindia-map-react-native-beta/wiki](https://github.com/mappls-api/mapmyindia-map-react-native-beta/wiki)

For any queries and support, please contact:

![Email](https://www.google.com/a/cpanel/mapmyindia.co.in/images/logo.gif?service=google_gsuite)
Email us at [apisupport@mapmyindia.com](mailto:apisupport@mapmyindia.com)

![](https://www.mapmyindia.com/api/img/icons/stack-overflow.png)
[Stack Overflow](https://stackoverflow.com/questions/tagged/mapmyindia-api)
Ask a question under the mapmyindia-api

![](https://www.mapmyindia.com/api/img/icons/support.png)
[Support](https://www.mapmyindia.com/api/index.php#f_cont)
Need support? contact us!

![](https://www.mapmyindia.com/api/img/icons/blog.png)
[Blog](http://www.mapmyindia.com/blog/)
Read about the latest updates & customer stories


> © Copyright 2021. CE Info Systems Pvt. Ltd. All Rights Reserved. | [Terms & Conditions](http://www.mapmyindia.com/api/terms-&-conditions)

