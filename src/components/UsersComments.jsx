import axios from "axios";
import { useEffect, useState } from "react";
import Button from "./Button";
import GlobalSearch from "./GlobalSearch";

const UsersComments = () => {
	const [userId, setUserId] = useState(1);
	const [comments, setComments] = useState([]);
	const [isLoaded, setIsloaded] = useState(false);

	useEffect(() => {
		axios
			.get(`https://jsonplaceholder.typicode.com/posts/${userId}/comments`, {
				params: {},
			})
			.then(function (response) {
				setComments(response.data);
				setIsloaded(true);
			})
			.catch(function (error) {
				console.log(error);
			});

		if (isLoaded) {
			if (userId === 1) {
				document.querySelector(".prev").disabled = true;
			} else {
				document.querySelector(".prev").disabled = false;
			}

			if (userId === 500) {
				document.querySelector(".next").disabled = true;
			} else {
				document.querySelector(".next").disabled = false;
			}
		}
	}, [userId, isLoaded]);

	const config = [
		{
			label: "ID",
			render: (comment) => comment.id,
			sortValue: (comment) => comment.id,
		},
		{
			label: "Name",
			render: (comment) => comment.name,
			sortValue: (comment) => comment.name,
		},
		{
			label: "Email",
			render: (comment) => comment.email,
			sortValue: (comment) => comment.email,
		},
		{
			label: "Body",
			render: (comment) => comment.body,
			sortValue: (comment) => comment.body,
		},
	];

	const keyFn = (comment) => {
		return comment.name;
	};

	const nextPageHandler = () => {
		if (userId < 500) {
			setUserId((current) => current + 1);
		}
	};

	const prevPageHandler = () => {
		if (userId > 1) {
			setUserId((current) => current - 1);
		}
	};

	const pagination = (idx) => {
		setUserId(idx + 1);
	};

	const buttonRenderer = comments.map((elem, idx) => {
		return (
			<Button onClick={() => pagination(idx)} key={elem.id}>
				{idx + 1}
			</Button>
		);
	});

	return (
		<>
			<GlobalSearch
				isLoaded={isLoaded}
				data={comments}
				config={config}
				keyFn={keyFn}
			/>

			{isLoaded && (
				<div className="flex flex-row justify-around w-screen p-3">
					<Button className="prev" onClick={prevPageHandler} primary rounded>
						Previous
					</Button>
					<div className="flex flex-row justify-around gap-1 pages-btn">
						{buttonRenderer}
					</div>
					<Button className="next" onClick={nextPageHandler} primary rounded>
						Next
					</Button>
				</div>
			)}
		</>
	);
};

export default UsersComments;
