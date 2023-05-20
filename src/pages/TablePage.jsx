import SortableTable from "../components/SortableTable";

function TablePage({ usersData, config, keyFn, interactive }) {
	return (
		<div>
			<SortableTable
				data={usersData}
				interactive={interactive}
				config={config}
				keyFn={keyFn}
			/>
		</div>
	);
}

export default TablePage;
