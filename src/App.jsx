import { Route, Routes } from "react-router-dom";
import Api from "./components/Users";
import Navbar from "./components/Navbar";
import Post from "./components/Posts";
import PostsComment from "./components/PostsComments";
import UsersComments from "./components/UsersComments";
function App() {
	return (
		<div className="main">
			<Navbar />
			{/* <Nav /> */}
			<Routes>
				<Route path="/" element={<Api />} />
				<Route path="/posts" element={<Post />} />
				<Route path="/posts_comments" element={<PostsComment />} />
				<Route path="/users_comments" element={<UsersComments />} />
			</Routes>
		</div>
	);
}

export default App;
