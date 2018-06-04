<template>
    <div id="index">
        用户信息
    </div>
</template>

<script>
export default {
  methods: {
    fetchSomething() {
      this.$axios.$get('/v2/brokerVips','')
        .then((res) =>{
          self.menuList = res.item
        })
    }
  },
  created: function() {
    this.fetchSomething()
  }
}
</script>

<style>

</style>
