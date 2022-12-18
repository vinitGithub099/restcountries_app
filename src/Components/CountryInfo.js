import React, { useState, useContext } from 'react'
import { CountryContext } from '../Components/CountryContext'
import { Link, useParams } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import axios from 'axios';
import ErrorPage from '../Pages/ErrorPage';
import Footer from '../Components/Footer';


export default function CountryInfo() {

    const { data, darkTheme } = useContext(CountryContext);
    const { id } = useParams();
    const [borderCountries, setBorderCountries] = useState([]);

    const getBoderCountries = async (borders) => {
        if (borders) {
            const res = await axios.get(`https://restcountries.com/v2/alpha?codes=${borders.join(',')}`);
            const arr = await res.data;

            setBorderCountries(arr.map(i => i.name));
        }
    }

    const getLanguages = (l) => {
        return l.reduce((i, j) => i + '-' + j.name, '').split('-').join(',').slice(1);
    }

    const getCurrencies = (l) => {
        return l.reduce((i, j) => i + '-' + j.name, '').split('-').join(',').slice(1);
    }


    return (
        <>
            {
                data.some(i => i.name === id) ?
                    data.filter(i => i.name === id)
                        .map(({ name, aplha3code, languages,
                            borders, nativeName, region, subregion, population,
                            currencies, capital, flag, topLevelDomain }) => {
                            getBoderCountries(borders);

                            return (
                                <>
                                    <div
                                        className={`flex flex-col px-16 max-sm:px-6`}
                                        key={aplha3code}>

                                        <div className={`py-12`}>
                                            <div className={`inline-flex px-8 py-2 items-center rounded shadow-md ${darkTheme ? `bg-darkBlue` : `bg-white`}`}>
                                                <HiOutlineArrowNarrowLeft className={`mr-2`} />
                                                <Link to="/">Back</Link>
                                            </div>
                                        </div>

                                        <div className={`flex max-lg:flex-col`}>
                                            <div className={`w-1/2 mr-20 max-lg:m-0 max-lg:w-full`}>
                                                <img className={`h-[400px] w-[600px] max-sm:h-[200px]`} src={flag} alt="" />
                                            </div>

                                            <div className={`w-1/2 flex flex-col justify-center w-1/ max-lg:w-full `}>
                                                <div className={`py-4 font-bold text-xl max-lg:mt-6`}>{name.split(' ')[0]}</div>
                                                <div className={`flex py-4 max-sm:flex-col`}>
                                                    <div className={`w-1/2 leading-8 max-sm:py-2 max-sm:w-full`}>
                                                        <p><span className={`font-[500]`}>Native Name: </span>{nativeName}</p>
                                                        <p><span className={`font-[500]`}>Population: </span>{population >= 0 ? population.toLocaleString() : "No Data Avaailable"}</p>
                                                        <p><span className={`font-[500]`}>Region: </span>{region ? region : "No Data Avaailable"}</p>
                                                        <p><span className={`font-[500]`}>Sub Region: </span>{subregion ? subregion : "No Data Avaailable"}</p>
                                                        <p><span className={`font-[500]`}>Capital: </span>{capital ? capital : "No Data Avaailable"}</p>
                                                    </div>
                                                    <div className={`w-1/2 leading-8 max-sm:py-2 max-sm:w-full`}>
                                                        <p><span className={`font-[500]`}>Top Level Domain: </span>{topLevelDomain ? topLevelDomain : "No Data Avaailable"}</p>
                                                        <p><span className={`font-[500]`}>Currencies: </span>{
                                                            currencies ? getCurrencies(currencies) : "No Data Avaailable"
                                                        }</p>
                                                        <p>
                                                            <span className={`font-[500]`}>Languages: </span>
                                                            {languages ? getLanguages(languages) : "No Data Avaailable"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className={`flex py-4 max-sm:flex-col`}>
                                                    <div className={`font-[500] py-2`}>BorderCountries: </div>
                                                    {borderCountries.length !== 0 ?
                                                        <div className={`flex justify-baseline flex-wrap sm:ml-2`}>
                                                            {borderCountries.map(i =>
                                                                <Link to={`/country_detail/${i}`}>
                                                                    <p className={`mr-4 mb-4 p-2 bg-white rounded-md shadow-md ${darkTheme ? `bg-darkBlue` : `bg-white`}`}
                                                                        key={i}>
                                                                        {i}
                                                                    </p>
                                                                </Link>

                                                            )}
                                                        </div> : <p className={`mx-4 mb-4 p-2 bg-white rounded-md shadow-md ${darkTheme ? `bg-darkBlue` : `bg-white`}`}>No Data Available</p>
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <Footer />
                                </>
                            )
                        }) : <ErrorPage />
            }
        </>


    )
}
