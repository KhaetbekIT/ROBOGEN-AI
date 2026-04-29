import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export const generateStaticParams = () => {
	return routing.locales.map((locale) => ({ locale }));
};

export const metadata: Metadata = {
	title: "ROBOGEN AI",
};

const LocaleLayout = async ({ children, params }: LayoutProps<"/[locale]">) => {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	setRequestLocale(locale);

	return (
		<html
			lang={locale}
			translate="no"
			className="font-family-cofo-sans font-normal"
		>
			{children}
		</html>
	);
};

export default LocaleLayout;
