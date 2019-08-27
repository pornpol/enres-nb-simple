<template>
  <div>
    <section class="section">
      <div class="container">
        <b-table :data="allGenericAdj" :columns="columns" :selected.sync="selected" @click="reloadRow">
        </b-table>
      </div>
      <br>
      <div class="container">
        <form @submit.prevent="formSubmit">
          <b-field label="ID" label-position="on-border" expanded>
            <b-input placeholder="1" v-model="generic.genericId"></b-input>
          </b-field>

          <b-field label="Modbus Address" label-position="on-border" expanded>
            <b-input placeholder="1" v-model="generic.genericAddr"></b-input>
          </b-field>

          <b-field label="External ID" label-position="on-border" expanded>
            <b-input placeholder="100" v-model="generic.exid"></b-input>
          </b-field>

          <b-field label="Date/Time Key" label-position="on-border" expanded>
            <b-input placeholder="dt" v-model="generic.dtKey"></b-input>
          </b-field>

          <b-field v-for="(value, index) in generic.value" :key="`${index}`" Group>
            <b-field label="Address" label-position="on-border" expanded>
              <b-input type="number" placeholder="1" v-model="value.addr"></b-input>
            </b-field>
            <b-field label="Function Code" label-position="on-border" expanded>
              <b-input type="number" placeholder="3" v-model="value.fc"></b-input>
            </b-field>
            <b-field label="Data Type" label-position="on-border" expanded>
              <b-input type="number" placeholder="3" v-model="value.type"></b-input>
            </b-field>
            <b-field label="Key Name" label-position="on-border" expanded>
              <b-input type="text" :placeholder="`vd${index+1}`" v-model="value.key"></b-input>
            </b-field>
            <b-field label="Adjust" label-position="on-border" expanded>
              <b-input type="number" placeholder="1.0" v-model="value.ratio"></b-input>
            </b-field>
          </b-field>

          <b-field>
            <div class="buttons">
              <b-button type="is-primary" native-type="submit">Add/Edit</b-button>
              <b-button class="is-danger" >Delete</b-button>
              <b-button class="is-success" >Refresh</b-button>
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
      allGenerics: [],
      selected: null,
      generic: {
        "genericId": "",
        "genericAddr": "",
        "exid": "",
        "dtKey": "",
        "value": [
        {
          "addr": "",
          "fc": "",
          "type": "",
          "key": "",
          "ratio": ""
        },
        {
          "addr": "",
          "fc": "",
          "type": "",
          "key": "",
          "ratio": ""
        },
        {
          "addr": "",
          "fc": "",
          "type": "",
          "key": "",
          "ratio": ""
        },
        {
          "addr": "",
          "fc": "",
          "type": "",
          "key": "",
          "ratio": ""
        },
        {
          "addr": "",
          "fc": "",
          "type": "",
          "key": "",
          "ratio": ""
        },
        {
          "addr": "",
          "fc": "",
          "type": "",
          "key": "",
          "ratio": ""
        },
        {
          "addr": "",
          "fc": "",
          "type": "",
          "key": "",
          "ratio": ""
        },
        {
          "addr": "",
          "fc": "",
          "type": "",
          "key": "",
          "ratio": ""
        },
        {
          "addr": "",
          "fc": "",
          "type": "",
          "key": "",
          "ratio": ""
        },
        {
          "addr": "",
          "fc": "",
          "type": "",
          "key": "",
          "ratio": ""
        }
      ]},
      columns: [
        {field: 'genericId', label: 'Generic ID'},
        {field: 'genericAddr', label: 'Generic Address'},
        {field: 'exid', label: 'External ID'},
        {field: 'dtKey', label: 'Date/Time Key'},
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
      this.addGeneric()
    },
    getAllGenerics() {
      axios
        .get(this.hName+'/api/allgeneric')
        .then(response => (this.allGenerics = response.data))
    },
    addGeneric() {
      axios
        .post(this.hName+'/api/addgeneric', [this.generic])
        // .then(response => (console.log(response.data)))
      // this.showAlert()
    },
    deleteGeneric(id) {
      console.log("delete " + id)
      axios
        .post(this.hName+'/api/deletegeneric', [JSON.parse(`{ "genericId" : ${id} }`)])
      //this.showAlert()
    },
    reloadRow(row) {
      let result = this.allGenerics.find((generic) => generic.genericId === row.genericId)
      this.generic = {
        "genericId": result.genericId,
        "genericAddr": result.genericAddr,
        "exid": result.exid,
        "dtKey": result.dtKey,
        "sensorId" : result.sensorId,
        "value" : result.value.slice(0).map(item => { return { ...item } } )
      }
    }
  },
  mounted () {
    this.getAllGenerics()
  },
  computed: {
    allGenericAdj: function() {
      let generics = []
      this.allGenerics.forEach((generic) => {
        let item = {}
        item['genericId'] = generic['genericId']
        item['genericAddr'] = generic['genericAddr']
        item['exid'] = generic['exid']
        item['dtKey'] = generic['dtKey']
        generic['value'].forEach((v, index) => {
          item[`v${index+1}`] = `${v['addr']}, ${v['fc']}, ${v['type']}, ${v['key']}, ${v['ratio']}`
        })
        generics.push(item)
      })
      return generics
    }
  }
}
</script>