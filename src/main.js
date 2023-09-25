import { createApp, markRaw } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia';
import createPersistedState from 'pinia-plugin-persistedstate';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import {useAuthStore} from "./stores/auth"

const app = createApp(App)


// var token = localStorage.getItem('token');
// if(token){
//     const newToken = await auth.getNewToken();
    
//     app.config.globalProperties.$newToken = newToken; //newToken con refrescar página
//     auth.getMyNewBearer(newToken);
// }else{
//     router.push('/login');
// }

const pinia = createPinia();
pinia.use(({store}) => {
    store.router = markRaw(router)
})
pinia.use(createPersistedState)

app.use(pinia);


//NewToken Al recargar page
const authStore = useAuthStore()
async () => await authStore.getNewTokenStore()

///var token = localStorage.getItem('token');
///if(token)
    //console.log("me ejecuto")
    ///axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;//Se envía el refreshToken

    //Se debe generar con el refreshToken un nuevo Token al actualizar la página
    ///const getNewToken = async() => {
        ///const BASE_URL = process.env.VUE_APP_BASE_URL_API
        ///await axios.post(BASE_URL + '/v1/loginRoutes/refreshToken')
        ///.then(response => {
            //console.log(response.data);
            ///const data = response.data.data;
            //console.log('es un token? ' + data.token)
            //axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;//Se almacena en memoria el new Token
            ///let newToken = data.token;
            //app.config.globalProperties.$tokenGlobal = newToken;
            
        ///}) 
        ///.catch(error => {
            ///console.log(error);
        ///})
    ///}

    //var token = localStorage.getItem('token');
    ///if(token){
        
        ///await getNewToken();
        //console.log('Mi ruta:' + process.env.VUE_APP_BASE_URL_API)
    ///}

    app.use(router)
    //app.use(helper);
    app.use(VueAxios, axios)
    app.mount('#app')
    app.config.globalProperties.$baseUrlApi = process.env.VUE_APP_BASE_URL_API


//axios.defaults.baseURL = process.env.VUE_APP_BASE_URL_API
