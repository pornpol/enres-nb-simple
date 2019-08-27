<template>
  <div>
    <section class="section">
      <div class="container">
        <b-table :data="allSensorAdj" :columns="columns" @click="reloadRow" :selected.sync="selected">
        </b-table>
      </div>
      <br>
      <div class="container">
        <form @submit.prevent="formSubmit">
          <b-field label="Sensor ID" label-position="on-border" expanded>
            <b-input placeholder="1" v-model="sensor.sensorId"></b-input>
          </b-field>

          <b-field label="External ID" label-position="on-border" expanded>
            <b-input placeholder="100" v-model="sensor.exid"></b-input>
          </b-field>

          <b-field v-for="(v, index) in sensor.value" :key="`${index}`" Group>
            <b-field label="Channel" label-position="on-border" expanded>
              <b-select v-model="v.vd"> 
                <option value="-1">None</option>
                <option value="0">1</option>
                <option value="1">2</option>
                <option value="2">3</option>
                <option value="3">4</option>
                <option value="4">5</option>
                <option value="5">6</option>
                <option value="6">7</option>
                <option value="7">8</option>
              </b-select>
            </b-field>
            <b-field label="Min" label-position="on-border" expanded>
              <b-input type="number" placeholder="4" v-model="v.min"></b-input>
            </b-field>
            <b-field label="Max" label-position="on-border" expanded>
              <b-input type="number" placeholder="20" v-model="v.max"></b-input>
            </b-field>
            <b-field label="Key Name" label-position="on-border" expanded>
              <b-input type="text" :placeholder="`vd${index+1}`" v-model="v.key"></b-input>
            </b-field>
          </b-field>

          <b-field>
            <div class="buttons">
              <b-button type="is-primary" native-type="submit">Add/Edit</b-button>
              <b-button class="is-danger" @click="deleteSensor(sensor.sensorId)">Delete</b-button>
              <b-button class="is-success" @click="getAllSensors">Refresh</b-button>
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
      hName: "",
      allSensors: [],
      selected: null,
      sensor: {
        "sensorId": "",
        "exid": "",
        "value": [
        {
          "vd": "",
          "min": "",
          "max": "",
          "key": ""
        },
        {
          "vd": "",
          "min": "",
          "max": "",
          "key": ""
        },
        {
          "vd": "",
          "min": "",
          "max": "",
          "key": ""
        },
        {
          "vd": "",
          "min": "",
          "max": "",
          "key": ""
        },
        {
          "vd": "",
          "min": "",
          "max": "",
          "key": ""
        },
        {
          "vd": "",
          "min": "",
          "max": "",
          "key": ""
        },
        {
          "vd": "",
          "min": "",
          "max": "",
          "key": ""
        },
        {
          "vd": "",
          "min": "",
          "max": "",
          "key": ""
        }]     
      },  
      columns: [
        {field: 'sensorId', label: 'Sensor ID'},
        {field: 'exid', label: 'External ID'},
        {field: 'v1', label: 'Value 1'},
        {field: 'v2', label: 'Value 2'},
        {field: 'v3', label: 'Value 3'},
        {field: 'v4', label: 'Value 4'},
        {field: 'v5', label: 'Value 5'},
        {field: 'v6', label: 'Value 6'},
        {field: 'v7', label: 'Value 7'},
        {field: 'v8', label: 'Value 8'}
      ],
    }
  },
  methods: {
    formSubmit (e) {
      e.preventDefault()
      this.addSensor()
    },
    getAllSensors() {
      axios
        .get(this.hName+'/api/allsensor')
        .then(response => (this.allSensors = response.data))
    },
    addSensor() {
      axios
        .post(this.hName+'/api/addsensor', [this.sensor])
        // .then(response => (console.log(response.data)))
      // this.showAlert()
    },
    deleteSensor(id) {
      console.log("delete " + id)
      axios
        .post(this.hName+'/api/deletesensor', [JSON.parse(`{ "sensorId" : ${id} }`)])
      //this.showAlert()
    },
    reloadRow(row) {
      let result = this.allSensors.find((sensor) => sensor.sensorId === row.sensorId)
      this.sensor = {
        "sensorId" : result.sensorId,
        "exid" : result.exid,
        "value" : result.value.slice(0).map(item => { return { ...item } } )
      }
    }
  },
  mounted () {
    this.getAllSensors()
  },
  computed: {
    allSensorAdj: function() {
      let sensors = []
      this.allSensors.forEach((sensor) => {
        let item = {}
        item['sensorId'] = sensor['sensorId']
        item['exid'] = sensor['exid']
        sensor['value'].forEach((v, index) => {
          item[`v${index+1}`] = `${v['vd']}, ${v['min']}, ${v['max']}, ${v['key']}`
        })
        sensors.push(item)
      })
      return sensors
    }
  }

}
</script>