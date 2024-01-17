import React, { useEffect, useState } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import Manager from './app/func/Manager'

export const AppContext = React.createContext({
    socket  : null,
    setSocket: () => {},
    manager : new Manager(),
    updateGroup: false,
    setUpdateGroup: () => {},
    user    : {},
    setUser : () => {},
    friends : [],
    setFriends: () => {},
    // groups  : [],
    // setGroups: () => {},
    // 當前打開的頁面
    currentChannel: '',
    setCurrentChannel: currentChannel => {}
})

export const AppProvider = ({ children }) => {

    // setUpdateGroup(toggle)
    const [updateGroup, setUpdateGroup] = useState(false)

    const [currentChannel, setCurrentChannel] = useState('')
    
    const [user, setUser] = useState({})
    const [friends, setFriends] = useState([])
    // const [groups, setGroups] = useState([])
    
    // 退出時關閉 socket
    const [socket, setSocket] = React.useState(null)
    useEffect(() => {
        return () => socket && socket.close()
    }, [])

    return (
            <AppContext.Provider value={{
                socket,
                setSocket,
                manager: new Manager(socket),
                updateGroup,
                setUpdateGroup,
                user,
                setUser,
                friends,
                setFriends,
                // groups,
                // setGroups,
                currentChannel,
                setCurrentChannel
            }}>
                {children}
            </AppContext.Provider>
    )
}

export const useAppContext = () => React.useContext(AppContext)