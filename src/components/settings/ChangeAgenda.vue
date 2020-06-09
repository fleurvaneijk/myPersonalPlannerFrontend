<template>
  <div>
    <h3>Change agenda</h3>
    <p>Put your agenda  link in the field below.</p>
    <p>Click <a @click="info = !info">here</a> to get more info on where to find this link.</p>
    <form v-on:submit.prevent="changeAgenda">
      <label for="agenda">
          <input type="text" placeholder="Agenda" id="agenda" v-model="agendaLink" required>
      </label>
      <br>
      <button type="submit" class="btn btn-primary">Change</button>
    </form>

    <div v-if="info">
      <br>
      <h4>Where To Find Link On Hogeschool Leiden Scheduele: </h4>
      <p>1. Click the "Connect Calendar" button at the top right.</p>
      <p>2. Choose "Other" from the dropdown options.</p>
      <p>3. Choose the timetable(s) you want to synchronize.</p>
      <p>4. Click next.</p>
      <p>5. Copy the link now displayed to you.</p>
      <p>6. Paste the link in the input field.</p>
      <br>
      <h4>Where To Find Link On Google Agenda: </h4>
      <p>1. Go to your google agenda.</p>
      <p>2. Load the setting menu with the gear at the top right.</p>
      <p>3. Select the agenda you want to import at the left of the setting menu.</p>
      <p>4. Copy the secret address in iCal-layout.</p>
    </div>
  </div>
</template>

<script>
  import {userService} from "../../services/user.service";

  export default ({
    data() {
      return {
        agendaLink: userService.getAgendaLink(),
        info: false
      }
    },

    methods: {
      changeAgenda() {
        userService.changeAgendaLink(this.agendaLink);
      }
    },
  })
</script>
<style scoped lang="scss">
  @import "src/variables";

  label {
    margin: 5px 0px;
  }
  button {
    width: 140px;
  }
  a {
    cursor: pointer;
    color: $tertiary-orange
  }
  input {
    width: 400px;
    height: 30px;
    margin-bottom: 10px;
  }
</style>
