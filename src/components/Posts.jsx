import axios from "axios";
import { useEffect, useState } from "react";
import Button from "./Button";
import GlobalSearch from "./GlobalSearch";

const Post = () => {
	const [posts, setPosts] = useState([]);
	const [userId, setUserId] = useState(1);
	const [postFilter, setPostFilter] = useState([]);
	const [isLoaded, setIsloaded] = useState(false);

	useEffect(() => {
		axios
			.get("https://jsonplaceholder.typicode.com/posts", {
				params: {},
			})
			.then(function (response) {
				setPosts(response.data);
				setIsloaded(true);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	const config = [
		{ label: "ID", render: (post) => post.id, sortValue: (post) => post.id },
		{
			label: "Title",
			render: (post) => post.title,
			sortValue: (post) => post.title,
		},
		{
			label: "Body",
			render: (post) => post.body,
			sortValue: (post) => post.body,
		},
	];

	const keyFn = (post) => {
		return post.title;
	};

	const nextPageHandler = () => {
		if (userId > 0) {
			setUserId((current) => current + 1);
		}
	};

	const prevPageHandler = () => {
		if (userId > 0) {
			setUserId((current) => current - 1);
		}
	};

	useEffect(() => {
		setPostFilter(posts.filter((post) => post.userId === userId));

		if (isLoaded) {
			if (userId === 1) {
				document.querySelector(".prev").disabled = true;
			} else {
				document.querySelector(".prev").disabled = false;
			}

			if (userId === 10) {
				document.querySelector(".next").disabled = true;
			} else {
				document.querySelector(".next").disabled = false;
			}
		}
	}, [posts, userId, isLoaded]);

	const pagination = (idx) => {
		setUserId(idx + 1);
	};

	const buttonRenderer = postFilter.map((elem, idx) => {
		return (
			<Button className="btn" onClick={() => pagination(idx)} key={elem.id}>
				{idx + 1}
			</Button>
		);
	});

	return (
		<div>
			<GlobalSearch
				isLoaded={isLoaded}
				data={postFilter}
				config={config}
				keyFn={keyFn}
			/>
			{isLoaded && (
				<div className="flex flex-row justify-around w-screen p-3 sticky bottom-0">
					<Button className="prev" onClick={prevPageHandler} primary rounded>
						Prev
					</Button>
					<div className="flex flex-row justify-around gap-1 pages-btn">
						{buttonRenderer}
					</div>
					<Button className="next" onClick={nextPageHandler} rounded primary>
						Next
					</Button>
				</div>
			)}
		</div>
	);
};

export default Post;
