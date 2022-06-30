<template>
  <div class="article-form">
    <div class="mt-3">
      <label for="nameArticle-input" class="form-label">Название поста</label>
      <input
        type="text"
        class="form-control"
        v-model="articleDataForm.title"
        id="nameArticle-input"
        placeholder="Название поста"
      />
    </div>
    <div class="mb-3">
      <label for="textContent-textarea" class="form-label">Контент</label>
      <textarea
        class="form-control"
        v-model="articleDataForm.textContent"
        id="textContent-textarea"
      ></textarea>
    </div>

    <button type="button" class="btn btn-success" @click="createPost">Create Post</button>
  </div>
</template>

<script>
import { firebaseApp } from '../index';
import { getDatabase, ref, set } from 'firebase/database';

const db = getDatabase(firebaseApp);

export default {
  name: 'newArticle',
  data() {
    return {
      articleDataForm: {
        title: '',
        author: '',
        textContent: '',
      },
    };
  },

  methods: {
    clearObjectData(obj) {
      Object.getOwnPropertyNames(obj).forEach((property) => {
        delete obj[property];
      });
    },

    createPost() {
      set(ref(db, `articles/${this.articleDataForm.title}`), this.articleDataForm);

      this.clearObjectData(this.articleDataForm);
    },
  },
};
</script>

<style>
.article-form {
  width: 30rem;
  margin: auto;
}
</style>
