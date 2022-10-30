import React from 'react';
import { View, Animated } from 'react-native';
import Svg, { Circle, Rect, Path, Polyline, Button } from 'react-native-svg';

function ChartView({ y, x, ...props}) {
    // const anim = React.useRef(new Animated.Value(0)).current

    // React.useEffect(() => {
    //     Animated.spring(anim, {
    //         toValue: 50,
    //         // duration: 1000,
    //     }).start()
    // }, [])

    const [layoutSize, setLayoutSize] = React.useState({width: 0, height: 0})

    const [yRange, setYRange] = React.useState({min: -50, max: 50})
    React.useEffect(() => {
        setYRange({min: Math.min(yRange.min, y.at(-1)), max: Math.max(yRange.max, y.at(-1))})
        console.log(y.at(-1) / (yRange.max - yRange.min * layoutSize.height))
        
        // temp = y.map(e => e / max - min * height)
        // res = temp.map(e => e - Math.min(...temp))

    }, [y])



    return (
        // <View style={{ aspectRatio: 1, backgroundColor: 'blue' }}>
            <Svg 
                height='100' 
                width='100%'
                style={{backgroundColor: 'blue'}} 
                onLayout={(e) => {
                    setLayoutSize({width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height})
                }}
                {...props}
            >
                {/* <AnimatedRect x="15" y="15" width={anim} height="20" stroke="white" strokeWidth='0.5'/> */}
                <Polyline 
                    points={y.map((e, i) => [x?.[i] ?? i / y.length * layoutSize.width, e / (yRange.max - yRange.min) * layoutSize.height - yRange.min])}
                    stroke='white'
                    strokeWidth={1}
                />
            </Svg>
        // </View>
    );
}

export const useChartData = ({ init = [0] , tempLength = 100, followingDataState }) => {

    if (init.length > tempLength) throw 'Error: 初始化長度不能大於暫存長度'
    const [data, setData] = React.useState(init)

    React.useEffect(() => {
        if (followingDataState) {
            addData(followingDataState)
        }
    }, [followingDataState])

    const addData = (data) => {
        setData(old => {
            let newObj = old.slice(old.length > tempLength ? 1 : 0)
            // let newObj = [...old]
            // if (old.length > tempLength) newObj.shift()
            newObj.push(data.x + 50)
            return newObj
        })
    }
    // data.tempLength = tempLength
    return [data, addData]
}


export default ChartView;


// 已知 
// View: {width, height}
// data: {y: [0, 1, 2, 3, 4]}
// yRange: {min: min(data.y), max: max(data.y)}
// range: max - min


// 怎麼處理 data.y 讓y的值都在View的 0 到 height 範圍裡