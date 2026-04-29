import "@/css/globals.css";
import type { Metadata } from "next";
import type { LayoutProps } from "@/types/type";

export const metadata: Metadata = {
	title: {
		default: "ROBOGEN AI ",
		template: "%s | ROBOGEN AI",
	},
};

const AppLayout = async ({ children }: LayoutProps) => children;

export default AppLayout;
