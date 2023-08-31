import {createContext, useState, useEffect} from 'react';


const UserType = createContext();

const UserContext = ({children}) =>{
    const [tokenId, setTokenId] = useState(null);


    return(
        <UserType.Provider value={{tokenId, setTokenId}}>
            {children}
        </UserType.Provider>
    )
}

export {UserType, UserContext};