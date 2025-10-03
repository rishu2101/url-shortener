import { openDB } from "idb";
import { DB_NAME, STORE_NAME } from "../constants";

export interface UrlRecord {
	code: string;
	original: string;
	expiry: number | null;
	clicks: number;
	createdAt: number;
}

export async function getDB() {
	return openDB(DB_NAME, 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				const store = db.createObjectStore(STORE_NAME, { keyPath: "code" });
				store.createIndex("expiry", "expiry");
			}
		},
	});
}

export async function saveUrl(record: UrlRecord) {
	const db = await getDB();
	await db.put(STORE_NAME, record);
}

export async function getUrl(code: string) {
	const db = await getDB();
	return db.get(STORE_NAME, code) as Promise<UrlRecord | undefined>;
}

export async function getAllUrls() {
	const db = await getDB();
	return db.getAll(STORE_NAME) as Promise<UrlRecord[]>;
}

export async function aliasExists(alias: string): Promise<boolean> {
	const db = await getDB();
	const record = await db.get(STORE_NAME, alias);
	return !!record;
}
