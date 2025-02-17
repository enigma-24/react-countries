import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
	const [countryList, setCountryList] = useState([]);
	const [country, setCountry] = useState('');
	const [searchResult, setSearchResult] = useState([]);

	useEffect(() => {
		axios
			.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
			.then((response) =>
				setCountryList(response.data.map((item) => item.name.common))
			)
			.catch((error) => console.error('error: ', error));
	}, []);

	const handleSearchCountry = (event) => {
		const searchText = event.target.value;
		setCountry(searchText);
		setSearchResult(
			countryList.filter((country) =>
				country.toLowerCase().includes(searchText.toLowerCase())
			)
		);
	};

	return (
		<>
			<span>find countries </span>
			<input type='text' value={country} onChange={handleSearchCountry} />
			<div>
				{searchResult.length === 0 && country !== '' && (
					<div>No matching country found!</div>
				)}
				{searchResult.length > 0 &&
					searchResult.length <= 10 &&
					searchResult.map((result) => <div key={result}>{result}</div>)}
				{country !== '' && searchResult.length > 10 && (
					<div>Too many matches, specify another filter</div>
				)}
			</div>
		</>
	);
}

export default App;
