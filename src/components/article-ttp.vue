<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ article.title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ article.author }}</h6>
      <p class="card-text">{{ article.textContent }}</p>
    </div>
    <div class="button-group">
      <button :class="btnLiked" @click="like(article.id)" id="like-button">
        {{ article.likes }} <i class="fas fa-heart"></i>
      </button>
      <button class="btn btn-outline-danger btn-subscribe" style="margin-left: 1rem">
        <i class="fas fa-plus"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { getDatabase, ref, update, get, child } from '@firebase/database';
import { firebaseApp } from '../index';

const db = getDatabase(firebaseApp);

export default {
  props: {
    article: {
      type: Object,
    },
  },

  data() {
    return {
      btnLiked: 'btn btn-outline-danger',
      currentArticleId: 0,
    };
  },

  methods: {
    like: async function (articleId) {
      this.currentArticleId = articleId;

      await get(child(ref(db), `articles/${articleId}`)).then((snapshot) => {
        const likedArticles_lc = JSON.parse(localStorage.getItem(`likedArticles`));
        let likes = snapshot.val().likes;
        const updates = {};

        if (likedArticles_lc !== null && !likedArticles_lc.includes(articleId)) {
          likes += 1;

          updates[`/articles/${articleId}/likes`] = likes;

          const likedPosts = JSON.parse(likedArticles_lc).push(`article-${articleId}`);
          localStorage.setItem(`likedArticles`, JSON.stringify(likedPosts));

          this.btnLiked =
            this.btnLiked === 'btn btn-danger' ? 'btn btn-outline-danger' : 'btn btn-danger';

          return update(ref(db), updates);
        } else if (likedArticles_lc === null) {
          likes += 1;

          updates[`/articles/${articleId}/likes`] = likes;

          const likedPosts = [`article-${articleId}`];
          localStorage.setItem(`likedArticles`, JSON.stringify(likedPosts));

          this.btnLiked =
            this.btnLiked === 'btn btn-danger' ? 'btn btn-outline-danger' : 'btn btn-danger';

          return update(ref(db), updates);
        }
      });
    },
  },
};
</script>

<style>
.card {
  overflow: auto;
  max-width: 50rem;
  margin: 1rem auto 5.4rem;
  border-radius: 0;
}

.button-group {
  width: 20rem;
  margin: auto;
  padding: 1rem;
}

.btn-like {
  float: left;
  margin-left: 1rem;
}

.btn-subscribe {
  float: right;
  margin-right: 1rem;
}
</style>
