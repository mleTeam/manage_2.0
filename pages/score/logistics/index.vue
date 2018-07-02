<template>
    <div id="index">
          <div v-for="item in items">
            <button @click="deleteById(item.id)"></button>
          </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      items:[]
    }
  },
  methods: {
    deleteById(id) {

    }
  }
}
</script>
