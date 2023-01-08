// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
		console.log(response1.results[0]);
		const response = await notion.blocks.children.list({
			block_id: response1.results[0].id,
		});
		console.log(response);
		response.results.forEach((ele) => {
			if ("paragraph" in ele) {
				console.log(ele.paragraph);
				if (ele.has_children) {
					notion.blocks.children
						.list({
							block_id: ele.id,
						})
						.then((children_response) => {
							console.log(children_response);
							children_response.results.forEach((ele_child) => {
								if ("paragraph" in ele_child) {
									console.log(ele_child.paragraph);
								} else if ("numbered_list_item" in ele_child) {
									console.log(ele_child.numbered_list_item);
								}
							});
						});
				}
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
