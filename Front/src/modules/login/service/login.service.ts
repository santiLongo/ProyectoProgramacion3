import { environments } from "../../../configs/enviroments";
import { post } from "../../../hooks/http.service";

export const login = async (values: LoginForm) => {
    const fullUrl = environments.apiUrl + 'auth';

    const body = values;

    try{
        const data = await post(fullUrl, body);

        window.localStorage.setItem('token',data.token);
        window.localStorage.setItem('user',data.user);
        console.log(data)
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