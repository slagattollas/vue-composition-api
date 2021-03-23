<template lang="pug">
  div.container
    div.container__wrapper
      serch-box-component( ref="searchBox" :items="todos.items" @filtered-items="filterItems")
      div.todo-list
          add-item-component( @add-new-item="addItem")
          div( v-if="todos.items && todos.items.length > 0")
            list-item-component(
              v-for="i in filteredItems"
              :key="i._id"
              :item="i"
              @delete-item="deleteItem"
            )
      div.pagination
</template>

<script lang="ts">

import {
  defineComponent, onMounted, ref, Ref,
} from '@vue/composition-api';
import axios from 'axios';

import { Item, ItemElement } from '../types/item.interface';

export default defineComponent({
  setup() {
    const todos:Ref<Item> = ref({} as Item);
    const filteredItems:Ref<ItemElement[]> = ref([] as ItemElement);
    const searchBox = ref(null);

    onMounted(() => {
      axios
        .get('http://localhost:3000/api/v1/todo/')
        .then((res) => {
          const respuesta = res.data as Item;

          todos.value = respuesta;
          filteredItems.value = respuesta.items;
        })
        .catch((err) => { console.error(err); });
    });

    function addItem(newItem: ItemElement) {
      todos.value.items.push(newItem);
      filteredItems.value = [...todos.value.items];
      /* eslint-disable */
      searchBox.value.resetField();
      /* eslint-enable */
    }

    function deleteItem(dItem: ItemElement) {
      /* eslint no-underscore-dangle: ["error", { "allow": ["value", "_id"] }] */
      todos.value.items = todos.value.items.filter((x) => x._id !== dItem._id);
      filteredItems.value = filteredItems.value.filter((x) => x._id !== dItem._id);
    }

    function filterItems(filtered: ItemElement[]) {
      filteredItems.value = [...filtered];
    }

    return {
      todos,
      addItem,
      deleteItem,
      filterItems,
      filteredItems,
      searchBox,
    };
  },
});
</script>

<style lang="sass">
@import "@/assets/scss/main.sass";
</style>
