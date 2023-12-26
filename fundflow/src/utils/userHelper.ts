import { loginAsync } from "apis/auth";
const AccessToken = "ACCESS_TOKEN";

async function loginWithCredentialAsync(
    username: string,
    password: string,
    isAutoLogin: boolean): Promise<void> {

    var response = await loginAsync(username, password);
    if (response.statusCode !== 200) {
        return;
    }

    setAccessToken(response.result!.accessToken);
}

function logout(): void {
    localStorage.clear();
    window.location.replace(window.location.origin);
}

function setAccessToken(token: string): void {
    localStorage.setItem(AccessToken, token);
}

function getAccessToken(): string | null {
    return localStorage.getItem(AccessToken);
}

function isUserAuthorized(): boolean {
    var token = getAccessToken();
    return token !== null
        && token.length !== 0;
}

export {
    getAccessToken,
    isUserAuthorized,
    logout,
    loginWithCredentialAsync
};