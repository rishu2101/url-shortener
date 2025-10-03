import React from "react";
import UrlCard from "./UrlCard";
import type { UrlRecord } from "../../services/db";

interface UrlCardListProps {
	urls: UrlRecord[];
}

const UrlCardList: React.FC<UrlCardListProps> = ({ urls }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{urls.map((url) => (
				<UrlCard key={url.code} {...url} />
			))}
		</div>
	);
};

export default UrlCardList;
