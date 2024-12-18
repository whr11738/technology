<template>
  <div class="w100w h100h fc" style="">
    <div id="fatherDom">
      <div id="dom1">
        <div>dom1</div>
      </div>
      <div id="dom2">
        <div>dom2</div>
      </div>
      <div id="dom3">
        <div>dom3</div>
      </div>
      <div id="dom4">
        <div>dom4</div>
      </div>
      <div id="dom5">
        <div>dom5</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, provide } from "vue";
import * as __ from "@/utils/tool.js";

onMounted(() => {
  setTimeout(() => {
    // console.log(__.getDom("dom3"));
    // console.log('copyDom("dom1")', __.copyDom("dom1"));
    // __.addDom("fatherDom", __.copyDom("dom1"));
    // __.delDom("fatherDom", "dom2");
    // __.moveDom("fatherDom", "dom4", "dom2");
    // __.sortDom("fatherDom", ["dom5", "dom1", "dom4", "dom2", "dom3"]);
  }, 2000);
});
</script>

<style scoped></style>
