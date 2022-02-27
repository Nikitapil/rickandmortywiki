<template>
  <div class="container character__container">
    <section class="character">
      <div class="character__avatar"><img :src="character.image" alt="character avatar"></div>
      <h2 class="character__name">{{ character.name }}</h2>
      <div class="character__data">
        <div class="character__data-item">
          <h2 class="character__data-title">Information</h2>
          <ul class="character__info">
            <li class="character__info-item info-item">
              <h3 class="info-item__title">Gender</h3>
              <p class="info-item__description">{{ character.gender }}</p>
            </li>
            <li class="character__info-item info-item">
              <h3 class="info-item__title">Status</h3>
              <p class="info-item__description">{{ character.status }}</p>
            </li>
            <li class="character__info-item info-item">
              <h3 class="info-item__title">Specie</h3>
              <p class="info-item__description">{{ character.species }}</p>
            </li>
            <li class="character__info-item info-item">
              <h3 class="info-item__title">Origin</h3>
              <p class="info-item__description">{{ character.origin.name }}</p>
            </li>
            <li class="character__info-item info-item">
              <h3 class="info-item__title">Type</h3>
              <p class="info-item__description">{{ character.type }}</p>
            </li>
            <li class="character__info-item info-item info-item-link">
              <nuxt-link class="info-item__link" :to="character.location.url.slice(31, -1)">
                <h3 class="info-item__title">Location</h3>
                <p class="info-item__description">{{ character.location.name }}</p>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="character__data-item">
          <h2 class="character__data-title">Episodes</h2>
          <ul class="character__episodes">
            <li class="character__info-item info-item-link" v-for="episode in character.episode">
              <nuxt-link class="info-item__link" :to="`/episode/${episode.id}`">
                <h3 class="info-item__title">{{ episode.episode }}</h3>
                <p class="info-item__description">{{ episode.name }}</p>
                <p class="info-item__description">{{ episode.air_date }}</p>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";
import {ICharacter} from "~/types/state";

@Component
export default class CharacterPage extends Vue {
  @Prop({required: true}) character!:ICharacter
}
</script>

<style scoped lang="scss">
@import "characterpage";
</style>
