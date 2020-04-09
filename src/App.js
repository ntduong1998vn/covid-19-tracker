import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import axios from 'axios'
import image from './images/image.png';
// import Cards from './components/Cards/Cards'
// import Chart from './components/Chart/Chart'
// import CountryPicker from './components/CountryPicker/CountryPicker'
import { fetchData } from './api';
import { Cards, Chart, CountryPicker } from "./components"

function App() {
  const [data, setData] = useState({});
  const [country, setCountry] = useState('')

  async function handleCountryChange(country) {
    const data = await fetchData(country);

    setCountry(country);
    setData(data)
  }

  useEffect(() => {

    const url = "https://covid19.mathdro.id/api";

    async function fetchData() {
      try {
        // const response = await axios.get(url);
        // const modifiedData = {
        //   confirmed: response.data.confirmed,
        //   recovered: response.data.recovered,
        //   deaths: response.data.deaths,
        //   lastUpdate: response.data.lastUpdate
        // }

        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(url);
        const modifiedData = { confirmed, recovered, deaths, lastUpdate };
        setData(modifiedData);
      } catch (error) {
        console.log(error)
      }
    }

    fetchData();
  }, [])


  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt="COVID-19" />
      <Cards {...data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} country={country} />
    </div>
  );
}

export default App;
