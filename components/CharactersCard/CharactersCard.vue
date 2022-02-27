<template>
  <nuxt-link class="character-card" :to="`/character/${id}`">
    <div class="character-card__img"><img :src="img" alt="characters photo"></div>
    <h2 class="character-card__title">{{name}}</h2>
  </nuxt-link>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";

@Component
export default class CharactersCard extends Vue {
  @Prop({required: true}) img!:string
  @Prop({required: true}) name!:string
  @Prop({required: true}) id!:number

}
</script>

<style scoped lang="scss">
  @import "characterscard";
</style>
