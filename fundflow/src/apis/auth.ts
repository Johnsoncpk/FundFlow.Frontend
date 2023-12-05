import { LoginResult } from 'types/auth';
import { StandardResult } from 'types/results';
import http from 'utils/http'

async function loginAsync(
    username: string,
    password: string): Promise<StandardResult<LoginResult>> {
    const response = await http.post<StandardResult<LoginResult>>('/authenticate/login', {
        username,
        password
    });
    return response.data;
}

export {
    loginAsync
}