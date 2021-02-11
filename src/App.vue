<template>
  <router-view/>
</template>

<script>
  export default {
    name: 'App',
    methods: {
      checkStorage(){
        let storageData = JSON.parse(localStorage.getItem('state'));
        this.$store.dispatch('setOldData', storageData);
      }
    },
    mounted() {
      this.checkStorage();
    }
  };
</script>
