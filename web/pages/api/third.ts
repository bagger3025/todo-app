// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { NextApiRequest, NextApiResponse } from "next";

import { notion, databaseId } from "./_notion";

type Data = {
	ok: boolean;
};

export default async function third_handler(
	req: NextApiRequest,
	res: NextApiResponse<object>
) {
	try {
		const response1 = await notion.databases.query({
			database_id: databaseId,
		});
		const response = await notion.blocks.children.list({
			block_id: response1.results[0].id,
		});
		console.log(response);
		response.results.forEach((ele) => {
			if ("paragraph" in ele) {
				console.log(ele.paragraph);
			}
		});

		console.log("Success! block retrieve.");
		res.status(200).json(response);
		return;
	} catch (error: any) {
		console.error(error.body);
	}
	res.status(400).json({ ok: false });
}
