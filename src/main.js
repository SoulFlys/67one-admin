import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import router from './router'
import {formatDate} from './filters/filter'
import 'assets/css/reset'
import 'assets/scss/init'
import 'element-ui/lib/theme-default/index'

Vue.filter('formatDate', formatDate);
Vue.use(ElementUI);

new Vue({
    el: '#app',
    template: '<App/>',
    router: router,
    components: {
        App
    }
})
