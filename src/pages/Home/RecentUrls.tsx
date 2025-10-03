import React from "react";
import type { UrlRecord } from "../../services/db";
import UrlCardList from "./UrlCardList";

interface RecentUrlsProps {
	urls: UrlRecord[];
}

const RecentUrls: React.FC<RecentUrlsProps> = ({ urls }) => {
	return (
		<>
			<h2 className="text-2xl font-semibold mb-4">Your Recent tinyurls</h2>
			{urls.length === 0 ? (
				<p className="text-gray-500">No URLs created yet.</p>
			) : (
				<UrlCardList urls={urls} />
			)}
		</>
	);
};

export default RecentUrls;
