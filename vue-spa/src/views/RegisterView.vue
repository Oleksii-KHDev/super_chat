<template>
  <RegisterComponent></RegisterComponent>
</template>

<script>
// @ is an alias to /src
import RegisterComponent from '@/components/Register.vue';

export default {
  name: 'RegisterView',
  components: {
    RegisterComponent,
  },
};
</script>
