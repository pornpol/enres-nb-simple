<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/event">Event Log</router-link>
      <br>
      <router-link to="/config/datalogger">Datalogger</router-link> |
      <router-link to="/config/powermeter">Power Meter</router-link> |
      <router-link to="/config/analog">Analog</router-link> |
      <router-link to="/config/modbus">Modbus</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding-top: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #427fb9;
}
</style>

<script>
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

export default {
  
}
</script>
