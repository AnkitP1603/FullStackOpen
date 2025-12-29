import { createContext, useReducer } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
    switch(action.type) {
        case 'SET': return action.payload
        case 'CLEAR': return ''
        default: return state
    }
}

let timeoutId = null

export const NotificationContextProvider = (props) => {
    const [notification, dispatch] = useReducer(notificationReducer, '')

    const setNotification = (message, time) => {
        dispatch({ type: 'SET', payload: message })
        
        if(timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId =  setTimeout(() => {
            dispatch({ type: 'CLEAR' })
        }, time*1000)
    }

    return (
        <NotificationContext.Provider value={{notification, setNotification}}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext;