<template>
  <header class="header" :class="{'mobile-active': mobileActive}">
    <div class="container header__container">
      <div class="header__logo">
        <img :src="headerLogo" alt="logo" />
      </div>
      <nav class="header__nav">
        <ul class="header__nav-list" :class="{'mobile-active': mobileActive}">
          <li class="header__link">
            <nuxt-link exact class="header__link-item" active-class="header__link-item_active" to="/">
              Main
            </nuxt-link>
          </li>
          <li class="header__link">
            <nuxt-link exact class="header__link-item" active-class="header__link-item_active" to="/character">
              Characters
            </nuxt-link>
          </li>
          <li class="header__link">
            <nuxt-link exact class="header__link-item" active-class="header__link-item_active" to="/location">
              Locations
            </nuxt-link>
          </li>
          <li class="header__link">
            <nuxt-link exact class="header__link-item" active-class="header__link-item_active" to="/episode">
              Episodes
            </nuxt-link>
          </li>
        </ul>
        <button class="header__mobile-btn" :class="{'mobile-active': mobileActive}" @click="toggleMobile">
          <span></span>
        </button>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import headerLogo from '../../assets/img/headerlogo.svg';
@Component
export default class AppHeader extends Vue {
  headerLogo = headerLogo;
  mobileActive: boolean = false;

  toggleMobile():void {
    this.mobileActive = !this.mobileActive;
  }
}
</script>

<style scoped lang="scss">
  @import "appheader";
</style>
