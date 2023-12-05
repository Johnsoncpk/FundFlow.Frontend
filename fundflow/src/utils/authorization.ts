import { loginAsync } from "apis/auth";

async function loginWithCredentialAsync(
    username: string,
    password: string,
    isAutoLogin: boolean): Promise<{
        isSuccess: boolean;
        message?: string;
    }> {

    var response = await loginAsync(username, password);
    if (response.StatusCode !== 200) {
        return { isSuccess: false, message: response.ErrorMessage };
    }

    if (isAutoLogin) {
        localStorage.setItem("ACCESS_TOKEN", response.Result.accessToken);
    }

    throw new Error('Function not implemented.');
}

function getAccessToken(): string | null {
    return localStorage.getItem("ACCESS_TOKEN");
}

function isUserAuthorized(): boolean {
    var token = getAccessToken();
    return token !== null
        && token.length !== 0;
}

export {
    isUserAuthorized,
    loginWithCredentialAsync
};