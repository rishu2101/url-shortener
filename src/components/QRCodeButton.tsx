import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import CopyHelper from "./common/CopyHelper";
import { QR_CODE_FILE_NAME } from "../constants";

interface QrCodeProps {
	value: string;
}

const QRCodeButton = ({ value }: QrCodeProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const downloadQRCode = () => {
		if (!canvasRef.current) return;

		const url = canvasRef.current.toDataURL("image/png");
		const link = document.createElement("a");
		link.href = url;
		link.download = QR_CODE_FILE_NAME;
		link.click();
	};

	return (
		<div className="flex flex-col sm:flex-row items-center space-2 gap-2">
			<QRCodeCanvas
				// className="hidden"
				value={value}
				size={64}
				ref={canvasRef}
			/>
			<div className="flex-flex-col space-y-2">
				<CopyHelper text={value} />
				<button
					onClick={downloadQRCode}
					className="px-2 py-1 bg-blue-500 text-white rounded cursor-pointer"
				>
					Download QR
				</button>
			</div>
		</div>
	);
};

export default QRCodeButton;
