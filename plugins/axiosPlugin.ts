import {NuxtAxiosInstance} from "@nuxtjs/axios";
import {Plugin} from "@nuxt/types";

let axios: NuxtAxiosInstance

const accessor: Plugin = ({$axios}) => {
    axios = $axios
}
export default accessor
export {axios}
