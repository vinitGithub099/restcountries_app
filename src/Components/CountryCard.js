import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CountryContext } from './CountryContext';


const CountryCard = ({ item }) => {

    const { darkTheme } = useContext(CountryContext);

    return (
        <div className={`${darkTheme ? `bg-darkBlue` : `bg-white`} shado-md animate-fade-in transition-shadow shadow hover:shadow-xl cursor-pointer rounded-md mx-auto w-64 h-[350px] overflow-hidden`}>
            <img className={`h-1/2 w-full`} src={item.flags.png} alt="" />
            <div className={`h-1/2 w-full p-4 pb-10`}>
                <Link index="true" to={`/country_detail/${item.name}`}>
                    <div className={`font-bold text-lg py-3`}>{item.name}</div>
                </Link>
                <p><span className="font-[500]">Region: </span>{item.region}</p>
                <p><span className="font-[500]">Population: </span>{item.population.toLocaleString()}</p>
                <p><span className="font-[500]">Capital: </span>{item.capital}</p>
            </div>
        </div>
    )
}

export default CountryCard;