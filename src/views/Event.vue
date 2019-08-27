<template>
  <section class="section">
    <b-table :data="processEventData" :columns="columns"></b-table>
  </section>
</template>

<script>
import moment from 'moment'
import axios from 'axios';

export default {
  data: () => {
    return {
      eventDatas : [],
      hName: "",
      columns: [
        {field: 'id', label: 'Id'},
        {field: 'code', label: 'Code'},
        {field: 'msg', label: 'Message'},
        {field: 'mdt', label: 'Time', centered: true}
      ],
    }
  },
  computed: {
    processEventData: function() {
      return this.eventDatas.map(item => {
        item["mdt"] = moment(item["mdt"], "X").utc().format("DD/MM/YYYY HH:mm:ss")
        return item
      })
    }
  },
  methods: {
  },
  mounted () {
    axios
      .get(this.hName+'/api/eventlog')
      .then(response => (this.eventDatas = response.data))
  }
}
</script>