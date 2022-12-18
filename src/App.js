import './App.css';
import './index.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home'
import { CountryContext } from './Components/CountryContext';
import Country from './Pages/Country';
import ErrorPage from './Pages/ErrorPage'
import Header from './Components/Header';

function App() {
  const [data, setData] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);
  const [error, setError] = useState('false')
  const [loading, setLoading] = useState('false');


  useEffect(() => {
    setError(false)
    setLoading(true);
    axios.get('https://restcountries.com/v2/all')
      .then(res => res)
      .then(r => {
        // console.log(r.data)
        setData(r.data)
        setLoading(false)
      })
      .catch(e => {
        console.log(e); 
        setError(true) 
      })

      bgColorSwitch(!darkTheme);

  }, [])

  const themeSwithcer = () => {
    setDarkTheme((prev) => {
      bgColorSwitch(prev);
      return !prev;
    })
  }

  const bgColorSwitch = (prev) => {
    const root = window.document.querySelector('#root');
      const body = window.document.body;
      root.className = '';
      body.className = '';
      if (!prev) {
        root.classList.add('bg-dark');
        body.classList.add('bg-dark');
      }
      else {
        root.classList.add('bg-light');
        body.classList.add('bg-light');
      }
  }

  return (
    <div className={`${darkTheme ? `text-white` : ``}`}>
      <CountryContext.Provider value={{ data, setData, darkTheme, setDarkTheme, themeSwithcer, loading, error, setError, setLoading }}>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/country_detail/:id' element={<Country />} />
          <Route path='*' element={<><Header /><ErrorPage /></>} />
        </Routes>
      </CountryContext.Provider>
    </div>
  );
}

export default App;
