import { useEffect, useState } from "react";
import Form from "./Form";
import { getAllUrls, type UrlRecord } from "../../services/db";
import RecentUrls from "./RecentUrls";

const Home = () => {
	const [urls, setUrls] = useState<UrlRecord[]>([]);

	useEffect(() => {
		(async () => {
			const all = await getAllUrls();
			setUrls(all);
		})();
	}, []);

	const handleCreated = (record: UrlRecord) => {
		setUrls((prev) => [...prev, record]);
	};

	return (
		<div className="p-4 max-w-3xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
			<Form onCreated={handleCreated} />
			<RecentUrls urls={urls} />
		</div>
	);
};

export default Home;
