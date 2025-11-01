import { environments } from "../../../configs/enviroments";
import { post } from "../../../hooks/http.service";

export const login = async (values: LoginForm) => {
    const fullUrl = environments.apiUrl + 'auth';

    const body = values;

    try{
        const data = await post(fullUrl, body);

        if(data.token == null){
            return;
        }
        window.localStorage.setItem('token',data.token);
        window.localStorage.setItem('user',JSON.stringify(data.user));
        window.location.href = '/'
        return;
    }catch (error){
        console.log('Error al logear' + error)
    }
    return;
}

export interface LoginForm{
    email: string;
    password: string;
}