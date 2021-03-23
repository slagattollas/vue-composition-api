<template lang="pug">
    div( class="todo-list__item todo-list__item-no-border " @click="addItem" @keyup.enter="addItem")
        input(
            class="todo-list__item__input"
            type="text"
            placeholder="Take a note"
            v-model="itemText"
        )
        span.todo-list__item__add +
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  Ref,
} from '@vue/composition-api';
import axios from 'axios';

import { ItemElement } from '../types/item.interface';

export default defineComponent({

  setup(props, context) {
    const itemText:Ref<string> = ref('');

    const addItem = (() => {
      if (!itemText.value) return false;

      return axios
        .post('http://localhost:3000/api/v1/todo/', { description: itemText.value })
        .then((res) => {
          if (res.status === 200) {
            const respuesta = res.data as ItemElement;

            itemText.value = '';
            context.emit('add-new-item', respuesta);
            return true;
          }

          return false;
        })
        .catch((err) => { console.error(err); return false; });
    });

    return {
      itemText,
      addItem,
    };
  },
});
</script>
