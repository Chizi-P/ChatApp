import React from 'react';
import { View, Text } from 'react-native'
import LayoutView from './LayoutView';
import MyAppText from './MyAppText';

function BoxView({ children }) {
    return (
        <LayoutView margin={15} spacing={5}>
            { children }
        </LayoutView>
    );
}

export default BoxView;