<template>
  <articleTTP v-for="article in articles" :key="article.title" :article="article" />

  <newArticle />
</template>

<script>
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
  },

  created: function () {
    const articleRef = ref(db, 'articles/');

    onChildAdded(articleRef, (data) => {
      const dataArticle = data.val();

      this.articles.push(dataArticle);
    });
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
