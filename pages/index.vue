<template>
  <div class="main-page">
    <div class="main-page__container container">
      <section class="main-page__description">
        <div class="main-page__logo">
          <img :src="mainLogo" alt="Rick and Morty" />
        </div>
        <div class="main-page__description-text">
          <p>
            <span>Rick and Morty</span> is an American adult animated science fiction sitcom created by Justin Roiland
            and Dan Harmon
            for Cartoon Network's nighttime programming block, Adult Swim. The series follows the misadventures of
            cynical
            mad scientist Rick Sanchez and his good-hearted, but fretful grandson Morty Smith, who split their time
            between domestic life and interdimensional adventures.
          </p>
          <ul class="main-page__description-list">
            <li>
              <p>
                <span>Genre:</span> Animated sitcom,
                Science fiction,
                Black comedy,
                Adventure
              </p>
            </li>
            <li>
              <p>
                <span>Created by:</span> Justin Roiland, Chris Parnell, Spencer Grammer, Sarah Chalke, Kari Wahlgren
              </p>
            </li>
            <li>
              <p>
                <span>Country of origin:</span> United States
              </p>
            </li>
            <li>
              <p>
                <span>No. of seasons:</span> 5
              </p>
            </li>
          </ul>
          <p>There you could find information about <nuxt-link to="/characters">characters</nuxt-link>, <nuxt-link to="/locations">locations</nuxt-link> and
            <nuxt-link to="/episodes">episodes</nuxt-link>.
          </p>
        </div>
      </section>
      <h2 class="main-characters-title">Main Characters</h2>
      <section class="main-characters">
        <characters-card v-for="character in mainCharacters" :img="character.image" :name="character.name" :key="character.id" :id="character.id"/>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import mainLogo from '../assets/img/mainlogo.png';
import {mainStoreModule} from "~/store";
import {ICharacter} from "~/types/state";
import CharactersCard from "~/components/CharactersCard/CharactersCard.vue";

@Component({
  components: {
    CharactersCard
  }
})
export default class MainPage extends Vue {
  @mainStoreModule.Action loadCharacters!:any
  @mainStoreModule.State characters!:ICharacter[]

  get mainCharacters() {
    return this.characters.slice(0, 5)
  }

  async mounted() {
   await this.loadCharacters({
     page: 1
   })
  }

  mainLogo = mainLogo;
}
</script>
<style scoped lang="scss">
@import "assets/style/mainpage";
</style>
