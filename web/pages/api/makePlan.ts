// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { notion, databaseId } from "./_notion";

type Data = {
	ok: boolean;
};

export default async function addPage(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	try {
		const response = await notion.pages.create({
			parent: { database_id: databaseId },
			properties: {
				이름: [
					{
						text: {
							content: req.body.title,
						},
					},
				],
				상태: {
					name: "시작 전",
				},
			},
		});
		const pageId = response.id;
		const response2 = await notion.databases.create({
			parent: { page_id: pageId },
			title: [
				{
					text: {
						content: "database",
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
		res.status(200).json({ ok: true });
		return;
	} catch (error: any) {
		console.error(error.body);
	}
	res.status(400).json({ ok: false });
}
