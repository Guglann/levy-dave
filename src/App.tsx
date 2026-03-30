import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAsync } from "react-use";
import LanguageGuard from "./components/LanguageGuard";
import PageLayout from "./components/PageLayout";
import About from "./pages/About";
import Album from "./pages/Album";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import { pageDataRepository } from "./services/PageDataRepository";

export default function App() {
	const pageDataRequest = useAsync(async () => {
		return pageDataRepository.getPageData();
	}, []);

	if (pageDataRequest.loading) {
		return;
	}

	const pageData = pageDataRequest.value;

	if (!pageData) {
		return;
	}

	return (
		<HashRouter>
			<Routes>
				<Route
					path="/"
					element={<Navigate to={`/${pageData.defaultLocale.code}`} replace />}
				/>

				<Route
					path="/:languageIso"
					element={
						<LanguageGuard
							locales={pageData.locales}
							defaultLocale={pageData.defaultLocale}
						/>
					}
				>
					<Route element={<PageLayout pageData={pageData} />}>
						<Route path="" element={<Shop pageData={pageData} />} />
						<Route path="album/:id" element={<Album pageData={pageData} />} />
						<Route path="about" element={<About pageData={pageData} />} />
						<Route path="contact" element={<Contact pageData={pageData} />} />
					</Route>
				</Route>
			</Routes>
		</HashRouter>
	);
}
