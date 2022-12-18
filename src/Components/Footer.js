import React, { useContext } from 'react'
import { CountryContext } from '../Components/CountryContext'

export default function Footer() {

    const { data, darkTheme } = useContext(CountryContext);

    return (
        <div className={`bg-white mt-16 py-8 ${darkTheme ? 'bg-darkBlue' : `bg-white`}`}>
            <p className={`text-center break-normal`}>
                {`Solution to the chanllenge `}
                <span
                    className={`text-amber-500 font-bold hover:cursor-pointer`}
                    onClick={() => window.open('https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca', '_blank', 'noreferrer')}>
                    @frontendmentor.io
                </span> 
                {` by `}
                <span
                    className={`text-teal-300 font-bold hover:cursor-pointer`}
                    onClick={() => window.open('https://www.linkedin.com/in/vinit-kumbhare-5528a221a', '_blank', 'noreferrer')}>
                    Vinit Kumbhare
                </span>
            </p>
        </div>
    )
}
