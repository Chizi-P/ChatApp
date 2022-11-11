import React from 'react'
import { SafeAreaView, ScrollView, Platform } from 'react-native'
import ListView from '../../view/ListView'
import {
    Accelerometer,
    Barometer,
    Gyroscope,
    Magnetometer,
    Pedometer
} from 'expo-sensors'
import ItemView from '../../view/ItemView'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ChartView, { useChartData } from '../../view/chart/ChartView'

function SensorsPlugin(props) {

    const [acce, setAcce] = React.useState({ x: 0, y: 0, z: 0 })
    const [gyro, setGyro] = React.useState({ x: 0, y: 0, z: 0 })
    const [magn, setMagn] = React.useState({ x: 0, y: 0, z: 0 })
    const [baro, setBaro] = React.useState({ pressure: 0, relativeAltitude: 0 })
    const [pedo, setPedo] = React.useState({ isPedometerAvailable: 'checking', pastStepCount: 0, currentStepCount: 0 })

    const [acceSubscription, setAcceSubscription] = React.useState(null)
    const [gyroSubscription, setGyroSubscription] = React.useState(null)
    const [magnSubscription, setMagnSubscription] = React.useState(null)
    const [baroSubscription, setBaroSubscription] = React.useState(null)
    const [pedoSubscription, setPedoSubscription] = React.useState(null)
    
    const [sampleInterval, setSampleInterval] = React.useState(250)

    React.useEffect(() => {
        Accelerometer.setUpdateInterval(sampleInterval)
        Gyroscope    .setUpdateInterval(sampleInterval)
        Magnetometer .setUpdateInterval(sampleInterval)
        Barometer    .setUpdateInterval(sampleInterval)
    }, [sampleInterval])

    const subscribeAcce = () => setAcceSubscription(Accelerometer.addListener(res => setAcce(res)))
    const subscribeGyro = () => setGyroSubscription(Gyroscope    .addListener(res => setGyro(res)))
    const subscribeMagn = () => setMagnSubscription(Magnetometer .addListener(res => setMagn(res)))
    const subscribeBaro = () => setBaroSubscription(Barometer    .addListener(res => setBaro(res)))
    const subscribePedo = () => {
        setPedoSubscription(Pedometer.watchStepCount(res => setPedo({currentStepCount: res.steps})))
        Pedometer.isAvailableAsync().then(
            res => setPedo({ isPedometerAvailable: String(res) }),
            err => setPedo({ isPedometerAvailable: 'Could not get isPedometerAvailable: ' + err })
        )

        const end = new Date()
        const start = new Date()
        start.setDate(end.getDate() - 1)
        Pedometer.getStepCountAsync(start, end).then(
            res => setPedo({ pastStepCount: res.steps }),
            err => setPedo({ pastStepCount: 'Could not get stepCount: ' + err })
        )
    }

    const unsubscribeAcce = () => {
        acceSubscription && acceSubscription.remove()
        setAcceSubscription(null)
    }
    const unsubscribeGyro = () => {
        gyroSubscription && gyroSubscription.remove()
        setGyroSubscription(null)
    }
    const unsubscribeMagn = () => {
        magnSubscription && magnSubscription.remove()
        setMagnSubscription(null)
    }
    const unsubscribeBaro = () => {
        baroSubscription && baroSubscription.remove()
        setBaroSubscription(null)
    }
    const unsubscribePedo = () => {
        pedoSubscription && pedoSubscription.remove()
        setPedoSubscription(null)
    }

    const subscribe = () => {
        subscribeAcce()
        subscribeGyro()
        subscribeMagn()
        subscribeBaro()
        subscribePedo()
    }

    const unsubscribe = () => {
        unsubscribeAcce()
        unsubscribeGyro()
        unsubscribeMagn()
        unsubscribeBaro()
        unsubscribePedo()
    }

    React.useEffect(() => () => unsubscribe(), [])

    const toggleAcce = isExpanded => isExpanded ? subscribeAcce() : unsubscribeAcce()
    const toggleGyro = isExpanded => isExpanded ? subscribeGyro() : unsubscribeGyro()
    const toggleMagn = isExpanded => isExpanded ? subscribeMagn() : unsubscribeMagn()
    const toggleBaro = isExpanded => isExpanded ? subscribeBaro() : unsubscribeBaro()
    const togglePedo = isExpanded => isExpanded ? subscribePedo() : unsubscribePedo()

    const [RecodedAcce, setRecodedAcce] = React.useState(false)
    const [acceRecode, setAcceRecode] = React.useState([])
    React.useEffect(() =>  {
        if (RecodedAcce) setAcceRecode(old => [...old, acce])
    }, [acce])

    const slow = () => setSampleInterval(250)

    const fast = () => setSampleInterval(100)

    const round = x => x.toFixed(4)

    const [acceChartData, acceAddChartData] = useChartData({followingDataState: acce.x * 9.81, tempLength: 50})

    return (
        <SafeAreaView>
            <ScrollView>
                <ListView title="Acceerometer" initExpand={false} onPress={toggleAcce}>
                    <ItemView text={`x: ${round(acce.x)}`} />
                    <ItemView text={`y: ${round(acce.y)}`} />
                    <ItemView text={`z: ${round(acce.z)}`} />
                    <ItemView text={RecodedAcce ? 'Recoding' : 'Make a recode'} onPress={() => {
                        if (RecodedAcce) {
                            setRecodedAcce(false)
                            AsyncStorage.setItem('@plugins.sensors.acceerometer.recode', JSON.stringify(acceRecode), err => {
                                if (err) throw err
                                setAcceRecode([])
                            })
                        } else {
                            setRecodedAcce(true)
                        }
                    }}/>
                    
                </ListView>
                <ChartView y={acceChartData}/>
                <ListView title="Gyroscope" initExpand={false} onPress={toggleGyro}>
                    <ItemView text={`x: ${round(gyro.x)}`} />
                    <ItemView text={`y: ${round(gyro.y)}`} />
                    <ItemView text={`z: ${round(gyro.z)}`} />
                </ListView>
                <ListView title="Magnetometer" initExpand={false} onPress={toggleMagn}>
                    <ItemView text={`x: ${round(magn.x)}`} />
                    <ItemView text={`y: ${round(magn.y)}`} />
                    <ItemView text={`z: ${round(magn.z)}`} />
                </ListView>
                <ListView title={'Barometer'} initExpand={false} onPress={toggleBaro}>
                    <ItemView text={`pressure: ${baro.pressure}`} />
                    <ItemView text={`Relative Altitude: \n ${Platform.OS === 'ios' ? round(baro.relativeAltitude) + 'm': 'Only available on iOS'}`} />
                </ListView>
                <ListView title={'Pedometer'} initExpand={false} onPress={togglePedo}>
                    <ItemView text={`Pedometer.isAvailableAsync(): ${pedo.isPedometerAvailable}`} />
                    <ItemView text={`Steps taken in the last 24 hours: ${pedo.pastStepCount}`} />
                    <ItemView text={`Walk! And watch this go up: ${pedo.currentStepCount}`} />
                </ListView>
                <ListView title="Controller">
                    <ItemView
                        text={acceSubscription ? 'On' : 'Off'}
                        onPress={acceSubscription ? unsubscribe : subscribe}
                        title={acceSubscription ? 'On' : 'Off'}
                    />
                    <ItemView text="Slow" onPress={slow} />
                    <ItemView text="Fast" onPress={fast} />
                </ListView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SensorsPlugin
