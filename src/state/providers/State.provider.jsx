import React, { createContext, useContext, useReducer } from 'react'

// Prepares the Data Layer
export const StateContext = createContext();

// Wrap the app providing the Date Layer
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

// This is a function to pull/get information from the Data Layout
export const useStateValue = () => useContext(StateContext);