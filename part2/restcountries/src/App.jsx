import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

function App() {
  const [filter,setFilter] = useState('')
  const [data,setData] = useState(null)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => {
        setData(res.data)
      })
  },[])

  if(!data)return <div>Loading...</div>

  const filteredCountries = data.filter(country => 
    country.name.common.toLowerCase().includes(filter.trim().toLowerCase())
  )

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handleButtonClick = (e) => {
    const countryName = e.target.previousSibling.textContent
    setFilter(countryName)
  }

  return (
    <div>
      <h2>REST Countries</h2>
      <form>
        find countries <input value={filter} onChange={handleFilterChange}/>
      </form>

      <div>
        { filter.trim().length === 0 
        ? <p>Search for countries for more information.</p>
        : (filteredCountries.length > 10 
          ? <p>Too many matches, specify another filter</p>
          : ( filteredCountries.length === 1
              ? <Country data={filteredCountries[0]}/>
              : (
                filteredCountries.map(country => 
                  <div key={country.name.official}>
                    <div>{country.name.common}</div>
                    <button onClick={handleButtonClick}>Show</button>
                  </div>
                )
              )
            )
          )
        } 
      </div>
    </div>
  )
}

export default App