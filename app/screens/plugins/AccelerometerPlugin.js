import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import ListView from '../../view/ListView';
import { Accelerometer } from 'expo-sensors';
import ItemView from '../../view/ItemView';

function AccelerometerPlugin() {

    const [data, setData] = React.useState({
        x: 0,
        y: 0,
        z: 0,
    })

    const [subscription, setSubscription] = React.useState(null);

    const _slow = () => {
        Accelerometer.setUpdateInterval(1000);
    };

    const _fast = () => {
        Accelerometer.setUpdateInterval(16);
    };

    const _subscribe = () => {
        setSubscription(
            Accelerometer.addListener(result => {
                setData(result);
            })
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    React.useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    const { x, y, z } = data;

    function round(x) {
        return x.toFixed(4)
        return x
    }    

    return (
        <SafeAreaView>
            <ListView title='Accelerometer'>
                <ItemView>x: {round(x)}</ItemView>
                <ItemView>y: {round(y)}</ItemView>
                <ItemView>z: {round(z)}</ItemView>
            </ListView>
            <ListView title='Controller'>
                <ItemView onPress={subscription ? _unsubscribe : _subscribe} title={subscription ? 'On' : 'Off'}>{subscription ? 'On' : 'Off'}</ItemView>
                <ItemView onPress={_slow}>Slow</ItemView>
                <ItemView onPress={_fast}>Fast</ItemView>
            </ListView>
        </SafeAreaView>
    )
}

export default AccelerometerPlugin