<template>
    <div class="container">Desde Users</div>
    <div v-if="errorData != ''">
        Error: {{ errorData }}
    </div>
    <div v-else>
        {{ users }}
    </div>
</template>

<script>
import { useRouter } from "vue-router";
import auth from "../helper/auth"
import {useAuthStore} from "../stores/auth"


    export default {
        name: 'Users',
        data(){
            return {
                users: [],
                errorData: '',
                myToken:'',
            }
        },
        // beforeCreated(){
        //     console.log('dentro de beforeCreated') 
        //     auth.isAuthenticated();
        // },
        created(){
            //auth.isAuthenticated();
            console.log('dentro de created') 
            this.getUsers();
        },
        methods:{
            
            async getUsers (){
                console.log('dentro de Users')                
                console.log('cierre Users');  
                const authStore = useAuthStore()
                const newToken = await  authStore.getNewTokenStore();
                this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
                await this.axios.get(this.$baseUrlApi + '/v1/usuRoutes/647bc0f33e27f2f7d4a2ad47')
                .then(response => {
                    if(response.data.status === 'Failed'){
                        this.errorData = response.data.data.error;
                    }

                    this.users = response.data;
                })

                .catch(error => {
                        console.log('error: '+ error);
                })
            }

        },
    }
</script>