import React from 'react';
import { SafeAreaView, View, createElement, Text } from 'react-native';
import ListView from '../view/ListView';
import MyAppText from '../view/MyAppText';
import ItemView from '../view/ItemView';
import AttitudeHeadingReferenceSystemsPlugin from './plugins/AttitudeHeadingReferenceSystemsPlugin';
import ControlMousePlugin from './plugins/ControlMousePlugin';
import GyroscopePlugin from './plugins/GyroscopePlugin';
import MagnetometerPlugin from './plugins/MagnetometerPlugin'
import SensorsPlugin from './plugins/SensorsPlugin';

function PluginAppScreen({ route }) {
    const { plugin } = route.params

    return (
        <SafeAreaView style={{flex: 1}}>
            {
                plugin.name === 'Attitude Heading Reference Systems' 
                ? <AttitudeHeadingReferenceSystemsPlugin/> 
                : plugin.name === 'Sensors'
                ? <SensorsPlugin/>
                : plugin.name === 'Control Mouse'
                ? <ControlMousePlugin/>
                : plugin.name === 'Gyroscope'
                ? <GyroscopePlugin/>
                : plugin.name === 'Magnetometer'
                ? <MagnetometerPlugin/>
                : <FailedToLoad plugin/>
            }
        </SafeAreaView>
    );
}

function FailedToLoad({plugin}) {
    return (
        <ListView title={plugin.name}>
            <ItemView.Error text='Some Error'/>
        </ListView>
    )
}

function PluginApp() {
    return (
        <ListView title='Plugin App'></ListView>
    )
}

export default PluginAppScreen;