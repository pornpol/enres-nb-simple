<template>
  <div>
    <section class="section">
      <div class="container">
        <b-table :data="allMetersAdj" :columns="columns" :selected.sync="selected"  @click="reloadRow">
        </b-table>
      </div>
      <br>
      <div class="container">
        <form @submit.prevent="formSubmit">
          <b-field label="Meter ID" label-position="on-border">
            <b-input v-model="meter.meterId" placeholder="1"></b-input>
          </b-field>
          <b-field label="Meter Address" label-position="on-border">
            <b-input v-model="meter.meterId" placeholder="1"></b-input>
          </b-field>

          <b-field label="Meter Type" label-position="on-border">
            <b-select v-model="meter.meterType" expanded>
              <option value="1">YTL</option>
              <option value="2">Eastron</option>
              <option value="3">Schneider</option>
              <option value="4">Heyuan 3 Phase</option>
              <option value="5">Heyuan 1 Phase</option>
              <option value="6">Circutor</option>
              <option value="7">ABB M2M</option>
              <option value="8">Integra 1630</option>
              <option value="11">PM800</option>

              <option value="129">PM2230 (PQ)</option>
              <option value="130">DMG610 (PQ)</option>
              <option value="131">DMG800 (PQ)</option>
            </b-select>
          </b-field>

          <b-field label="External ID" label-position="on-border">
            <b-input v-model="meter.exid" placeholder="100"></b-input>
          </b-field>

          <b-field label="kW Adjust" label-position="on-border">
            <b-input type="number" v-model="meter.wAdj"></b-input>
          </b-field>

          <b-field label="kWh Adjust" label-position="on-border">
            <b-input type="number" v-model="meter.whAdj"></b-input>
          </b-field>

          <b-field label="PF Adjust" label-position="on-border">
            <b-input type="number" v-model="meter.pfAdj"></b-input>
          </b-field>

          <b-field label="kVarh Adjust" label-position="on-border">
            <b-input type="number" v-model="meter.varhAdj"></b-input>
          </b-field>

          <b-field label="I0 Adjust" label-position="on-border">
            <b-input type="number" v-model="meter.i0Adj"></b-input>
          </b-field>

          <b-field label="I1 Adjust" label-position="on-border">
            <b-input type="number" v-model="meter.i1Adj"></b-input>
          </b-field>

          <b-field label="I2 Adjust" label-position="on-border">
            <b-input type="number" v-model="meter.i2Adj"></b-input>
          </b-field>

          <b-field label="V0 Adjust" label-position="on-border">
            <b-input type="number" v-model="meter.v0Adj"></b-input>
          </b-field>

          <b-field label="V1 Adjust" label-position="on-border">
            <b-input type="number" v-model="meter.v1Adj"></b-input>
          </b-field>

          <b-field label="V2 Adjust" label-position="on-border">
            <b-input type="number" v-model="meter.v2Adj"></b-input>
          </b-field>

          <b-field>
            <div class="buttons">
              <b-button type="is-primary" native-type="submit">Add/Edit</b-button>
              <b-button class="is-danger" @click="deleteMeter(meter.meterId)">Delete</b-button>
              <b-button class="is-success" @click="getAllMeters">Refresh</b-button>
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
      allMeters: [],
      selected: null,
      meter: {
        meterId: "",
        meterAddr: "",
        meterType: "",
        exid: "",
        wAdj: "",
        whAdj: "",
        pfAdj: "",
        varhAdj: "",
        i0Adj: "",
        i1Adj: "",
        i2Adj: "",
        v0Adj: "",
        v1Adj: "",
        v2Adj: ""         
      },
      columns: [
        {field: 'meterId', label: 'Meter ID'},
        {field: 'meterAddr', label: 'Meter Address'},
        {field: 'meterType', label: 'Meter Type'},
        {field: 'exid', label: 'External ID'},
        {field: 'adj', label: 'Adjust'}
      ],
    }
  },
  methods: {
    formSubmit (e) {
      e.preventDefault()
      this.addMeter()
    },
    getAllMeters() {
      axios
        .get(this.hName+'/api/allmeter')
        .then(response => (this.allMeters = response.data))
    },
    addMeter() {
      axios
        .post(this.hName+'/api/addmeter', [this.meter])
        // .then(response => (console.log(response.data)))
      this.showAlert()
    },
    deleteMeter(id) {
      console.log("delete " + id)
      axios
        .post(this.hName+'/api/deletemeter', [JSON.parse(`{ "meterId" : ${id} }`)])
      this.showAlert()
    },
    reloadRow(row) {
      this.meter = Object.assign({},this.allMeters.find((meter) => meter.meterId === row.meterId))
    }
  },
  mounted () {
    this.getAllMeters()
  },
  computed: {
    allMetersAdj: function() {
      let meters = []
      this.allMeters.forEach((meter) => {
        let item = {}
        item['meterId'] = meter['meterId']
        item['meterAddr'] = meter['meterAddr']
        item['meterType'] = meter['meterType']
        // update meter type to text
        item['exid'] = meter['exid']
        item['adj'] = `${meter['wAdj']}, ${meter['whAdj']}, ${meter['pfAdj']}, ${meter['varhAdj']}, 
            ${meter['i0Adj']}, ${meter['i1Adj']}, ${meter['i2Adj']}, ${meter['v0Adj']}, ${meter['v1Adj']}, ${meter['v2Adj']}`
        meters.push(item)
      })
      return meters
    }
  }

}
</script>