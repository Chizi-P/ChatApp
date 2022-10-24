import React from 'react'
import { SafeAreaView, View, Text, TouchableWithoutFeedback, Button } from 'react-native'
import MyAppText from '../view/MyAppText'
import ListView from '../view/ListView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemView from '../view/ItemView';

function PluginScreen({ navigation }) {

    const key = '@installed.plugins.list'
    const PresetPlugins = [{name: 'Accelerometer', version: 1}, {name: 'ControlMouse', version: 1}]
    const [installedPluginsList, setInstalledPluginsList] = React.useState(PresetPlugins)
    React.useEffect(() => {
        (async () => {
            const storagedInstalledPluginsList = await AsyncStorage.getItem(key)
            if (!storagedInstalledPluginsList) {
                await AsyncStorage.setItem(key, JSON.stringify(PresetPlugins))
            } else {
                setInstalledPluginsList(JSON.parse(storagedInstalledPluginsList))
            }
        })()
    }, [])


    return (
        <SafeAreaView>
            <ListView title='Installed'>
                {installedPluginsList.map((plugin, i) => (
                    <ItemView 
                        key={i} 
                        onPress={() => navigation.navigate('PluginApp', { plugin })}
                    >
                        {plugin.name} (version: {plugin.version})
                    </ItemView>
                ))}
            </ListView>
            <ListView title='Packages'>
                {Packages.map(e => (
                    <ItemView>{e.name} (version: {e.version})</ItemView>
                ))}
            </ListView>
        </SafeAreaView>
    )
}

const Packages = [
    {name: '藍牙通訊', version: 0}, 
    {name: 'AI', version: 0}, 
    {name: '遠程控制', version: 0}, 
    {name: '代理訪問內網', version: 0}, 
    {name: 'SSH', version: 0}, 
    {name: '觸控滑鼠', version: 0}
]


export default PluginScreen;