<template>
  <h1>{{test}}</h1>
</template>
 
<script>
  export default {
    name: 'App',
    data(){
        return {
            test:$config.test
        }
    }
  }
</script>
 
<style>
  html, body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-size: 16px;
  }
</style>