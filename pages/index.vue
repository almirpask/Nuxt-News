<template>
  <div class="md-layout alignment-center">
    <md-toolbar class="fixed-toolbar" elevation="1">
      <md-button class="md-icon-button">
        <md-icon>menu</md-icon>
      </md-button>
      <nuxt-link class="md-primary md-title" to="/">
        NuxtNews
      </nuxt-link>
      <div class="md-toolbar-section-end">
        <nuxt-link class="md-button" to="/login">
          <md-ripple>
            <div class="md-button-content" style="color: white;">
              Login
            </div>
          </md-ripple>
        </nuxt-link>
        <nuxt-link class="md-button" to="/register">
          <md-ripple>
            <div class="md-button-content" style="color: white;">
              Register
            </div>
          </md-ripple>
        </nuxt-link>
        <md-button class="md-accent" @click="showRightSidepanel = true">Categories</md-button>
        <!-- <md-button to="/login">Login</md-button> -->
        <!-- <md-button to="/register">Register</md-button> -->
      </div>
    </md-toolbar>

    <md-drawer class="md-right" md-fixed :md-active.sync="showRightSidepanel">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">News Categories</span>
      </md-toolbar>

      <md-progress-bar v-if="loading" md-mode="indeterminate"></md-progress-bar>

      <md-list>
        <md-subheader class="md-primary">Categories</md-subheader>
        <md-list-item v-for="(newsCategory, i) in newsCategories" :key="i" @click="loadCategory(newsCategory.path)">
          <md-icon :class="newsCategory.path === category? 'md-primary' : ''">{{newsCategory.icon}}</md-icon>
          <span class="md-list-item-text">{{newsCategory.name}}</span>
        </md-list-item>
      </md-list>
    </md-drawer>
    <div class="md-layout-tem md-size-95">
      <md-content class="md-layout md-gutter" style="background-color: #007998; padding: 1em;">
        <ul v-for="headline in headlines" :key="headline.id"
          class="md-layout-item
          md-large-size-25
          md-medium-size-33
          md-small-size-50
          md-xsmall-size-100">
          <md-card style="margin-top: 1em;" md-with-hover>
            <md-ripple>
              <md-card-media md-ratio="16:9">
                <img :src="headline.urlToImage" :alt="headline.title">
              </md-card-media>
              <md-card-header>
                <div class="md-title">
                  <a :href="headline.url" target="_blank">{{headline.title}}</a>
                </div>
                <div>
                  {{headline.source.name}}
                  <md-icon class="small-icon">book</md-icon>
                </div>
                <div class="md-subhead" v-if="headline.author">
                  {{headline.author}}
                  <md-icon class="small-icon">face</md-icon>
                </div>
                <div class="md-subhead">
                  {{headline.publishedAt}}
                  <md-icon class="small-icon">alarm</md-icon>
                </div>
              </md-card-header>
              <md-card-content>{{headline.description}}</md-card-content>
              <md-card-actions>
                <md-button class="md-icon-button">
                  <md-icon>bookmark</md-icon>
                </md-button>
                <md-button class="md-icon-button">
                  <md-icon>message</md-icon>
                </md-button>
              </md-card-actions>
            </md-ripple>
          </md-card>

        </ul>
      </md-content>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      showRightSidepanel: false,
      newsCategories: [
        { name: 'To Headlines', path: '', icon: 'today'},
        { name: 'Technology', path: 'technology', icon: 'keyboard'},
        { name: 'Business', path: 'business', icon: 'business_center'},
        { name: 'Entertainment', path: 'entertainment', icon: 'weekend'},
        { name: 'Health', path: 'health', icon: 'fastfood'},
        { name: 'Science', path: 'science', icon: 'fingerprint'},
        { name: 'Sports', path: 'sports', icon: 'golf_course'},

      ]
    }
  },
  async fetch({ store }) {
    await store.dispatch('loadHeadlines', `/api/top-headlines?country=br&category=${store.state.category}`)
  },
  computed: {
    headlines() {
      return this.$store.getters.headlines;
    },
    category() {
      return this.$store.getters.category;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    async loadCategory(category) {
      this.$store.commit('setCategory', category);
      await this.$store.dispatch('loadHeadlines', `/api/top-headlines?country=br&category=${this.category}`)
    }
  }
}
</script>

<style scoped>
  .small-icon {
    font-size: 18px !important;
  }
  .fixed-toolbar {
    position: fixed;
    top: 0;
    z-index: 5;
  }
</style>
