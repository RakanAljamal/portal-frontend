import React, { createContext } from "react";

export const UserContext = createContext({
    refreshTable: false,
    toggleRefresh: () => {
    }
});

export const UserProvider = ({value,children}) => {
    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}
