import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUrl, saveUrl } from "../../services/db";

const Redirect = () => {
	const { code } = useParams<{ code: string }>();
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			if (!code) return;
			const record = await getUrl(code);

			if (!record) {
				alert("Link not found!");
				navigate("/");
				return;
			}

			if (record.expiry && Date.now() > record.expiry) {
				alert("Link expired!");
				navigate("/");
				return;
			}

			record.clicks += 1;
			await saveUrl(record);

			window.location.href = record.original;
		})();
	}, [code, navigate]);

	return <p>Redirecting...</p>;
};

export default Redirect;
