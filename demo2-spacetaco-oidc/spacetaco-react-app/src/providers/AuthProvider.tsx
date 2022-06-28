import React, {ReactNode} from "react";
import AuthService, {IAuthService} from "../auth/AuthService";

export const AuthContext = React.createContext<IAuthService>({
    getUser(): Promise<any> {
        return Promise.resolve(undefined);
    }, navigateToScreen(): void {
    }, parseJwt(token: string): any {
    }, signinSilent(): void {
    },
    signinRedirectCallback: () => ({}),
    logout: () => ({}),
    signoutRedirectCallback: () => ({}),
    isAuthenticated: () => false,
    signinRedirect: () => ({}),
    signinSilentCallback: () => ({}),
    createSigninRequest: () => ({})
});

export const AuthConsumer = AuthContext.Consumer;

function AuthProvider(props: { children: ReactNode }) {
    const authService = new AuthService();
    return (
        <AuthContext.Provider value={authService}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;