<template>
  <div id="page">
    <h1>Start</h1>

    <form method="post">
      <label for="uname">
        <input type="text" placeholder="Username" id="uname" required>
      </label>

      <label for="psw">
        <input type="password" placeholder="Password" id="psw" required>
      </label>

      <button type="submit">Login</button>
    </form>

    <span class="psw"><a href="#">Forgot password?</a></span>
    <br><br>
    <span class="psw">Not registered yet? <a href="#">create your free account here</a></span>

  </div>
</template>

<script>
  export default {

  };
</script>

<style>
  #page {
    width: 25%;
    align-content: center;
    display: inline-block;
  }

  input {
    background: #F9F9FB;
    border: 1px solid #70728F;
    color: #434456;
    margin: 10px 0;
    padding: 8px;
    width: 100%;
  }

  button {
    background: #A7CB23;
    width: 100%;
    justify-content: center;
    line-height: 21px;
    padding: 9px 0;
    margin: 10px 0 20px;
    text-transform: uppercase;
    color: #fff;
    cursor: pointer;
    border: 0;
    border-radius: 3px;
  }
</style>
