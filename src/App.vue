<template>
  <swiper
    :modules="modules"
    :direction="vertical"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <Swiper-slide v-for="article in articles" :key="article.title"
      ><articleTTP :article="article"
    /></Swiper-slide>
  </swiper>

  <button
    class="btn btn-outline-success position-absolute top-100 translate-middle"
    data-bs-toggle="modal"
    data-bs-target="#create-new-article-modal"
  >
    <i class="fas fa-plus"></i>
  </button>

  <div class="modal" id="create-new-article-modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <newArticle />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/effect-fade';

import { getDatabase, ref, onChildAdded } from 'firebase/database';

import articleTTP from './components/article-ttp.vue';
import newArticle from './components/newArticle.vue';

import { firebaseApp } from './index';

const db = getDatabase(firebaseApp);

export default {
  name: 'App',
  data() {
    return {
      articles: [],
    };
  },

  components: {
    articleTTP,
    newArticle,
    Swiper,
    SwiperSlide,
  },

  created: function () {
    const articleRef = ref(db, 'articles/');

    onChildAdded(articleRef, (data) => {
      const dataArticle = data.val();

      this.articles.push(dataArticle);
    });
  },

  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };

    return {
      onSwiper,
      onSlideChange,
      modules: [EffectFade],
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
