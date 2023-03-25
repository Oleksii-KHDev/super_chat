<template>
  <div class="d-flex gap-2 w-75 mb-4 bubble">
    <img :src="avatar1" width="50" height="50" alt="avatar" />
    <div class="text">
      <div class="text-header">
        <div class="username fw-bold">{{ message.user.name }}</div>
        <div class="message-time w-bold">
          {{ new Date(message.createdAt).toLocaleString() }}
          <BIconSortNumericDown class="icon"></BIconSortNumericDown>
          <BIconSortNumericDownAlt class="icon"></BIconSortNumericDownAlt>
        </div>
        <div class="user-email">
          {{ message.user.email }}
          <BIconSortAlphaDown class="icon"></BIconSortAlphaDown>
          <BIconSortAlphaDownAlt class="icon"></BIconSortAlphaDownAlt>
        </div>
        <div class="answer">
        <BIconReplyFill class="icon"></BIconReplyFill>
        </div>
      </div>
      <div class="chat-field p-2">
        <span v-html="message.text"></span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BIconReplyFill,
  BIconSortNumericDown,
  BIconSortNumericDownAlt,
  BIconSortAlphaDown,
  BIconSortAlphaDownAlt,
} from 'bootstrap-icons-vue';

export default {
  name: 'ChatMessage',
  props: ['message'],
  components: {
    BIconReplyFill,
    BIconSortNumericDown,
    BIconSortNumericDownAlt,
    BIconSortAlphaDown,
    BIconSortAlphaDownAlt,
  },
  data() {
    return {
      avatar1: 'assets/avatar1.svg',
    };
  },
};
</script>

<style scoped>
.chat-field {
  background: purple;
  color: white;
  border-radius: 0 10px 10px 10px;
  font-size: 1rem;
  width: fit-content;
}

.bubble {
  flex-flow: row;
}

.icon {
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 2px;
}

.text-header {
  display: flex;
  background: lightgray;
  border-radius: 5px;
  padding: 5px;
}

.username {
  background: lightgreen;
  padding: 5px;
  border-radius: 5px;
}
.user-email {
  background: lightblue;
  padding: 5px;
  border-radius: 5px;
  margin-left: 5px;
  font-weight: bold;
}

.message-time {
  background: lightpink;
  padding: 5px;
  border-radius: 5px;
  margin-left: 5px;
  font-weight: bold;
}

.answer {
  padding: 5px;
  margin-left: 5px;
  font-weight: bold;
}
</style>
