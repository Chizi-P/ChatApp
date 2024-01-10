import React from 'react';
import { SafeAreaView } from 'react-native';
import ListView from '../../view/ListView';
import { Gyroscope } from 'expo-sensors';
import ItemView from '../../view/ItemView';
import { useAppContext } from '../../../AppContext';

function GyroscopePlugin(props) {

    const socket = useAppContext().socket

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
    }

    React.useEffect(() => {
        socket.emit('plugin', 'Gyroscope', { x, y, z }, res => {
            console.log(res)
        })
    }, [data])

    return (
        <SafeAreaView>
            <ListView title='Gyroscope'>
                <ItemView text={`x: ${round(x)}`}/>
                <ItemView text={`y: ${round(y)}`}/>
                <ItemView text={`z: ${round(z)}`}/>
            </ListView>
            <ListView title='Controller'>
                <ItemView text={subscription ? 'On' : 'Off'} onPress={subscription ? _unsubscribe : _subscribe} title={subscription ? 'On' : 'Off'}/>
                <ItemView text='Slow' onPress={_slow}/>
                <ItemView text='Fast' onPress={_fast}/>
            </ListView>
        </SafeAreaView>
    )
}

export default GyroscopePlugin;