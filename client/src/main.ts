import VueCompositionAPI from '@vue/composition-api';
import Vue from 'vue';

import App from './App.vue';
import AddItem from './components/AddItem.vue';
import ListItem from './components/ListItem.vue';
import SearchBox from './components/SearchBox.vue';
import TodoList from './components/TodoList.vue';

Vue.component('add-item-component', AddItem);
Vue.component('list-item-component', ListItem);
Vue.component('serch-box-component', SearchBox);
Vue.component('TodoList', TodoList);

Vue.config.productionTip = false;

Vue.use(VueCompositionAPI);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
