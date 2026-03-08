import {Link} from "react-router-dom";

export default function ActionButton({text, linkUrl, variantId, isDisabled = false}) {

    const baseClasses = "inline-block px-6 py-2.5 font-medium text-sm leading-tight uppercase rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out";

    const disabledClasses = "opacity-50 pointer-events-none shadow-none cursor-not-allowed";

    const variants = {
        primary: {
            classes: "bg-orange-500 text-white hover:bg-orange-600 focus:bg-orange-600 active:bg-orange-700"
        },
        gray: {
            classes: "bg-gray-600 text-white hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-800"
        },
        ghost: {
            classes: "bg-transparent border-2 border-orange-500 text-orange-500 shadow-none hover:bg-transparent hover:text-orange-400 hover:border-orange-400 focus:border-orange-400 active:border-orange-300"
        }
    }

    const getClasses = (variantId, isDisabled) => {

        const variant = variants[variantId] ?? null;

        if (!variant) {
            throw new Error(`Unknown variant "${variant}"`);
        }

        const variantClasses = baseClasses + " " + variant.classes;

        return isDisabled ? variantClasses+" "+disabledClasses : variantClasses;
    }

    return <>
        <Link to={isDisabled ? '' : linkUrl} aria-disabled={isDisabled} className={getClasses(variantId, isDisabled)}>
            {text}
        </Link>
    </>
}