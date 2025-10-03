import React from "react";
import QRCodeButton from "./QRCodeButton";
import { type UrlRecord } from "../services/db";

interface Props {
	urls: UrlRecord[];
}

interface Column<T> {
	header: string;
	key: keyof T | string;
	render?: (row: T) => React.ReactNode;
	className?: string;
}

const Table: React.FC<Props> = ({ urls }) => {
	const shortDomain = window.location.origin;

	const columns: Column<UrlRecord>[] = [
		{
			header: "Short Link",
			key: "code",
			render: (u) => (
				<a
					href={`/${u.code}`}
					target="_blank"
					rel="noreferrer"
					className="text-blue-500 hover:underline"
				>
					{shortDomain}/{u.code}
				</a>
			),
		},
		{
			header: "Original",
			key: "original",
			className: "truncate max-w-xs",
			render: (u) => u.original,
		},
		{ header: "Clicks", key: "clicks", render: (u) => u.clicks },
		{
			header: "Expiry",
			key: "expiry",
			render: (u) => (u.expiry ? new Date(u.expiry).toLocaleString() : "Never"),
		},
		{
			header: "Actions",
			key: "actions",
			render: (u) => <QRCodeButton value={`${shortDomain}/${u.code}`} />,
		},
	];

	return (
		<>
			<table className="w-full border">
				<thead>
					<tr className="bg-gray-100">
						{columns.map((col) => (
							<th
								key={col.header}
								className={`p-2 border ${col.className ?? ""}`}
							>
								{col.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{urls.map((u: UrlRecord) => (
						<tr key={u.code}>
							{columns.map((col) => (
								<td
									key={col.key as string}
									className={`p-2 border ${col.className ?? ""}`}
								>
									{col.render ? col.render(u) : u[col.key as keyof UrlRecord]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<tbody></tbody>
		</>
	);
};

export default Table;
