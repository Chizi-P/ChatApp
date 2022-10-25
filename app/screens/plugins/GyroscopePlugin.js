import React from 'react';
import { SafeAreaView } from 'react-native';
import ListView from '../../view/ListView';
import { Gyroscope } from 'expo-sensors';
import ItemView from '../../view/ItemView';
import { useAppContext } from '../../../AppContext';

function GyroscopePlugin(props) {

    const ws = useAppContext().ws

    const [data, setData] = React.useState({
        x: 0,
        y: 0,
        z: 0,
    })

    const [subscription, setSubscription] = React.useState(null);

    const _slow = () => {
        Gyroscope.setUpdateInterval(1000);
    };

    const _fast = () => {
        Gyroscope.setUpdateInterval(16);
    };

    const _subscribe = () => {
        setSubscription(
            Gyroscope.addListener(result => {
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

    React.useEffect(() => {
        ws.emit('plugin', 'Gyroscope', { x, y, z }, res => {
            console.log(res)
        })
    }, [data])

    return (
        <SafeAreaView>
            <ListView title='Gyroscope'>
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

export default GyroscopePlugin;