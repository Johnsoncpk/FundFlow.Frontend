import { LoginResult } from 'types/auth';
import { StandardResult } from 'types/results';
import http from 'utils/http'

async function loginAsync(
    username: string,
    password: string): Promise<StandardResult<LoginResult | null>> {
    try {
        const response = await http.post<StandardResult<LoginResult>>('/authentication/login', {
            username,
            password
        });
        return response.data;
    } catch (error: any) {
        return {
            statusCode: error.statusCode,
            result: null,
            errorMessage: error.errorMessage
        };
    }
}

export {
    loginAsync
}