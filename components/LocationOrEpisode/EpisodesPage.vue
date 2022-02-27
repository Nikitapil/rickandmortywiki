<template>
  <div class="container single-page__container">
    <section class="single-page">
      <h2 class="single-page__title">{{ episode.name }}</h2>
      <div class="single-page__info">
        <div class="single-page__info-item">
          <h3 class="singe-page__subtitle">Episode</h3>
          <p class="singe-page__subtext">{{ episode.episode }}</p>
        </div>
        <div class="single-page__info-item">
          <h3 class="singe-page__subtitle">Date</h3>
          <p class="singe-page__subtext">{{ episode.air_date }}</p>
        </div>
      </div>
      <div class="single-page__characters">
        <h2 class="single-page__characters-title">Residents</h2>
        <div class="single-page__characters-cards">
          <characters-card v-for="character in episode.characters" :img="character.image" :name="character.name"
                           :key="character.id" :id="character.id"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";
import {IEpisode, ILocation} from "~/types/state";
import CharactersCard from "~/components/CharactersCard/CharactersCard.vue";

@Component({
  components: {
    CharactersCard
  }
})
export default class EpisodesPage extends Vue {
  @Prop({required: true}) episode!:IEpisode
}
</script>

<style scoped lang="scss">
@import "locationorepisode";
</style>
