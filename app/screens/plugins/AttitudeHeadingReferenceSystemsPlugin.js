import React from 'react';
import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import ListView from '../../view/ListView';
import { Accelerometer, Gyroscope, Magnetometer } from 'expo-sensors';
import ItemView from '../../view/ItemView';
import { useAppContext } from '../../../AppContext';
import AHRS from 'ahrs';

function AttitudeHeadingReferenceSystemsPlugin() {

    const ws = useAppContext().ws

    const [accel, setAccel] = React.useState({ x: 0, y: 0, z: 0 })
    const [gyro, setGyro] = React.useState({ x: 0, y: 0, z: 0 })
    const [magn, setMagn] = React.useState({ x: 0,y: 0,z: 0 })

    const [accelSubscription, setAccelSubscription] = React.useState(null)
    const [gyroSubscription, setGyroSubscription] = React.useState(null)
    const [magnSubscription, setMagnSubscription] = React.useState(null)

    const [sampleInterval, setSampleInterval] = React.useState(250)

    React.useEffect(() => {
        Accelerometer.setUpdateInterval(sampleInterval)
        Gyroscope.setUpdateInterval(sampleInterval)
        Magnetometer.setUpdateInterval(sampleInterval)
    }, [sampleInterval])

    const _slow = () => {
        setSampleInterval(250)
    }

    const _fast = () => {
        setSampleInterval(100)
    }

    const _subscribe = () => {
        setAccelSubscription(
            Accelerometer.addListener(result => {
                setAccel(result)
            })
        )
        setGyroSubscription(
            Gyroscope.addListener(result => {
                setGyro(result)
            })
        )
        setMagnSubscription(
            Magnetometer.addListener(result => {
                setMagn(result)
            })
        )
    };

    const _unsubscribe = () => {
        accelSubscription && accelSubscription.remove()
        setAccelSubscription(null)

        gyroSubscription && gyroSubscription.remove()
        setGyroSubscription(null)

        magnSubscription && magnSubscription.remove();
        setMagnSubscription(null);
    };

    React.useEffect(() => {
        _subscribe();
        return () => _unsubscribe()
    }, []);

    function round(x) {
        return x.toFixed(4)
    }

    const madgwick = React.useRef(new AHRS({
        sampleInterval: sampleInterval,
        algorithm: 'Madgwick',
    })).current

    const [quaternion, setQuaternion] = React.useState({x: 0, y: 0, z: 0, w: 1})

    React.useEffect(() => {
        // const Axr = Math.acos(x / R)
        // const Ayr = Math.acos(y / R)
        // const Azr = Math.acos(z / R)
        // ws.emit('plugin', 'Accelerometer', { 
        //     x: isNaN(Axr) ? Math.PI : Axr, 
        //     y: isNaN(Ayr) ? Math.PI : Ayr, 
        //     z: isNaN(Azr) ? Math.PI : Azr
        // }, res => {
        //     console.log(res)
        // })
        madgwick.update(gyro.x, gyro.y, gyro.z, accel.x, accel.y, accel.z, magn.x, magn.y, magn.z)
        setQuaternion(old => {
            let newObj = madgwick.getEulerAngles()
            return {x: newObj.roll, y: newObj.pitch, z: newObj.heading}
        })
    }, [magn])

    React.useEffect(() => {
        ws.emit('plugin', 'AttitudeHeadingReferenceSystems', quaternion, res => {
            console.log(res)
        })
    }, [quaternion])

    // const [R, setR] = React.useState(0)
    // React.useEffect(() => {
    //     setR(Math.sqrt(accel.x**2 + accel.y**2 + accel.z**2))
    // }, [accel])

    return (
        <SafeAreaView>
            <ScrollView>
                <ListView title='Accelerometer'>
                    <ItemView text={`x: ${round(accel.x)}`}/>
                    <ItemView text={`y: ${round(accel.y)}`}/>
                    <ItemView text={`z: ${round(accel.z)}`}/>
                </ListView>
                <ListView title='Gyroscope'>
                    <ItemView text={`x: ${round(gyro.x)}`}/>
                    <ItemView text={`y: ${round(gyro.y)}`}/>
                    <ItemView text={`z: ${round(gyro.z)}`}/>
                </ListView>
                <ListView title='Magnetometer'>
                    <ItemView text={`x: ${round(magn.x)}`}/>
                    <ItemView text={`y: ${round(magn.y)}`}/>
                    <ItemView text={`z: ${round(magn.z)}`}/>
                </ListView>
                <ListView title='Controller'>
                    <ItemView text={accelSubscription ? 'On' : 'Off'} onPress={accelSubscription ? _unsubscribe : _subscribe} title={accelSubscription ? 'On' : 'Off'}/>
                    <ItemView text='Slow' onPress={_slow}/>
                    <ItemView text='Fast' onPress={_fast}/>
                </ListView>
                <ListView title='Analysis'>
                    <ItemView text={'x: ' + round(quaternion.x)}/>
                    <ItemView text={'y: ' + round(quaternion.y)}/>
                    <ItemView text={'z: ' + round(quaternion.z)}/>
                    {/* <ItemView text={'w: ' + round(quaternion.w)}/> */}

                </ListView>
                {/* <ListView title='Analysis'>
                    <ItemView text={`R = ${R}`}/>
                    <ItemView text={'對地面傾角:'}/>
                    <ItemView text={`   Axr: ${Math.acos(accel.x / R) / Math.PI * 180}`}/>
                    <ItemView text={`   Ayr: ${Math.acos(accel.y / R) / Math.PI * 180}`}/>
                    <ItemView text={`   Azr: ${Math.acos(accel.z / R) / Math.PI * 180}`}/>
                </ListView> */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default AttitudeHeadingReferenceSystemsPlugin