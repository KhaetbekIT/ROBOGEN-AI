import { ENV } from "@/configs/env.config";
import type { LeadSchemaType } from "@/schemas/lead.schema";
import type { CartItem } from "@/stores/cart.store";

export const createLeadApi = async ({ body, items = [], type }: Params) => {
	if (type === "cart" && items.length === 0) {
		return {
			status: false,
			message: "Вы не выбрали товары",
		};
	}

	if (type === "cart" && items.length > 0 && !body.agree) {
		return {
			status: false,
			message: "Вы должны согласиться с политикой конфиденциальности",
		};
	}

	let company_info = `
		<p><b>Город:</b> ${body.city}</p>
		<p>Свяжитесь с клиентом для уточнения деталей.</p>
	`;

	if (body.agree && items.length > 0) {
		const productsHTML = items
			.map(
				(item) => `
				<li>
					<b>${item.name}</b> — ${item.quantity} шт.
				</li>
			`,
			)
			.join("");

		company_info = `
			<p><b>Город:</b> ${body.city}</p>
			<p><b>Выбранные товары:</b></p>
			<ul>${productsHTML}</ul>
		`;
	}

	try {
		const response = await fetch(`${ENV.API_URL}/leads`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				full_name: body.full_name,
				email: body.email,
				phone: body.phone,
				company_name: "ROBOGEN AI",
				company_info,
			}),
		});

		if (!response.ok) throw new Error();

		return {
			status: true,
			message: "Успешно отправлено",
		};
	} catch {
		return {
			status: false,
			message: "Ошибка при отправке",
		};
	}
};

interface Params {
	body: LeadSchemaType;
	items?: CartItem[];
	type: "discuss" | "cart";
}
