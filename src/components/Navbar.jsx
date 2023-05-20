import { NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<div className="nav flex justify-between sticky top-0 ">
			<h1>JSON Project</h1>

			<ul className="flex  gap-5 nav-ul">
				<li>
					<NavLink to="/">Users |</NavLink>
				</li>
				<li>
					<NavLink to="/posts">Posts |</NavLink>
				</li>
				<li>
					<NavLink to="/posts_comments">Post Comments |</NavLink>
				</li>
				<li>
					<NavLink to="/users_comments">User&apos;s Comments</NavLink>
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
