const Panel = ({ children }) => {
	return (
		<div className="relative bg-white rounded-lg m-5 shadow-lg">
			<div className="p-6 child">{children}</div>
		</div>
	);
};

export default Panel;
