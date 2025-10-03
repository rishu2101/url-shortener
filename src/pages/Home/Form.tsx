import { useState } from "react";
import { saveUrl, type UrlRecord } from "../../services/db";
import { aliasExists } from "../../services/db";
import { generateCode } from "../../utils/generateCode";
import { MAX_ALIAS_LENGTH } from "../../constants";

interface FormProps {
	onCreated: (record: UrlRecord) => void;
}

const Form = ({ onCreated }: FormProps) => {
	const [url, setUrl] = useState("");
	const [alias, setAlias] = useState("");
	const [expiry, setExpiry] = useState("");
	const [aliasError, setAliasError] = useState("");
	const [urlError, setUrlError] = useState("");

	const handleRandomize = () => {
		setAlias(generateCode());
		setAliasError("");
	};

	const createShortUrl = async () => {
		if (!url) {
			setUrlError("Empty Url. Please add the url to generate short url.");
			return;
		}

		let code = alias.trim();

		if (code) {
			if (code.length > MAX_ALIAS_LENGTH) {
				setAliasError(`Alias too long. Max ${MAX_ALIAS_LENGTH} characters.`);
				return;
			}

			const exists = await aliasExists(code);
			if (exists) {
				setAliasError("Alias already in use. Please add another or randomize.");
				return;
			}
		}

		if (!code) {
			do {
				code = generateCode();
			} while (await aliasExists(code));
		}

		const record: UrlRecord = {
			code,
			original: url,
			expiry: expiry ? new Date(expiry).getTime() : null,
			clicks: 0,
			createdAt: Date.now(),
		};

		await saveUrl(record);
		onCreated(record);
		resetForm();
	};

	const resetForm = () => {
		setUrl("");
		setAlias("");
		setExpiry("");
		setAliasError("");
	};

	return (
		<div className="mb-6 space-y-4">
			<div className="flex flex-col">
				<input
					type="text"
					placeholder="Enter URL"
					value={url}
					onChange={(e) => {
						setUrl(e.target.value);
						setUrlError("");
					}}
					className={`border p-2 rounded w-full ${
						urlError ? "border-red-500" : ""
					}`}
				/>
				{urlError && (
					<span className="text-red-500 text-sm mt-1">{urlError}</span>
				)}
			</div>

			<div className="flex flex-col sm:flex-row sm:items-start sm:space-x-2 space-y-2 sm:space-y-0">
				<div className="flex flex-col flex-1">
					<div className="flex flex-row space-x-2">
						<input
							type="text"
							placeholder="Custom alias (optional)"
							value={alias}
							onChange={(e) => {
								setAlias(e.target.value);
								setAliasError("");
							}}
							className={`flex-1 border p-2 flex-1 rounded ${
								aliasError ? "border-red-500" : ""
							}`}
						/>
						<button
							onClick={handleRandomize}
							className="bg-gray-500 text-white px-3 py-2 rounded cursor-pointer flex-shrink-0"
						>
							Randomize
						</button>
					</div>
					{aliasError && (
						<span className="text-red-500 text-sm mt-1">{aliasError}</span>
					)}
				</div>

				<input
					type="datetime-local"
					value={expiry}
					onChange={(e) => setExpiry(e.target.value)}
					className="border p-2 rounded w-full sm:w-48 flex-shrink-0"
					min={new Date().toISOString().slice(0, 16)}
				/>
			</div>

			<button
				onClick={createShortUrl}
				disabled={!!(aliasError || urlError)}
				className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Shorten
			</button>
		</div>
	);
};

export default Form;
