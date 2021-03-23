<template lang="pug">
   div.todo-list__item
    div( class="todo-list__item__wrapper" @click="checkItem")
        div(
         :class="['todo-list__item__check', itemValue.done ? 'todo-list__item__check-checked' : '']"
        )
        p(
         :class="['todo-list__item__text', itemValue.done ? 'todo-list__item__text-checked' : '']"
        ) {{ itemValue.description }}
    span(class="todo-list__item__delete" @click="deleteItem") x
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  Ref,
} from '@vue/composition-api';
import axios from 'axios';

import { ItemElement } from '../types/item.interface';

export default defineComponent({
  props: {
    item: Object as PropType<ItemElement>,
    default: {},
  },
  setup(props, context) {
    const itemValue:Ref<ItemElement> = ref(props.item as ItemElement);
    const checkItem = (() => {
      /* eslint no-underscore-dangle: ["error", { "allow": ["value", "_id"] }] */
      const url = `http://localhost:3000/api/v1/todo/${itemValue.value._id}`;

      console.log(url);
      axios
        .put(url, { done: true })
        .then((res) => {
          if (res.status === 200) {
            itemValue.value.done = !itemValue.value.done;
          }
        })
        .catch((err) => console.error(err));
    });

    const deleteItem = (() => {
      /* eslint no-underscore-dangle: ["error", { "allow": ["value", "_id"] }] */
      const url = `http://localhost:3000/api/v1/todo/${itemValue.value._id}`;

      axios
        .delete(url)
        .then((res) => {
          if (res.status === 204) {
            context.emit('delete-item', itemValue.value);
          }
        })
        .catch((err) => console.error(err));
    });

    return {
      checkItem,
      itemValue,
      deleteItem,
    };
  },

});
</script>
