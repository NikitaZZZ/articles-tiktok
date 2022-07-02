<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ article.title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ article.author }}</h6>
      <p class="card-text">{{ article.textContent }}</p>

      <div class="button-group">
        <button class="btn btn-outline-success" @click="like(article.id)" id="like-button">
          {{ article.likes }} <i class="fas fa-thumbs-up"></i>
        </button>
      </div>
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
      await get(child(ref(db), `articles/${articleId}`)).then((snapshot) => {
        let likes = snapshot.val().likes;

        const updates = {};
        likes += 1;

        updates[`/articles/${articleId}/likes`] = likes;
        return update(ref(db), updates);
      });
    },
  },
};
</script>

<style>
.card {
  width: 20rem;
  margin: 1rem auto;
}
</style>
