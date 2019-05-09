<template>
  <div class="box">
    <h1>{{test}}</h1>
  </div>
</template>
 
 
<script>
import "./style/style.scss";
export default {
  name: "App",
  data() {
    return {
      test: $config.test
    };
  },
  mounted() {
    var asd = [0, 1,3,2,3,3, 1, null, null]
    const arr = [...new Set(asd)];
    console.log(arr)
  }
};
</script>


<style lang="scss" scoped>
.box {
  width: 100%;
  height: 50%;
  overflow: auto;
  margin-top: 100px;
  margin-bottom: 100px;
  background: red;
  -webkit-overflow-scrolling: touch;
  h1 {
    color: #bb9860;
    width: 100%;
    white-space: wrap;
    word-wrap: break-word;
  }
}
</style>
 
 