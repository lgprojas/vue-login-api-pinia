import axios from 'axios';
import { useRouter } from "vue-router";
import {useAuthStore} from "../stores/auth"

export default {

    isAuthenticated(){
        console.log('ingresa a isAuthenticated')
        const router = useRouter();
        const token = this.$newToken;
        const refreshToken = localStorage.getItem('token');  

            if(!token && !refreshToken){
                console.log('Redirige a /login')
                router.push('/login') 
            }else{
                console.log('continua')
                return false;
            }
    
    },

    saveSession(userInfo){

        console.log('dentro de saveUser:')
        console.log(userInfo)
        this.getMyNewBearer(userInfo.token)
        
        //aquí guardar isAUthenticate = true                            
        //stores
        const authStore = useAuthStore()
        authStore.setToken(userInfo.refreshToken)//Guardamos el token en session Pinia
        authStore.setUser(userInfo.nombre)
        
        //Vue.prototype.$tokenGlobaldos = userInfo.token;
        //console.log('Mi token global es:' + this.$tokenGlobaldos)
        //next();
    },

    getMyNewBearer(myToken){
        if(myToken){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + myToken;
        }else{
            console.log('mi token global es: ' + this.$newToken)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$newToken;
        }
 
    },

    async getNewToken(){
            console.log('dentro de getNewToken')
            const router = useRouter;
            const refreshToken = localStorage.getItem('token');

             if(!this.isAuthenticated){
                 router.push('/login');
             }

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + refreshToken;
            const BASE_URL = process.env.VUE_APP_BASE_URL_API

            const res = await axios.post(BASE_URL + '/v1/loginRoutes/refreshToken')
                .then(response => {
                //     //console.log(response.data);
                    const data = response.data.data;

                    ///axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;//Se almacena en memoria el new Token
                    
                    let newToken = data.token;
                //     //app.config.globalProperties.$tokenGlobal = newToken;  
                    return newToken              
                })
                .catch(error => {
                    console.log(error);
                })
            console.log('res: ' + res)
            return res
        }
}
