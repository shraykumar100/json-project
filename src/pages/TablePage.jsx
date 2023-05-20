import SortableTable from "../components/SortableTable";

function TablePage({ usersData, config, keyFn }) {
	return (
		<div>
			<SortableTable data={usersData} config={config} keyFn={keyFn} />
		</div>
	);
}

export default TablePage;
