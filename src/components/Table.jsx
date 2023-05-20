import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import Button from "./Button";
import Panel from "./Panel";

function Table({ data, config, interactive }) {
	const [posts, setPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [modalToggle, setModalToggle] = useState(false);
	const [currentUser, setCurrentUser] = useState(-1);

	useEffect(() => {
		axios
			.get("https://jsonplaceholder.typicode.com/posts", {
				params: {},
			})
			.then(function (response) {
				setPosts(response.data);
				// console.log(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	const userPostHandler = (posts, rowData) => {
		// const filter = rowData.filter((row) => row.id === posts.userId);
		// console.log(posts);

		const filter = posts.filter((post) => post.userId === rowData.id);
		setFilteredPosts(filter);
		setCurrentUser(rowData.name);
		setModalToggle(true);
	};

	const renderedHeaders = config.map((column, idx) => {
		if (column.header) {
			return <Fragment key={idx}>{column.header()}</Fragment>;
		}

		return <th key={idx}>{column.label}</th>;
	});

	const notFoundRenderer = () => {
		if (data.length === 0) {
			return <div className="display-center">Result not found</div>;
		}
	};

	const renderedRows = data.map((rowData, idx) => {
		const renderedCells = config.map((column, idx) => {
			return (
				<td className="p-2 " key={idx}>
					{column.render(rowData)}
				</td>
			);
		});

		// console.log(data);

		if (interactive) {
			return (
				<tr
					className="border-b x "
					onClick={() => userPostHandler(posts, rowData)}
					key={idx}>
					{renderedCells}
				</tr>
			);
		} else {
			return (
				<tr className="border-b " key={idx}>
					{renderedCells}
				</tr>
			);
		}
	});

	const handleClose = () => {
		setModalToggle(false);
	};

	const actionBar = (
		<div>
			<Button rounded onClick={handleClose} primary>
				Close
			</Button>
		</div>
	);

	// console.log(filteredPosts);

	const modalRenderer = filteredPosts.map((post) => {
		return (
			<Panel key={post.id}>
				<div className="comt p-2">
					<div>
						<h1 className="text-xl font-bold mb-5">{post.title}</h1>
						<h3>{post.body}</h3>
					</div>
				</div>
			</Panel>
		);
	});
	return (
		<div className="overflow-x-auto">
			<table className="table-auto border-collapse border-spacing-2 ">
				<thead>
					<tr className="border-b-2">{renderedHeaders}</tr>
				</thead>
				<tbody>{renderedRows}</tbody>
			</table>
			{notFoundRenderer()}
			{modalToggle && (
				<Modal
					currentUser={currentUser}
					onClose={handleClose}
					actionBar={actionBar}>
					{modalRenderer}
				</Modal>
			)}
		</div>
	);
}

export default Table;
