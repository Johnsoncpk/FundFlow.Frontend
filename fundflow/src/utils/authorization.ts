function getAccessToken(): string | null {
    return localStorage.getItem("ACCESS_TOKEN");
}

function isUserAuthorized(): boolean {
    var token = getAccessToken();
    return token !== null
        && token.length !== 0;
}

export {
    isUserAuthorized
};