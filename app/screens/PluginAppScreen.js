import React from 'react';
import { SafeAreaView, View, createElement, Text } from 'react-native';
import ListView from '../view/ListView';
import MyAppText from '../view/MyAppText';
import ItemView from '../view/ItemView';
import AccelerometerPlugin from './plugins/AccelerometerPlugin';
import ControlMousePlugin from './plugins/ControlMousePlugin';

function PluginAppScreen({ route }) {
    const { plugin } = route.params

    return (
        <SafeAreaView style={{flex: 1}}>
            {
                plugin.name === 'Accelerometer' 
                ? <AccelerometerPlugin/> 
                : plugin.name === 'ControlMouse'
                ? <ControlMousePlugin/>
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