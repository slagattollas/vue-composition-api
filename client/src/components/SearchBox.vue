<template lang="pug">
    div.search-form
        input(
            class="search-form__input"
            type="text"
            placeholder="Search"
            v-model="searchText"
        )
        img(
            class="search-form__icon"
            src="@/assets/icons/search.png"
        )
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
} from '@vue/composition-api';

import { ItemElement } from '../types/item.interface';

export default defineComponent({
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const searchText = ref('');

    watch(searchText, (newValue) => {
      const arr:ItemElement[] = props.items;

      if (newValue.length === 0) {
        context.emit('filtered-items', props.items);
        return true;
      }
      /* eslint-disable */
      const filteredItems:ItemElement[] = arr.filter(x =>  x.description.includes(newValue))

      /* eslint-enable */
      context.emit('filtered-items', filteredItems);
      return true;
    });

    function resetField() {
      searchText.value = '';
      context.emit('filtered-items', props.items);
    }
    return {
      searchText,
      resetField,
    };
  },
});
</script>

<style lang="sass">
@import "@/assets/scss/searchBox.sass";
</style>
