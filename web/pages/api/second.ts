// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { NextApiRequest, NextApiResponse } from "next";

import { notion, databaseId } from "./_notion";

type Data = {
	ok: boolean;
};

export default async function second_handler(
	req: NextApiRequest,
	res: NextApiResponse<object>
) {
	try {
		const response = await notion.databases.query({
			database_id: databaseId,
		});
		console.log(response);
		response.results.forEach((ele) => {
			if ("properties" in ele) {
				console.log(ele.properties);
				if (ele.properties["이름"].type === "title") {
					console.log(ele.properties["이름"].title);
				}
			}
		});
		console.log("Success! Queried.");
		res.status(200).json(response);
		return;
	} catch (error: any) {
		console.error(error.body);
	}
	res.status(400).json({ ok: false });
}
