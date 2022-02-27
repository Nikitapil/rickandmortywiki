<template>
  <div class="container single-page__container">
    <section class="single-page">
      <h2 class="single-page__title">{{ location.name }}</h2>
      <div class="single-page__info">
        <div class="single-page__info-item">
          <h3 class="singe-page__subtitle">Type</h3>
          <p class="singe-page__subtext">{{ location.type }}</p>
        </div>
        <div class="single-page__info-item">
          <h3 class="singe-page__subtitle">Dimension</h3>
          <p class="singe-page__subtext">{{ location.dimension }}</p>
        </div>
      </div>
      <div class="single-page__characters">
        <h2 class="single-page__characters-title">Residents</h2>
        <div class="single-page__characters-cards">
            <characters-card v-for="character in location.residents" :img="character.image" :name="character.name"
                             :key="character.id" :id="character.id"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "nuxt-property-decorator";
import {ILocation} from "~/types/state";
import CharactersCard from "~/components/CharactersCard/CharactersCard.vue";

@Component({
  components: {
    CharactersCard
  }
})
export default class LocationPage extends Vue {
  @Prop({required: true}) location!:ILocation
}
</script>

<style scoped lang="scss">
@import "locationorepisode";
</style>
