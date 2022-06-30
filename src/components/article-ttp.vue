<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ article.title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ article.author }}</h6>
      <p class="card-text">
        {{ article.textContent }}
      </p>
      <a href="#" class="card-link">{{ article.likes }}</a>
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
</style>
