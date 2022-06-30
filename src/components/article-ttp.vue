<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ article.title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ article.author }}</h6>
      <p class="card-text">{{ article.textContent }}</p>

      <div class="button-group">
        <button class="btn btn-outline-success" id="like-button">
          {{ article.likes }} <i class="fas fa-thumbs-up"></i>
        </button>
        <button class="btn btn-outline-danger">
          {{ article.likes }} <i class="fas fa-thumbs-down"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
    },
  },
};
</script>

<style>
.card {
  width: 20rem;
  margin: 1rem auto;
}

#like-button {
  margin-right: 1rem;
}
</style>
