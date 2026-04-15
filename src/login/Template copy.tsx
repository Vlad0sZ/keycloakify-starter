import './index.css'
import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";

import { Ruler } from "lucide-react";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { msg, msgStr } = i18n;
    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: clsx(kcClsx("kcBodyClass"), "blueprint-grid")
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) return null;

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="animate-in fade-in-0 zoom-in-95 duration-300 ">
                <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
                    {/* Header */}
                    <div className="flex flex-col gap-2 px-6 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="bg-primary rounded-lg p-2 text-primary-foreground">
                                <Ruler className="h-6 w-6" />
                            </div>
                            <span id="kc-header-wrapper" className="text-2xl text-foreground">
                                {msg("loginTitleHtml", realm.displayNameHtml)}
                            </span>
                        </div>
                        <div className="text-muted-foreground text-sm">{headerNode}</div>
                    </div>

                    {/* Content */}
                    <div className="px-6 flex flex-col gap-4">
                        {/* Сообщения Keycloak (ошибки/успех) */}
                        {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                            <div
                                className={clsx(
                                    "relative w-full rounded-lg border px-4 py-3 text-sm",
                                    message.type === "error" ? "text-destructive border-destructive/50 bg-destructive/10" : "bg-muted border-border"
                                )}
                            >
                                <span dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
                            </div>
                        )}

                        {children}

                        {auth !== undefined && auth.showTryAnotherWayLink && (
                            <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                                <input type="hidden" name="tryAnotherWay" value="on" />
                                <button
                                    type="button"
                                    className="text-xs text-primary underline-offset-4 hover:underline"
                                    onClick={() => document.forms["kc-select-try-another-way-form" as never].requestSubmit()}
                                >
                                    {msg("doTryAnotherWay")}
                                </button>
                            </form>
                        )}

                        {socialProvidersNode}
                    </div>

                    {/* Footer / Info */}
                    {displayInfo && infoNode && <div className="px-6 pt-2 text-center text-sm text-muted-foreground">{infoNode}</div>}
                </div>
            </div>
        </div>
    );
}
