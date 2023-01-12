// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { notion, databaseId } from "./_notion";

type Data = {
	ok: boolean;
};

export default async function testDB(
	req: NextApiRequest,
	res: NextApiResponse<object>
) {
	try {
		// 1. create page
		const r1 = await notion.pages.create({
			parent: { database_id: databaseId },
			properties: {
				이름: [
					{
						text: {
							content: "새로만든 페이지",
						},
					},
				],
			},
		});
		console.log("Step 1 finished");

		// 2. create db in the page
		const pageId = r1.id;
		console.log("pageid is ", pageId);
		const r2 = await notion.databases.create({
			parent: { page_id: pageId },
			title: [
				{
					text: {
						content: "New Database",
					},
				},
			],
			properties: {
				Name: {
					title: {},
				},
			},
			is_inline: true,
		});

		console.log("Step 2 finished");

		// 3. update database id to page
		const r3 = await notion.pages.update({
			page_id: pageId,
			properties: {
				DB_id: {
					rich_text: [
						{
							text: {
								content: r2.id,
							},
						},
					],
				},
			},
		});
		console.log(r3);

		// 3. create page in the db

		res.status(200).json({ ok: true });
		return;
	} catch (error: any) {
		console.error(error.body);
	}
	res.status(400).json({ ok: false });
}
