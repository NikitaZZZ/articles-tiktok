<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ article.title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ article.author }}</h6>
      <p class="card-text">{{ article.textContent }}</p>
    </div>
    <div class="button-group">
      <button class="btn btn-outline-danger btn-like" @click="like(article.id)" id="like-button">
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

  methods: {
    like: async function (articleId) {
      await get(child(ref(db), `articles/${articleId}`))
        .then((snapshot) => {
          let likes = snapshot.val().likes;

          if (localStorage.getItem(`like${articleId}`) === null) {
            const updates = {};
            likes += 1;

            updates[`/articles/${articleId}/likes`] = likes;
            localStorage.setItem(`like${articleId}`, true);

            return update(ref(db), updates);
          }
        })
        .then(() => location.reload());
    },
  },
};
</script>

<style>
.card {
  width: 20rem;
  height: 600px;
  overflow: auto;
  margin: 1rem auto 5.4rem;
  border-radius: 0;
}

.button-group {
  width: 20rem;
  position: fixed;
  padding: 1rem;
  bottom: 1rem;
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
