<template>
  <form class="filter-form" @submit.prevent ="$emit('submit')">
    <input type="search" class="filter-form__text-input" placeholder="name" v-model="filter.name">
    <select v-model="filter.status" class="filter-form__select-input">
      <option value="">All</option>
      <option value="alive">alive</option>
      <option value="dead">dead</option>
      <option value="unknown">unknown</option>
    </select>
    <select v-model="filter.gender" class="filter-form__select-input">
      <option value="">All</option>
      <option value="female">female</option>
      <option value="male">male</option>
      <option value="genderless">genderless</option>
      <option value="unknown">unknown</option>
    </select>
    <button type="submit" class="filter-form__btn">Search</button>
  </form>
</template>

<script lang="ts">
import {Component, Model, Vue} from "nuxt-property-decorator";
import {ICharactersFilter} from "@/types/filter";

@Component
export default class CharactersFilter extends Vue {
  @Model() filter!:ICharactersFilter
}
</script>

<style scoped lang="scss">
@import 'filters.scss';
</style>
