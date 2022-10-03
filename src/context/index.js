import React, {
    createContext,
    useContext,
    useReducer
} from 'react';
import {
    GLOBAL_STATE_STORE
} from '../constants';

const GlobalStateContext = createContext(GLOBAL_STATE_STORE);
const GlobalStateDispatchContext = createContext(() => {
});

const GlobalStateProvider = ({
    children
}) => {
    const [globalState, setGlobalState] = useReducer(
        (state, newState) => ({
            ...state,
            ...newState
        }),
        GLOBAL_STATE_STORE
    );

    return <GlobalStateContext.Provider
        value={globalState}
    >
        <GlobalStateDispatchContext.Provider
            value={setGlobalState}
        >
            {children}
        </GlobalStateDispatchContext.Provider>
    </GlobalStateContext.Provider>;
};
export default GlobalStateProvider;

export const useGlobalState = () => [
    useContext(GlobalStateContext),
    useContext(GlobalStateDispatchContext)
];
