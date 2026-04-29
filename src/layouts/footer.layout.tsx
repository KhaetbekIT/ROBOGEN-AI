import type { ComponentProps } from "react";
import { RoutersConfig } from "@/configs/routers.config";
import { products } from "@/defaults/products.data";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export const Footer = ({ className, ...props }: ComponentProps<"footer">) => {
	const pudus = products.filter((item) => item.category === "pudu");
	const unitrees = products.filter((item) => item.category === "unitree");
	const accessories = products.filter((item) => item.category === "accessory");

	return (
		<footer
			className={cn(
				"mt-24 bg-linear-to-b from-gray-50 to-white border-t border-gray-200",
				className,
			)}
			{...props}
		>
			<div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
				<div className="space-y-4">
					<h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
						Навигация
					</h3>
					<ul className="space-y-2 text-sm text-gray-600">
						<li>
							<Link
								href={RoutersConfig.client.home}
								className="hover:text-gray-900 transition-colors underline-offset-4 hover:underline"
							>
								Главная
							</Link>
						</li>
						<li>
							<Link
								href="#!"
								className="hover:text-gray-900 transition-colors underline-offset-4 hover:underline"
							>
								О компании
							</Link>
						</li>
					</ul>
				</div>

				<div className="space-y-4">
					<h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
						Unitree
					</h3>
					<ul className="space-y-2 text-sm text-gray-600">
						{unitrees.map((item) => (
							<li key={item.id}>
								<Link
									href={RoutersConfig.client.productsById(item.id)}
									className="hover:text-gray-900 transition-colors underline-offset-4 hover:underline"
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div className="space-y-4">
					<h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
						PUDU
					</h3>
					<ul className="space-y-2 text-sm text-gray-600">
						{pudus.map((item) => (
							<li key={item.id}>
								<Link
									href={RoutersConfig.client.productsById(item.id)}
									className="hover:text-gray-900 transition-colors underline-offset-4 hover:underline"
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div className="space-y-4">
					<h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
						Аксессуары
					</h3>
					<ul className="space-y-2 text-sm text-gray-600">
						{accessories.map((item) => (
							<li key={item.id}>
								<Link
									href={RoutersConfig.client.productsById(item.id)}
									className="hover:text-gray-900 transition-colors underline-offset-4 hover:underline"
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="border-t border-gray-200">
				<div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
					<span>
						&copy; {new Date().getFullYear()} ROBOGEN AI. Все права защищены.
					</span>
					<span className="opacity-70">
						Роботы для бизнеса и промышленности
					</span>
				</div>
			</div>
		</footer>
	);
};
