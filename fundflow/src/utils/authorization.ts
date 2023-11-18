function isUserAuthorized(): boolean {
    var token = localStorage.getItem("ACCESS_TOKEN");
    return token !== null
        && token.length !== 0;
}

export {
    isUserAuthorized
};