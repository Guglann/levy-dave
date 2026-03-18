import {Navigate, Outlet, useParams} from "react-router-dom";
import type {RouteParams} from "../types";
import {Locale, LocaleCollection} from "contentful";

type Props = {
    locales: LocaleCollection;
    defaultLocale: Locale;
};

export default function LanguageGuard(props: Props) {
    const {languageIso} = useParams() as RouteParams;

    if (!props.locales.items.find((locale) => locale.code === languageIso)) {
        return <Navigate to={`/${props.defaultLocale.code}`} replace/>;
    }

    return <Outlet/>;
}
