import React, { useContext, useRef } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { CountryContext } from './CountryContext';

export default function SearchFilter() {
    const countrySearchValue = useRef();
    const regionSearchValue = useRef();

    const { setData, darkTheme, setLoading, setError } = useContext(CountryContext)

    const handleSearchChange = async () => {
        setLoading(true)
        const searchValue = countrySearchValue.current.value;
        if (searchValue.trim()) {
            try {
                const response = await axios.get(`https://restcountries.com/v2/name/${searchValue}`);
                const data = await response.data;
                console.log(data);
                setData(data);
                setError(false);
            }
            catch (e) {
                setError(true);
            }
        }
        else {
            setLoading(true)
            try {
                const response = await axios.get(`https://restcountries.com/v2/all`);
                const data = await response.data;
                console.log(data);
                setData(data);
                setError(false);
            }
            catch (e) {
                setError(true);
            }

        }
        setLoading(false)
    }

    const handleRegionChange = async () => {
        setLoading(true)
        const regionValue = regionSearchValue.current.value;
        console.log(regionValue)
        if (regionValue.trim()) {
            if (regionValue === 'All') {
                try {
                    const response = await axios.get(`https://restcountries.com/v2/all`)
                    const data = await response.data;
                    console.log(data)
                    setData(data);
                    setError(false);
                }
                catch (e) {
                    setError(true);
                }
            }
            else {
                try {
                    const response = await axios.get(`https://restcountries.com/v2/region/${regionValue}`)
                    const data = await response.data;
                    console.log(data);
                    setData(data);
                    setError(false);
                }
                catch (e) {
                    setError(true);
                }
            }
        }
        setLoading(false)
    }

    return (
        <div className={`flex justify-between mx-16 py-8 max-sm:flex-col max-sm:align-between max-sm:mx-6`}>
            <div
                className={`w-80 flex items-center shadow-md rounded-md px-8 py-4 text-sm max-sm:w-full max-sm:mb-8
                ${darkTheme ? `bg-darkBlue` : `bg-white`}`}>
                <AiOutlineSearch className={`mr-3`} />
                <input
                    className={`w-64 outline-none ${darkTheme ? `bg-darkBlue` : `bg-white`}`}
                    type="text"
                    name="searchText"
                    placeholder="Search for a country"
                    ref={countrySearchValue}
                    onChange={() => handleSearchChange()} />
            </div>
            <div
                className={`w-[200px] flex items-center bg-white shadow-md rounded-md px-8 py-4 text-sm max-sm:w-64 ${darkTheme ? `bg-darkBlue` : `bg-white`}`}>
                <select
                    className={`outline-none ${darkTheme ? `bg-darkBlue` : `bg-white`}`}
                    name="filters"
                    ref={regionSearchValue}
                    onChange={() => handleRegionChange()}>
                    <option value="All">Filter by region</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">America</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Asia">Asia</option>
                </select>
            </div>
        </div>
    )
}
