import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('authStore', {
    state: () => ({ authUser: null, authToken: null }),
    getters:{
        user:(state) => state.authUser,
        token:(state) => state.authToken
    },
    actions:{
        setToken(token){
            this.authToken = token;
        },
        setUser(user){
            this.authUser = user;
        },
        async getNewTokenStore(){
            if(!this.authToken && !this.authUser){
                router.push('/login');
            }

            console.log('dentro de getNewTokenStore: ' +this.authToken)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.authToken;
            const BASE_URL = process.env.VUE_APP_BASE_URL_API

            const res = await axios.post(BASE_URL + '/v1/loginRoutes/refreshToken')
                .then(response => {
                    const data = response.data.data;
                    let newToken = data.token;
                    return newToken              
                })
                .catch(error => {
                    console.log(error);
                })
            //axios.defaults.headers.common['Authorization'] = 'Bearer ' + res
                return res
        },
        logout(){
            //await axios.get('');
            this.authToken = null;
            this.authUser = null;
            this.router.push('/login');
        }
    },
    persist:true
})