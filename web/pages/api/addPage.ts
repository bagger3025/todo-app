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
							content: req.body.text,
						},
					},
				],
				상태: {
					name: "시작 전",
				},
			},
			children: [
				{
					object: "block",
					type: "heading_2",
					heading_2: {
						rich_text: [{ type: "text", text: { content: "Lacinato kale" } }],
					},
				},
				{
					object: "block",
					type: "paragraph",
					paragraph: {
						rich_text: [
							{
								type: "text",
								text: {
									content:
										"Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
									link: { url: "https://en.wikipedia.org/wiki/Lacinato_kale" },
								},
							},
							{
								type: "text",
								text: {
									content: "ㅇㄴㄹㄴㄹㄴㄹ",
								},
							},
						],
					},
				},
			],
		});
		console.log("Success! Entry added.");
		res.status(200).json({ ok: true });
		return;
	} catch (error: any) {
		console.error(error.body);
	}
	res.status(400).json({ ok: false });
}
