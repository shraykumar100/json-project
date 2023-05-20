import { Fragment } from "react";

function Table({ data, config }) {
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

		return (
			<tr className="border-b " key={idx}>
				{renderedCells}
			</tr>
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
		</div>
	);
}

export default Table;
