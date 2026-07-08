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
  console.log(data);

  return data.data.objects.find(value => value.names.common.toLowerCase() === countryName.toLowerCase()) || data.data.objects[0]
}

searchBox.addEventListener("submit", async e => {
  e.preventDefault()
  if (countryInput.value.trim() === "") {
    errTxt.textContent = "It is Required To Enter a Country Name to search"
  } else {
    errTxt.textContent = ""
    try {
      const country = await getCountry(countryInput.value);
      const { names, capitals, area, population, currencies, languages, continents, flag } = country;
      const currency = Object.values(currencies)[0];
      countryName.textContent = names.common
      capitalTxt.textContent = capitals.map(c => c.name).join(", ")
      areaTxt.textContent = area.kilometers
      populationTxt.textContent = population
      densityTxt.textContent = (population / area.kilometers).toFixed(2)
      currencyTxt.textContent = `${currency.name} (${currency.symbol})`
      languagesTxt.textContent = languages.map(l => l.name).join(", ")
      continentTxt.textContent = continents.join(", ")
      flagImg.src = flag.url_svg
      if (!countryDetailsElem.classList.contains("active"))
        countryDetailsElem.classList.add("active")
    } catch {
      errTxt.textContent = "Country Not Found"
    }
  }
})
