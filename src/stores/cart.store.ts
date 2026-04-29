import type { StaticImageData } from "next/image";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product.type";

export const useCartStore = create<CartStoreType>()(
	persist(
		(set) => ({
			items: [],

			addItem: (item) =>
				set((state) => {
					const exists = state.items.find((i) => i.id === item.id);

					if (exists) {
						return {
							items: state.items.map((i) =>
								i.id === item.id
									? { ...i, quantity: i.quantity + item.quantity }
									: i,
							),
						};
					}

					return { items: [...state.items, item] };
				}),

			removeItem: (id) =>
				set((state) => ({
					items: state.items.filter((i) => i.id !== id),
				})),

			updateQuantity: (id, quantity) =>
				set((state) => ({
					items: state.items.map((i) =>
						i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i,
					),
				})),

			clear: () => set({ items: [] }),
		}),
		{
			name: "robogen-ai-cart",
		},
	),
);

export interface CartItem extends Omit<Product, "full_description" | "images"> {
	image: string | StaticImageData;
	quantity: number;
}

interface CartStoreType {
	items: CartItem[];
	addItem: (item: CartItem) => void;
	removeItem: (id: string) => void;
	updateQuantity: (id: string, quantity: number) => void;
	clear: () => void;
}
