import axios from 'axios';
import EndPoints from './EndPoints';

export const AuthService = {

    async login(data) {
        const url = EndPoints.authService.auth;
        try {
            return await axios
                .post(url, data)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },
};