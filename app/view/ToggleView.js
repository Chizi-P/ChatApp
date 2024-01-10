import React from 'react';
import { View } from 'react-native'
import ItemView from './ItemView';
import LayoutView from './LayoutView';
import ListView from './ListView';
import MyAppText from './MyAppText';

function ToggleView({title, ...props}) {
    return (
        <View {...props}>
            <LayoutView horizontal><ItemView text={title}/></LayoutView>
        </View>
    );
}

export default ToggleView;