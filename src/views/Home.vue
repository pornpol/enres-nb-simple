<template>
  <div>
    <section class="section">
      <div class="columns is-mobile" v-for="(item, key) in sysInfo[0]" :key="key">
        <div class="column is-one-fifth" style="text-align:right;">
          {{key}}:
        </div>
        <div class="column">
          {{item}}
        </div>
      </div>
      <!-- <ul id="test">
        <li v-for="(item, key) in sysInfo[0]" :key="key">
          {{key}} : {{item}}
        </li>
      </ul> -->
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {

  data () {
    return {
      hName: "",
      sysInfo : {}
    }
  },
  methods: {
    getSysInfo: function(){
      axios
        .get(this.hName+'/api/systeminfo')
        .then(response => (this.sysInfo = response.data))
    }
  },
  mounted() {
    this.getSysInfo()
  }
}
</script>
