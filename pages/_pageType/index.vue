<template>
  <div class="container scope-page__container">
    <h1 class="scope-page__title">{{ path }}s</h1>
    <section class="loader" v-if="isDataLoading"><img :src="loader" alt="loading animation"></section>
    <div v-else class="items-container">
      <component
          :is="filterComponent"
          v-model="filterParams"
          @submit="onFilterSubmit"
      />
      <section class="error" v-if="isDataError">
        <h2 class="error__title">Information not found</h2>
        <div class="error__img"><img :src="error" alt="error gif"></div>
      </section>
      <section v-if="path === 'character' && !isDataError" class="items">
        <characters-card v-for="character in characters" :img="character.image" :name="character.name"
                         :key="character.id" :id="character.id"/>
      </section>
      <ul v-if="path === 'location' && !isDataError" class="items">
        <universal-card v-for="location in locations" :key="location.id" route="location" :id="location.id" :name="location.name"/>
      </ul>
      <ul v-if="path === 'episode' && !isDataError" class="items">
        <universal-card v-for="episode in episodes" :key="episode.id" route="episode" :id="episode.id" :name="episode.name"/>
      </ul>
      <section class="scope-page__pagination" v-if="!isDataError">
        <span class="scope-page__page-number">Page: </span>
        <select v-model="currentPage">
          <option v-for="p in totalPages" :value="p">{{ p }}</option>
        </select>
        <button v-if="currentPage !==totalPages" @click="nextPage" class="scope-page__next-btn">Next</button>
      </section>
    </div>

  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "nuxt-property-decorator";
import {EPageType} from "@/types/constants";
import {mainStoreModule} from "@/store";
import {ICharacter, IEpisode, ILocation} from "~/types/state";
import CharactersCard from "~/components/CharactersCard/CharactersCard.vue";
import loader from '../../assets/img/loader.gif'
import CharactersFilter from "~/components/filters/charactersFilter.vue";
import {ICharactersFilter, ILocationsAndEpisodesFilter} from "~/types/filter";
import UniversalCard from "~/components/UniversalCard/UniversalCard.vue";
import UniversalFilter from "~/components/filters/UniversalFilter.vue";
import error from '../../assets/img/notfound.gif'

@Component({
  components: {
    CharactersCard,
    CharactersFilter,
    UniversalCard,
    UniversalFilter
  }
})
export default class ScopedPage extends Vue {
  @mainStoreModule.Action loadCharacters!: any
  @mainStoreModule.Action loadLocations!: any
  @mainStoreModule.Action loadEpisodes!: any
  @mainStoreModule.State characters!: ICharacter[]
  @mainStoreModule.State locations!: ILocation[]
  @mainStoreModule.State episodes!: IEpisode[]
  @mainStoreModule.State totalPages!: number
  @mainStoreModule.State isDataLoading!: boolean
  @mainStoreModule.State isDataError!: boolean
  currentPage: number = 1
  path = ''
  loader = loader
  error = error
  charactersFilter: ICharactersFilter = {
    name: '',
    status: '',
    gender: '',
    page: this.currentPage
  }

  locationAndEpisodesFilter: ILocationsAndEpisodesFilter = {
    name: '',
    page: this.currentPage
  }

  validate({params}: any) {
    return params.pageType === EPageType.CHARACTER || params.pageType === EPageType.LOCATION || params.pageType === EPageType.EPISODE
  }

  async mounted() {
    this.path = this.$route.params.pageType
    await this.loadInfo()
  }

  nextPage() {
    this.currentPage += 1
  }

  async loadInfo() {
    switch (this.path) {
      case EPageType.CHARACTER:
        await this.loadCharacters(this.charactersFilter)
        break
      case EPageType.LOCATION:
        await this.loadLocations(this.locationAndEpisodesFilter)
        break
      case EPageType.EPISODE:
        await this.loadEpisodes(this.locationAndEpisodesFilter)
        break
    }
  }

  get filterComponent() {
    switch (this.path) {
      case EPageType.CHARACTER:
        return CharactersFilter
      default:
        return UniversalFilter
    }
  }

  get filterParams() {
    switch (this.path) {
      case EPageType.CHARACTER:
        return this.charactersFilter
      default:
        return this.locationAndEpisodesFilter
    }
  }

  async onFilterSubmit() {
    this.currentPage = 1
    await this.loadInfo()
  }

  @Watch('currentPage')
  async changePage() {
    this.filterParams!.page = this.currentPage
    await this.loadInfo()
  }
}
</script>

<style scoped lang="scss">
@import "assets/style/scopepage.scss";
</style>
