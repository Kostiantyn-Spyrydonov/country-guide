const countryInput = document.getElementById("country-input")
const searchBox = document.getElementById("search-box")
const countryDetailsElem = document.getElementById("country-details")
const countryName = document.getElementById("country-name")
const capitalTxt = document.getElementById("capital-city")
const areaTxt = document.getElementById("area")
const populationTxt = document.getElementById("population")
const densityTxt = document.getElementById("pop-density")
const currencyTxt = document.getElementById("currency")
const languagesTxt = document.getElementById("languages")
const continentTxt = document.getElementById("continent")
const flagImg = document.getElementById("flag")
const errTxt = document.getElementById("errorTxt")

async function getCountry(countryName) {
  const response = await fetch(
    `https://api.restcountries.com/countries/v5/names.common/${countryName}`,
    { headers: { 'Authorization': `Bearer ${API_KEY}` } }
  );
  const data = await response.json();
  return data.find(value => value.names.common === countryName) || data[0]
}
