import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'
import axios from 'axios';
import Vuelidate from 'vuelidate';
import { LoadingBar } from 'quasar'
import moment from "moment"
Vue.config.productionTip = false;
Vue.use(Vuelidate);
axios.defaults.timeout = 150000;
axios.interceptors.request.use((request) => {
    let token = localStorage.getItem("jwt");
    if (token) {
        request.headers.Authorization = 'Bearer ' + token;
    }

    LoadingBar.start();
    // set token and other headers
    // for rate service uploading rates, responseType needs to be added in header in service
    if (!request.headers.responseType) {
        request.headers['Content-Type'] = 'application/json';
    }

    return request;
}, error => {
    window.console.log('failed to intercept request');
    Promise.reject(error);
})

axios.interceptors.response.use(response => {
    LoadingBar.stop();
    console.log(response)
    return response;
}, error => {
    // console.log("MIRZA ANEES BAIG BARLAS")
    LoadingBar.stop();
    console.log(error)
    if (error && error.message === 'Request failed with status code 403') {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isAuthenticated');
        console.log("HI")
        router.push('/login');
    }
    return Promise.reject(error);
});
Vue.filter('date', function (dateTimeString) {
    if (!dateTimeString) {
        return '-';
    }
    let momentDate = moment(dateTimeString);
    if (!momentDate) {
        return '-';
    }
    return momentDate.format('DD MMM YYYY');
});
Vue.prototype.$http = axios;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
