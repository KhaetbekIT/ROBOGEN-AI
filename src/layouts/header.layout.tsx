"use client";

import LogoImage from "@public/logo.png";
import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import { type ComponentProps, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/widgets/container";
import { Group } from "@/components/widgets/groups";
import { RoutersConfig } from "@/configs/routers.config";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Cart } from "./_components/cart";
import { Discuss } from "./_components/discuss";
import { Serach } from "./_components/search";

export const HeaderLayout = ({
	className,
	...props
}: ComponentProps<"header">) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 15);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			{...props}
			className={cn(
				"fixed top-0 left-0 right-0 z-50 transition-colors",
				{ "bg-white shadow-sm": isScrolled },
				className,
			)}
		>
			<div className="py-4 border-b border-blue-light/10">
				<Container>
					<Group className="flex-row items-center justify-between gap-4">
						<Group className="flex-row items-center gap-4">
							<Link href={RoutersConfig.client.home} className="w-46.25 h-16">
								<Image
									src={LogoImage}
									alt="Logo"
									priority
									className="w-full h-full object-cover"
								/>
							</Link>

							<div className="hidden lg:flex items-center gap-6">
								<Separator orientation="vertical" className="h-10" />

								<Group className="gap-0">
									<Link
										href="tel:+998977530109"
										className="text-md font-medium hover:text-red-01"
									>
										+998 (97) 753-01-09
									</Link>

									<Group className="flex-row items-center gap-1.5">
										<Phone size={12} className="text-blue-light" />
										<p className="text-xs font-medium text-blue-light">
											Звонок по Узбекистану
										</p>
									</Group>
								</Group>
							</div>
						</Group>

						<Group className="hidden lg:flex flex-row items-center gap-6">
							<Serach />

							<Cart />

							<Discuss isMobile={mobileOpen} isScrolled={isScrolled} />
						</Group>

						<Group className="flex-row items-center gap-4 justify-end lg:hidden">
							<Link
								href="tel:+9987753010"
								className="text-md font-medium hover:text-red-01 w-fit shrink-0 hidden min-[420px]:inline-block"
							>
								+998 (91) 775-30-10
							</Link>

							<button
								type="button"
								className="p-2"
								onClick={() => setMobileOpen(!mobileOpen)}
							>
								{mobileOpen ? <X size={28} /> : <Menu size={28} />}
							</button>
						</Group>
					</Group>
				</Container>
			</div>

			<div className="py-2 border-b border-blue-light/10 hidden lg:block">
				<Container>
					<Group className="flex-row items-center justify-between gap-6">
						<Group className="flex-row items-center gap-6">
							<Link
								href={RoutersConfig.client.pudus}
								className="text-lg text-dark hover:text-red-01 uppercase"
							>
								PUDU
							</Link>
							<Link
								href={RoutersConfig.client.unitrees}
								className="text-lg text-dark hover:text-red-01 uppercase"
							>
								Unitree
							</Link>
							<Link
								href={RoutersConfig.client.accessories}
								className="text-lg text-dark hover:text-red-01 uppercase"
							>
								Аксессуары
							</Link>
						</Group>
					</Group>
				</Container>
			</div>

			{mobileOpen && (
				<div className="bg-white border-b border-gray-200 lg:hidden">
					<Container>
						<div className="py-6 flex flex-col gap-4">
							<Link href="#!" className="text-lg hover:text-red-01 uppercase">
								PUDU
							</Link>

							<Link href="#!" className="text-lg hover:text-red-01 uppercase">
								Unitree
							</Link>

							<Discuss isMobile={mobileOpen} isScrolled={isScrolled} />
						</div>
					</Container>
				</div>
			)}
		</header>
	);
};
