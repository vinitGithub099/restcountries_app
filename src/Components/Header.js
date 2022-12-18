import { dark } from '@mui/material/styles/createPalette';
import React, { useContext } from 'react'
import { BsMoonFill } from "react-icons/bs";
import { CountryContext } from './CountryContext';


export default function Header() {

    const { darkTheme, themeSwithcer } = useContext(CountryContext);

    return (
        <div
            className={`flex items-center justify-between p-6 shadow ${darkTheme ? `bg-darkBlue` : `bg-white`}`}>
            <div
                className={`ml-10 text-lg font-bold max-[500px]:m-0`}>
                Where in the world?
            </div>
            <div className='flex items-center mr-10 max-[500px]:m-0'>
                <BsMoonFill
                    className='mr-2'
                    onClick={themeSwithcer} />
                <span>Dark Mode</span>
            </div>
        </div>
    )
}
