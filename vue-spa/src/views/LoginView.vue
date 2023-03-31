<template>
  <LoginComponent></LoginComponent>
</template>

<script>
// @ is an alias to /src
import LoginComponent from '@/components/Login.vue';

export default {
  name: 'LoginView',
  components: {
    LoginComponent,
  },
  // beforeCreate() {
  //   if (localStorage.getItem('super-chat-user')) {
  //     const user = JSON.parse(localStorage.getItem('super-chat-user'));
  //     this.$store.commit('set_user', user);
  //     this.$router.push('/chat');
  //   }
  // },
};
</script>
