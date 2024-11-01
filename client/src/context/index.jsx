// 'use client'
import React, {useContext, createContext} from 'react'

import {useAddress , useContract , useMetamask , useContractWrite } from '@thirdweb-dev/react';
import {ethers} from 'ethers';
// import {thirdweb} from '@thirdweb/client';  
const StateContext = createContext();
export const StateContextProvider = ({children}) => {
const {contract} = useContract('0x90fea5089866bB4eaF19c69ddBF816B9571b9395');
const { mutateAsync: createCampaign } = useContractWrite(contract,'createCampaign');
const address = useAddress();
const connect = useMetamask();
const publishCampaign = async(form) =>{
    try{
        const data = await createCampaign([
            address,
            form.title,
            form.description,
            form.target,
            new Date(form.deadline).getTime(),
            form.image
        ])
        console.log("Contract Call success!",data);
    }
    catch(error){
        console.log("Contract Call failed",error);

    }
}
    return(
        <StateContext.Provider value={{
            address,
            contract,
            connect,
            createCampaign: publishCampaign,
            }}
            >
                {children}
            </StateContext.Provider>
    )
}
// export const useStateContext = () => {
//     useContext(StateContext);
// }
export const useStateContext = () => {
    return useContext(StateContext); // Ensure to return the context value
};
