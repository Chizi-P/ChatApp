import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Button } from 'react-native'
import MyAppText from '../view/MyAppText'
import { Accelerometer } from 'expo-sensors';

function PluginScreen() {

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

    return (
        <SafeAreaView>
            <MyAppText>Accelerometer :</MyAppText>
            <MyAppText>
                x: {round(x)} y: {round(y)} z: {round(z)}
            </MyAppText>
            <View>
                <Button onPress={subscription ? _unsubscribe : _subscribe} title={subscription ? 'On' : 'Off'} />
                <Button onPress={_slow} title='Slow' />
                <Button onPress={_fast} title='Fast' />
            </View>
        </SafeAreaView>
    );
}

function round(x) {
    return x.toFixed(4)
    return x
}

export default PluginScreen;