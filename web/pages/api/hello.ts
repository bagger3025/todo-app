// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY });

const databaseId = process.env.NOTION_DATABASE_ID as string;

type Data = {
	ok: boolean;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	try {
		const response = await notion.pages.create({
			parent: { database_id: databaseId },
			properties: {
				title: {
					title: [
						{
							text: {
								content: req.body.text,
							},
						},
					],
				},
			},
		});
		console.log(response);
		console.log("Success! Entry added.");
		res.status(200).json({ ok: true });
		return;
	} catch (error: any) {
		console.error(error.body);
	}
	res.status(400).json({ ok: false });
}
