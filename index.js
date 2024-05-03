/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import {name as appName} from './app.json';

<<<<<<< HEAD
import './src/translations/i18'

import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn'
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
ZegoUIKitPrebuiltCallService.useSystemCallingUI([ZIM, ZPNs]);

=======
>>>>>>> 16d62ec8c383bb71477951b93e23bb2b41441ebf
AppRegistry.registerComponent(appName, () => App);
