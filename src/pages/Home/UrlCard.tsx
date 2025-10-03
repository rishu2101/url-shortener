import type { UrlRecord } from "../../services/db";

const UrlCard = ({
	code: alias,
	original: originalUrl,
	clicks,
	expiry,
}: UrlRecord) => {
	const shortDomain = `${window.location.origin}/${alias}`;
	return (
		<div className="bg-white border rounded-lg shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow">
			<h3 className="font-semibold text-lg truncate">{alias}</h3>

			<p className="text-gray-700 break-words mt-2">{originalUrl}</p>

			<div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500 gap-2">
				<span>Clicks: {clicks}</span>
				<span>Expires: {expiry || "Never"}</span>
			</div>

			<a
				href={shortDomain}
				target="_blank"
				className="mt-3 text-blue-600 hover:underline text-sm"
			>
				Visit
			</a>
		</div>
	);
};

export default UrlCard;
