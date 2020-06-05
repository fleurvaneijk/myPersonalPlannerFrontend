<template>
  <div class="container">
    <h3>Change username</h3>
    <form v-on:submit.prevent="changeAgenda">
      <label for="agenda">
          <input type="text" placeholder="Agenda" id="agenda" v-model="agendaLink" required>
      </label>
      <br>
      <button type="submit" class="btn btn-primary">Change</button>
    </form>
  </div>
</template>

<script>
  import {userService} from "../../services/user.service";

  export default ({
    data() {
      return {
        agendaLink: userService.getAgendaLink()
      }
    },

    methods: {
      changeAgenda() {
        userService.changeAgendaLink(this.agendaLink);
      }
    },
  })
</script>
<style scoped>
  label {
    margin: 5px 0px;
  }
  button {
    width: 140px;
  }
</style>
