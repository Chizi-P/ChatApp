import React from 'react';
import { View } from 'react-native'
import MyAppText from '../MyAppText';

function Arrow3dView({ angles, angleType = 'rad', ...props}) {

    var modifiedAngles = {}
    if (angleType === 'rad') {
        Object.entries(angles).forEach(([axis, angle]) => modifiedAngles[axis] = (angle * (180 / Math.PI)).toFixed(0) + 'deg')
    } else if (angleType === 'deg') {
        Object.entries(angles).forEach(([axis, angle]) => modifiedAngles[axis] = angle.toFixed(0) + 'deg')
    }

    return (
        <View {...props}
            style={{
                width: 200,
                height: 30,
                backgroundColor: 'red',
                transform: [
                    { rotateX: modifiedAngles.x },
                    { rotateY: modifiedAngles.y },
                    { rotateZ: modifiedAngles.z },
                ]
            }}
        >
        </View>
    );
}

export default Arrow3dView;