import React, { useContext } from 'react'
import Countries from '../Components/Countries'
import Header from '../Components/Header'
import SearchFilter from '../Components/SearchFilter'
import { CountryContext } from '../Components/CountryContext';
import ErrorPage from '../Pages/ErrorPage'

export default function Home() {

  const { error } = useContext(CountryContext);


  return (
    <>
      <Header />
      <SearchFilter />
      {error ? <ErrorPage /> : <Countries />}
    </>
  )
}
