<template>
  <li class="universal-card">
    <nuxt-link class="universal-card__link" :to="`/${route}/${id}`">
      <h2 class="universal-card__title">{{ name }}</h2>
    </nuxt-link>
  </li>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";

@Component
export default class UniversalCard extends Vue {
  @Prop({required: true}) name!:string
  @Prop({required: true}) id!:number
  @Prop({required: true}) route!:string
}
</script>

<style scoped lang="scss">
@import "universalcard";
</style>
