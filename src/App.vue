<template>
  <h1>{{test}}</h1>
</template>
 
 
<script>
import "./style/style.scss";
export default {
  name: "App",
  data() {
    return {
      test: $config.test
    };
  }
};
</script>


<style lang="scss" scoped>
h1 {
  color: #bb9860;
}
</style>
 
 