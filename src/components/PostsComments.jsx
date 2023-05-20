import axios from "axios";
import { useEffect, useState } from "react";
import Button from "./Button";
import GlobalSearch from "./GlobalSearch";

const PostsComment = () => {
	const [postId, setPostId] = useState(1);
	const [comments, setComments] = useState([]);
	const [isLoaded, setIsloaded] = useState(false);

	useEffect(() => {
		axios
			.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`, {
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
			if (postId === 1) {
				document.querySelector(".prev").disabled = true;
			} else {
				document.querySelector(".prev").disabled = false;
			}

			if (postId === 500) {
				document.querySelector(".next").disabled = true;
			} else {
				document.querySelector(".next").disabled = false;
			}
		}
	}, [postId, isLoaded]);

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
		if (postId < 500) {
			setPostId((current) => current + 1);
		}
	};

	const prevPageHandler = () => {
		if (postId > 1) {
			setPostId((current) => current - 1);
		}
	};

	const pagination = (idx) => {
		setPostId(idx + 1);
	};

	const buttonRenderer = comments.map((elem, idx) => {
		return (
			<Button onClick={() => pagination(idx)} key={elem.id}>
				{idx + 1}
			</Button>
		);
	});

	return (
		<div>
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
		</div>
	);
};

export default PostsComment;
