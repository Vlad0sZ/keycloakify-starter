import { useState, useRef, useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import type { I18n } from "../i18n";
import { Languages } from "lucide-react";

interface LanguageSelectorProps {
    i18n: I18n;
}

export function LanguageSelector(props: LanguageSelectorProps) {
    const { i18n } = props;
    const { currentLanguage, enabledLanguages, msgStr } = i18n;

    // Если язык только один, ничего не рендерим
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (enabledLanguages.length <= 1) {
        return null;
    }

    return (
        <div ref={ref} className="relative inline-block text-left">
            <button
                type="button"
                className={clsx(
                    "flex items-center gap-2 px-3 py-2 rounded-lg border text-sm",
                    "hover:bg-gray-100 transition"
                )}
                aria-label={msgStr("languages")}
                aria-haspopup="true"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(v => !v)}
            >
                <Languages className="size-3.5 text-muted-foreground" />

                <span>{currentLanguage.label}</span>
                <svg
                    className={clsx(
                        "w-4 h-4 transition-transform",
                        isOpen && "rotate-180"
                    )}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    className={clsx(
                        "absolute left-0 mt-2 w-44 rounded-xl shadow-lg border bg-white z-50",
                        "overflow-hidden"
                    )}
                    role="menu"
                >
                    <ul className="py-1 max-h-60 overflow-y-auto">
                        {enabledLanguages.map(({ languageTag, label, href }) => (
                            <li key={languageTag}>
                                <a
                                    href={href}
                                    className={clsx(
                                        "block px-4 py-2 text-sm",
                                        "hover:bg-gray-100 transition",
                                        languageTag === currentLanguage.languageTag &&
                                            "font-semibold"
                                    )}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
