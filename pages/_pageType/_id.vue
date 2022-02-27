<template>
  <div>
    <section class="loader" v-if="isDataLoading"><img :src="loader" alt="loading animation"></section>
    <section class="error" v-if="isDataError">
      <h2 class="error__title">Information not found</h2>
      <div class="error__img"><img :src="error" alt="error gif"></div>
    </section>
    <component
        v-if="singleItem && !isDataLoading"
        :is="singleComponent"
        :character="singleItem"
        :location="singleItem"
        :episode="singleItem"
    />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {EPageType} from "~/types/constants";
import CharacterPage from "~/components/CharacterPage/CharacterPage.vue";
import {mainStoreModule} from "~/store";
import {ICharacter, IEpisode, ILocation, ISingleParams} from "~/types/state";
import loader from '../../assets/img/loader.gif'
import error from '../../assets/img/notfound.gif'
import LocationPage from "~/components/LocationOrEpisode/LocationPage.vue";
import EpisodesPage from "~/components/LocationOrEpisode/EpisodesPage.vue";

@Component({
  components: {
    CharacterPage,
    LocationPage,
    EpisodesPage
  }
})
export default class SinglePage extends Vue {
  @mainStoreModule.Action loadSingleItem!: any
  @mainStoreModule.State singleItem!: ICharacter | ILocation | IEpisode | null
  @mainStoreModule.State isDataLoading!: boolean
  @mainStoreModule.State isDataError!: boolean
  singleParams: ISingleParams = {
    pageType: this.$route.params.pageType,
    id: this.$route.params.id
  }
  loader = loader
  error = error

  validate({params}:any) {
    return !isNaN(Number(params.id))
  }

  async beforeMount() {
   await this.loadSingleItem(this.singleParams)
    console.log(!isNaN(Number(this.$route.params.id)))
  }
  get singleComponent() {
    switch (this.$route.params.pageType) {
      case EPageType.CHARACTER:
        return CharacterPage
      case EPageType.LOCATION:
        return LocationPage
      case EPageType.EPISODE:
        return EpisodesPage
    }
  }
}
</script>

<style scoped>

</style>
