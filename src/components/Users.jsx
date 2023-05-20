import axios from "axios";
import { useEffect, useState } from "react";
import GlobalSearch from "./GlobalSearch";

const Users = () => {
	const [usersData, setUsersData] = useState([]);
	const [isLoaded, setIsloaded] = useState(false);

	const config = [
		{ label: "ID", render: (user) => user.id, sortValue: (user) => user.id },
		{
			label: "Name",
			render: (user) => user.name,
			sortValue: (user) => user.name,
		},
		{
			label: "Username",
			render: (user) => user.username,
			sortValue: (user) => user.username,
		},
		{
			label: "Email",
			render: (user) => user.email,
			sortValue: (user) => user.email,
		},
		{
			label: "Phone",
			render: (user) => user.phone,
			sortValue: (user) => user.phone,
		},
		{
			label: "Website",
			render: (user) => user.website,
			sortValue: (user) => user.website,
		},
		{
			label: "Address",
			render: (user) => `${user.address.street}
		  ${user.address.suite}
		  ${user.address.city} ${user.address.zipcode}`,
			sortValue: (user) => user.website,
		},
		{
			label: "Company",
			render: (user) => user.company.name,
			sortValue: (user) => user.company.name,
		},
	];

	const keyFn = (user) => {
		return user.name;
	};

	const interactive = true;

	useEffect(() => {
		axios
			.get("https://jsonplaceholder.typicode.com/users", {
				params: {},
			})
			.then(function (response) {
				setUsersData(response.data);
				setIsloaded(true);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	return (
		<>
			<GlobalSearch
				interactive={interactive}
				isLoaded={isLoaded}
				data={usersData}
				config={config}
				keyFn={keyFn}
			/>
		</>
	);
};

export default Users;
