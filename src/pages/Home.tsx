import { useEffect, useState } from "react";
import Form from "../components/Form";
import Table from "../components/Table";
import { getAllUrls, type UrlRecord } from "../services/db";

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
			<Table urls={urls} />
		</div>
	);
};

export default Home;
