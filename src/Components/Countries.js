import React, { useContext } from 'react'
import { CountryContext } from './CountryContext';
import CountryCard from "./CountryCard";
import Loader from '../Components/Loader'
import Footer from '../Components/Footer'

export default function Countries() {

    const { data, loading } = useContext(CountryContext);

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <div className='px-16 pt-12 grid gap-y-10 max-sm:px-2 xl:gap-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {data.map((item) => {
                            return (
                                <>
                                    <CountryCard key={item.numericCode} item={item} />
                                </>

                            )
                        })}
                    </div>
                    <Footer />
                </>
            }
        </>
    )
}
