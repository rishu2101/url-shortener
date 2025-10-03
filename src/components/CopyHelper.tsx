import { useState } from "react";

interface CopyHelperProps {
	text: string;
	duration?: number;
	className?: string;
}

const CopyHelper = ({
	text,
	duration = 2000,
	className = "",
}: CopyHelperProps) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), duration);
	};

	return (
		<button
			onClick={handleCopy}
			className={`px-2 py-1 bg-green-500 text-white rounded cursor-pointer ${className}`}
		>
			{copied ? "Copied!" : "Copy"}
		</button>
	);
};

export default CopyHelper;
