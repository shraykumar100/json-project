import { useState } from "react";
import TablePage from "../pages/TablePage";
import ReactLoading from "react-loading";
import { IoSearch } from "react-icons/io5";
const GlobalSearch = ({ data, config, keyFn, isLoaded }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleInputChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const filterData = () => {
		return data.filter((item) =>
			Object.values(item).some((value) =>
				value.toString().toLowerCase().includes(searchTerm.toLowerCase())
			)
		);
	};

	return (
		<div>
			<div className="input-div">
				<div className="input-div bg-slate-200">
					<IoSearch className="icon" />
					<input
						className="input bg-slate-200"
						type="text"
						placeholder="Search..."
						value={searchTerm}
						onChange={handleInputChange}
					/>
				</div>
			</div>
			{isLoaded ? (
				<TablePage config={config} keyFn={keyFn} usersData={filterData()} />
			) : (
				<div className="display-center">
					<ReactLoading
						type="spinningBubbles"
						color="#3B82F6"
						height={"50px"}
						width={"50px"}
					/>
				</div>
			)}
		</div>
	);
};

export default GlobalSearch;
