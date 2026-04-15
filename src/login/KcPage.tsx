import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";
import { twMerge } from "tailwind-merge";

const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const LoginUsername = lazy(() => import("./pages/LoginUsername"));
const LoginPassword = lazy(() => import("./pages/LoginPassword"));
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Terms = lazy(() => import("./pages/Terms"));

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl":
                        return (
                            <Login
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={false}
                            />
                        );

                    case "login-username.ftl":
                        return (
                            <LoginUsername
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={false}
                            />
                        );

                    case "login-password.ftl":
                        return (
                            <LoginPassword
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={false}
                            />
                        );
                    case "login-reset-password.ftl":
                        return (
                            <LoginResetPassword
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={false}
                            />
                        );

                    case "register.ftl":
                        return (
                            <Register
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={false}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                    case "terms.ftl":
                        return (
                            <Terms
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={false}
                            />
                        );
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const classes = {
    /* 
    This is commended out because the same rules are applied in the index.css file
    and applying the tailwind utility classes in the CSS file is recommended over applying them here.
    This is because here you're limited in how precisely you can target the DOM elements and manage the specificity. 
    As you can see here I need to use `!` witch is shorthand for `!important` and this should be avoided if possible.
    In the index.css I can simply use `body.kcBodyClass` or `.kcBodyClass.kcBodyClass` instead of just `.kcBodyClass` 
    to increase the specificity and avoid using `!important`.  
    */
    //kcBodyClass: twMerge(
    //    "!bg-[url(./assets/img/background.jpg)] bg-no-repeat bg-center bg-fixed",
    //    "font-geist"
    //),

    kcHtmlClass: "",
    kcBodyClass: twMerge("blueprint-grid"),
    kcLoginClass: twMerge(
        "w-full max-w-md px-4 animate-in fade-in-0 zoom-in-95 duration-300"
    ),
    kcFormCardClass: twMerge(
        "relative bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-lg border-border/50"
    ),

    kcFormHeaderClass: twMerge(
        "@container/card-header text-center grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 pt-10"
    ),
    kcHeaderClass: twMerge("flex items-center justify-center gap-2 mb-2"),
    kcHeaderWrapperClass: twMerge("leading-none text-2xl font-semibold capitalize"),
    kcInputClass: twMerge(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
    ),
    kcLabelClass: twMerge(
        "flex items-center gap-2 text-sm leading-none font-medium",
        "select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
    ),

    kcFormClass: twMerge("flex flex-col gap-4"),
    kcFormGroupClass: twMerge("flex flex-col gap-y-1.5"),

    kcSignUpClass: twMerge("mt-2 text-left"),
    kcInfoAreaWrapperClass: twMerge("text-sm text-muted-foreground"),

    kcLabelWrapperClass: twMerge("flex items-center gap-1"),

    kcInputWrapperClass: twMerge("mt-0"),
    kcFormOptionsWrapperClass: twMerge(
        "text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
    ),
    kcInputErrorMessageClass: twMerge(
        "mt-1.5 text-[12px] font-medium text-destructive animate-in fade-in slide-in-from-top-1 duration-200"
    ),
    kcButtonClass: twMerge(
        "h-9 px-4 py-2 has-[>svg]:px-3",
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
    ),
    kcButtonPrimaryClass: twMerge(
        "bg-primary text-primary-foreground hover:bg-primary/90"
    ),

    kcAlertClass: twMerge(
        "relative w-full rounded-lg border px-4 py-3 text-sm grid grid-cols-[auto_1fr] gap-x-3 items-start animate-in fade-in duration-200"
    ),

    // Класс заголовка (принудительно красим через селектор родителя)
    kcAlertTitleClass: twMerge(
        "font-medium tracking-tight leading-[1.2] [.alert-error_&]:text-destructive [.alert-success_&]:text-emerald-600 [.alert-warning_&]:text-amber-600"
    ),
    // Иконки (размер и позиционирование)
    kcFeedbackErrorIcon: twMerge(
        "lucide lucide-alert-circle size-4 text-destructive translate-y-0.5"
    ),
    kcFeedbackSuccessIcon: twMerge(
        "lucide lucide-check-circle size-4 text-emerald-600 translate-y-0.5"
    ),
    kcFeedbackWarningIcon: twMerge(
        "lucide lucide-alert-triangle size-4 text-amber-600 translate-y-0.5"
    ),
    kcFeedbackInfoIcon: twMerge(
        "lucide lucide-info size-4 text-blue-600 translate-y-0.5"
    ),
    kcFormSettingClass: twMerge("mb-2"),
    kcFormButtonsClass: twMerge("mt-2 flex flex-col gap-2"),
    kcFormSocialAccountSectionClass: twMerge("mt-6 relative flex flex-col gap-4"),

    // Список кнопок
    kcFormSocialAccountListClass: twMerge("flex flex-col gap-2"),
    kcFormSocialAccountListGridClass: twMerge("grid grid-cols-2 gap-2"),

    // Сама кнопка (ссылка <a>)
    kcFormSocialAccountListButtonClass: twMerge(
        "inline-flex w-full items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    ),

    // Общий класс для иконок
    kcCommonLogoIdP: twMerge("block size-4 bg-no-repeat bg-center bg-contain shrink-0"),

    // Текст рядом с иконкой
    kcFormSocialAccountNameClass: twMerge("truncate")
} satisfies { [key in ClassKey]?: string };
