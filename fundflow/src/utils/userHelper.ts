import { loginAsync } from "apis/auth";
import { jwtDecode } from "jwt-decode";

const AccessToken = "ACCESS_TOKEN";

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

    localStorage.setItem(AccessToken, response.Result.accessToken);
    return { isSuccess: true };
}

function getAccessToken(): string | null {
    return localStorage.getItem(AccessToken);
}

const decodedJwt = () => {
    return isUserAuthorized() ? jwtDecode(getAccessToken()!) : "";
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