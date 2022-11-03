import React from 'react';
import { View } from 'react-native'
import ItemView from './ItemView';
import LayoutView from './LayoutView';
import ListView from './ListView';
import MyAppText from './MyAppText';

function ToggleView({...props}) {
    return (
        <View {...props}>
            <LayoutView horizontal><ItemView text='Connect to the server'/></LayoutView>
        </View>
    );
}

export default ToggleView;