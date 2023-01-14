// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import type { NextApiRequest, NextApiResponse } from "next";

import { notion, databaseId } from "./_notion";

type Data = {
	ok: boolean;
};

export default async function addPage(
	req: NextApiRequest,
	res: NextApiResponse<QueryDatabaseResponse | Data>
) {
	try {
		const response = await notion.databases.query({
			database_id: databaseId,
		});

		res.status(200).json(response);
		return;
	} catch (error: any) {
		console.error(error.body);
	}
	res.status(400).json({ ok: false });
}
