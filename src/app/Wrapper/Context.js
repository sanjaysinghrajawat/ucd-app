"use client"
const { createContext } = require("react");

export const AppContext = createContext({});

import React, { useEffect, useState } from 'react'

const ContextProvider = ({ children }) => {

    const [selectedModel, setSelectedModel] = useState('model1');
    const [auth, setAuth] = useState(false);

    const GetAuth = () => {
        const token = localStorage.getItem("token");
        if(!token){
            setAuth(false);
        }
        else{
            setAuth(true);
        }
    }
    useEffect(()=>{
        GetAuth();
    },[])

    return (
        <div>
            <AppContext.Provider value={{selectedModel, setSelectedModel, auth}}>
                {children}
            </AppContext.Provider>
        </div>
    )
}

export default ContextProvider