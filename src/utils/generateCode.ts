import { DEFAULT_CODE_LENGTH } from "../constants";

export function generateCode(length: number = DEFAULT_CODE_LENGTH): string {
	const chars =
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	return Array.from(
		{ length },
		() => chars[Math.floor(Math.random() * chars.length)]
	).join("");
}
