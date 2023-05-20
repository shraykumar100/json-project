import { useState } from "react";
import TablePage from "../pages/TablePage";
const Search = ({ data, searchedItems, config, keyFn }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const handleInputChange = (event) => {
		const { value } = event.target;
		setSearchTerm(value);
		filterData(value);

		searchedItems(searchResults);
	};

	// console.log(data);

	const filterData = (value) => {
		const filteredData = data.filter(
			(item) =>
				item.name.toLowerCase().includes(value.toLowerCase()) ||
				item.username.toLowerCase().includes(value.toLowerCase()) ||
				item.email.toLowerCase().includes(value.toLowerCase())
			// item.title.toLowerCase().includes(value.toLowerCase()) ||
			// item.body.toLowerCase().includes(value.toLowerCase())
		);
		setSearchResults(filteredData);
	};

	// searchedData(filterData);

	return (
		<div>
			<input
				type="text"
				placeholder="Search"
				value={searchTerm}
				onChange={handleInputChange}
			/>
			<ul>
				{searchResults.map((item) => (
					<li key={item.id}>{item.name}</li>
				))}
			</ul>
			<TablePage config={config} keyFn={keyFn} usersData={searchResults} />
		</div>
	);
};

export default Search;
