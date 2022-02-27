<template>
  <form class="filter-form" @submit.prevent ="$emit('submit')">
    <input type="search" class="filter-form__text-input" placeholder="name" v-model="filter.name">
    <button type="submit" class="filter-form__btn">Search</button>
  </form>
</template>

<script lang="ts">
import {Component, Model, Vue} from "nuxt-property-decorator";
import {ICharactersFilter, ILocationsAndEpisodesFilter} from "@/types/filter";

@Component
export default class UniversalFilter extends Vue {
  @Model() filter!:ILocationsAndEpisodesFilter
}
</script>

<style scoped lang="scss">
@import 'filters.scss';
</style>
