import React from 'react';
import { SafeAreaView } from 'react-native';
import ListView from '../../view/ListView';
import { Magnetometer } from 'expo-sensors';
import ItemView from '../../view/ItemView';
import { useAppContext } from '../../../AppContext';
import ChartView, { useChartData } from '../../view/chart/ChartView';

function MagnetometerPlugin(props) {

    const socket = useAppContext().socket

    const [data, setData] = React.useState({
        x: 0,
        y: 0,
        z: 0,
    })
    /// !!!
    // const [accData, setAccData] = React.useState([[0, 0]])

    const [chartData, addChartData] = useChartData({followingDataState: data, tempLength: 300})

    const [subscription, setSubscription] = React.useState(null);

    const _slow = () => {
        Magnetometer.setUpdateInterval(1000);
    };

    const _fast = () => {
        Magnetometer.setUpdateInterval(100);
    };

    const _subscribe = () => {
        setSubscription(
            Magnetometer.addListener(result => {
                setData(result);
                /// !!!
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
        // socket.emit('plugin', 'Magnetometer', { x, y, z }, res => {
        //     console.log(res)
        // })
        // setAccData(old => {
        //     let newObj = old.map(e => [e[0] - 1, e[1]])
        //     if (newObj.length > 200) newObj.shift()
        //     newObj.push([200, data.x + 50])
            
        //     return newObj
        // })
    }, [data])

    return (
        <SafeAreaView>
            <ListView title='Magnetometer'>
            <ItemView text={`x: ${round(x)}`}/>
                <ItemView text={`y: ${round(y)}`}/>
                <ItemView text={`z: ${round(z)}`}/>
            </ListView>
            <ListView title='Controller'>
                <ItemView text={subscription ? 'On' : 'Off'} onPress={subscription ? _unsubscribe : _subscribe} title={subscription ? 'On' : 'Off'}/>
                <ItemView text='Slow' onPress={_slow}/>
                <ItemView text='Fast' onPress={_fast}/>
            </ListView>
            {/* <ListView title='Analysis'> */}
                {/* <ItemView text={`φ = ${magneticAzimuth(x, y)}`}/> */}
                {/* <ItemView text={``}/> */}
            {/* </ListView> */}
        </SafeAreaView>
    )
}

const magneticAzimuth = (x, y) => {
    if (x < 0 && y < 0) return 180 - Math.atan(y / x)
    else if (x > 0 && y < 0) return Math.atan(y / x)
    else if (x > 0 && y > 0) return 360 - Math.atan(y / x)
    else if (x < 0 && y > 0) return 180 + Math.atan(y / x)
    else if (x == 0 && y < 0) return 90
    else if (x == 0 && y > 0) return 270
}

export default MagnetometerPlugin;