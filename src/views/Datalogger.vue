<template>
  <div>
    <section class="section">
      <div class="container">
        <form @submit.prevent="formSubmit">
          <b-field label="WiFi AP Name" label-position="on-border">
            <b-input v-model="configs.apName" placeholder="WiFi Access Point Name"></b-input>
          </b-field>
          <b-field label="WiFi AP Password" label-position="on-border">
            <b-input v-model="configs.apPass" placeholder="WiFi Access Point Password"></b-input>
          </b-field>

          <b-field label="WiFi STA Name" label-position="on-border">
            <b-input v-model="configs.staName" placeholder="WiFi Station Name"></b-input>
          </b-field>
          <b-field label="WiFi STA Password" label-position="on-border">
            <b-input v-model="configs.staPass" placeholder="WiFi Station Password"></b-input>
          </b-field>

          <b-field label="Server Address" label-position="on-border">
            <b-input v-model="configs.server" placeholder="http://"></b-input>
          </b-field>
          <b-field label="Access Token" label-position="on-border">
            <b-input v-model="configs.token" placeholder="token"></b-input>
          </b-field>

          <b-field label="Power Meter Path (Single)" label-position="on-border">
            <b-input v-model="configs.meterPath" placeholder="/path"></b-input>
          </b-field>
          <b-field label="Power Meter Path (Batch)" label-position="on-border">
            <b-input v-model="configs.meterPathBatch" placeholder="/path_batch"></b-input>
          </b-field>    

          <b-field label="Analog Path (Single)" label-position="on-border">
            <b-input v-model="configs.sensorPath" placeholder="/path"></b-input>
          </b-field>
          <b-field label="Analog Path (Batch)" label-position="on-border">
            <b-input v-model="configs.sensorPathBatch" placeholder="/path_batch"></b-input>
          </b-field>

          <b-field label="Modbus Path (Single)" label-position="on-border">
            <b-input v-model="configs.genericPath" placeholder="/path"></b-input>
          </b-field>
          <b-field label="Modbus Path (Batch)" label-position="on-border">
            <b-input v-model="configs.genericPathBatch" placeholder="/path_batch"></b-input>
          </b-field>      

          <b-field label="Upload Type" label-position="on-border">
            <b-select v-model="configs.upload" expanded>
              <option value="0">None</option>
              <option value="1">WiFi</option>
              <option value="2">NB-Iot</option>
            </b-select>
          </b-field>

          <b-field label="Upload Interval (Seconds)" label-position="on-border">
              <b-numberinput  v-model="configs.interval" min="60" step="10"></b-numberinput>
          </b-field>

          <b-field label="Data Logger Type" label-position="on-border">
            <b-select v-model="configs.loggerType" expanded>
              <option value="0">None</option>
              <option value="1">Power Meter</option>
              <option value="2">Power Quality Meter</option>
              <option value="3">Analog</option>
              <option value="4">Modbus</option>
            </b-select>
          </b-field>

          <b-field label="Modbus Configuration" label-position="on-border">
            <b-select v-model="configs.modbusConfig" expanded>
              <option value="0">9600, 8, N, 1</option>
              <option value="1">9600, 8, E, 1</option>
              <option value="2">9600, 8, O, 1</option>
              <option value="3">19200, 8, N, 1</option>
              <option value="4">19200, 8, E, 1</option>
              <option value="5">19200, 8, O, 1</option>
              <option value="6">38400, 8, N, 1</option>
              <option value="7">38400, 8, E, 1</option>
              <option value="8">38400, 8, O, 1</option>
            </b-select>
          </b-field>

          <b-field label="AP Mode Time-out (Seconds)" label-position="on-border">
              <b-numberinput  v-model="configs.timeAp" min="30" step="10"></b-numberinput>
          </b-field>

          <b-field>
            <div class="buttons">
              <b-button type="is-primary" native-type="submit">Submit</b-button>
              <b-button class="is-success" @click="getGlobalConfig">Refresh</b-button>
            </div>
          </b-field>
        </form>
      </div>
    </section>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data () {
    return {
      configs: "",
      hName: ""
    }
  },
  methods: {
    formSubmit () {
      console.log("Submit")
      axios
        .post(this.hName+'/api/globalconfig', [this.configs])
        // .then(response => (console.log(response.data)))
    },
    getGlobalConfig() {
      console.log("Reload")
      axios
        .get(this.hName+'/api/globalconfig')
        .then(response => (this.configs = response.data[0]))
    }
  },
  mounted () {
    this.getGlobalConfig()
  }
}
</script>