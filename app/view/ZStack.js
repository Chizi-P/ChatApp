import React from 'react';
import { View } from 'react-native';

function ZStack({ children }) {
    return (
        <View style={{flex: 1, flexWrap: 'wrap', alignItems: 'stretch', alignSelf: 'stretch'}}>
            {React.Children.map(children, child => {
                React.cloneElement(child, {
                    style: {
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        backgroundColor: 'red',
                        ...child.props.style, 
                    }
                })
            })}
        </View>
    );
}

export default ZStack;