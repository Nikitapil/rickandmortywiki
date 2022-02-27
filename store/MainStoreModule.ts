import {Module, VuexModule, Mutation, Action} from "vuex-module-decorators";
import {ICharacter, IEpisode, ILocation, ISingleParams} from "~/types/state";
import {axios} from "~/plugins/axiosPlugin";
import store from "~/store/store";
import {ICharactersFilter, ILocationsAndEpisodesFilter} from "~/types/filter";
import {EPageType} from "~/types/constants";


@Module({
    dynamic: true,
    name: "MainStoreModule",
    stateFactory: true,
    namespaced: true,
    store
})
export default class MainStoreModule extends VuexModule {
    characters: ICharacter[] = [];
    locations: ILocation[] = [];
    episodes: IEpisode[] = [];
    totalPages: number = 0;
    singleItem: ICharacter | ILocation | IEpisode | null = null;
    isDataLoading:boolean = false;
    isDataError: boolean = false

    @Mutation
    setCharacters(characters: ICharacter[]) {
        this.characters = characters
    }

    @Mutation
    setIsDataError(bool:boolean) {
        this.isDataError = bool
    }

    @Mutation
    setLocations(locations: ILocation[]) {
        this.locations = locations
    }

    @Mutation
    setEpisodes(episodes: IEpisode[]) {
        this.episodes = episodes
    }

    @Mutation
    setTotalPages(totalCount: number) {
        this.totalPages = totalCount
    }

    @Mutation
    setIsDataLoading(bool: boolean) {
        this.isDataLoading = bool
    }

    @Mutation
    setSingleItem(singleItem: ICharacter | ILocation | IEpisode) {
        this.singleItem = singleItem
    }

    @Action({ rawError: true })
    async loadCharacters(filter:ICharactersFilter) {
        try {
            this.context.commit('setIsDataError', false)
            this.context.commit('setIsDataLoading', true)
            const response = await axios.$get('https://rickandmortyapi.com/api/character', {
                params: {
                    page: filter.page,
                    name: filter.name,
                    status: filter.status,
                    gender: filter.gender,
                }
            })
            this.context.commit('setCharacters', response.results)
            this.context.commit('setTotalPages', response.info.pages)
        } catch (e) {
            console.error(e)
            this.context.commit('setIsDataError', true)
        }
        finally {
            this.context.commit('setIsDataLoading', false)
        }
    }

    @Action({ rawError: true })
    async loadLocations(filter:ILocationsAndEpisodesFilter) {
        try {
            this.context.commit('setIsDataError', false)
            this.context.commit('setIsDataLoading', true)
            const response = await axios.$get('https://rickandmortyapi.com/api/location', {
                params: {
                    page: filter.page,
                    name: filter.name,
                }
            })
            this.context.commit('setLocations', response.results)
            this.context.commit('setTotalPages', response.info.pages)
        } catch (e) {
            console.error(e)
            this.context.commit('setIsDataError', true)
        }
        finally {
            this.context.commit('setIsDataLoading', false)
        }
    }

    @Action({ rawError: true })
    async loadEpisodes(filter:ILocationsAndEpisodesFilter) {
        try {
            this.context.commit('setIsDataError', false)
            this.context.commit('setIsDataLoading', true)
            const response = await axios.$get('https://rickandmortyapi.com/api/episode', {
                params: {
                    page: filter.page,
                    name: filter.name,
                }
            })
            this.context.commit('setEpisodes', response.results)
            this.context.commit('setTotalPages', response.info.pages)
        } catch (e) {
            console.error(e)
            this.context.commit('setIsDataError', true)
        }
        finally {
            this.context.commit('setIsDataLoading', false)
        }
    }

    @Action({ rawError: true })
    async loadSingleItem(params: ISingleParams) {
        try {
            this.context.commit('setIsDataError', false)
            this.context.commit('setIsDataLoading', true)
            const response = await axios.$get(`https://rickandmortyapi.com/api/${params.pageType}/${params.id}`)
            this.context.commit('setSingleItem', response)
            if (params.pageType === EPageType.CHARACTER) {
                const episodes = await Promise.all(response.episode.map((item:string) => axios.$get(item)))
                this.context.commit('setSingleItem', {...response, episode: episodes})
            }
            if (params.pageType === EPageType.LOCATION) {
                const episodes = await Promise.all(response.residents.map((item:string) => axios.$get(item)))
                this.context.commit('setSingleItem', {...response, residents: episodes})
            }
            if (params.pageType === EPageType.EPISODE) {
                const episodes = await Promise.all(response.characters.map((item:string) => axios.$get(item)))
                this.context.commit('setSingleItem', {...response, characters: episodes})
            }
        } catch (e) {
            console.error(e)
             this.context.commit('setIsDataError', true)
        }
        finally {
            this.context.commit('setIsDataLoading', false)
        }
    }
}
