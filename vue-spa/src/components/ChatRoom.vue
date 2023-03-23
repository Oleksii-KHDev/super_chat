<template>
  <div
    class="col-12 d-flex flex-column p-0 justify-content-between p-3 border border-top-0n"
  >
    <div class="d-flex flex-column justify-content-between chat">
      <div
        class="d-flex flex-column m-auto text-center justify-content-center mb-2 header"
      >
        <h2 class="fw-bold">{{ chatName }}</h2>
        <p class="text-muted" v-if="chatMessages.length === 0">
          {{ noMessagesText }}
        </p>
      </div>
      <div class="messages">
        <div
          v-for="msg in chatMessages"
          :key="msg.id"
          class="d-flex gap-2 w-75 mb-4 bubble"
          :class="{ self: currentUser.id === msg.user.id }"
        >
          <img
            :src="msg?.avatar || avatar1"
            width="50"
            height="50"
            alt="avatar"
          />
          <div class="text">
            <div class="username fw-bold">{{ msg.user.name }}</div>
            <div class="chatfield p-2">
              <span v-html="msg.message.text"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ChatControl @send-message="sendMessage"></ChatControl>
  </div>
</template>

<script>
import ChatControl from '@/components/ChatControl.vue';
import io from 'socket.io-client';

export default {
  data() {
    return {
      avatar1: '../avatar1.svg',
      chatName: this.$store.getters.chatName,
      chatMessages: [],
      noMessagesText: 'There are no messages in the chat',
      socket: {},
      currentUser: this.$store.getters.currentUser,
    };
  },
  created() {
    this.socket = io(
      `${process.env.VUE_APP_SERVER_URL}:${process.env.VUE_APP_SERVER_PORT}`
    );
    this.socket.on('newMessage', this.newMessage);
    this.socket.on('chatInit', this.initChat);
  },
  provide() {
    return {
      getSocketConnection: this.getSocketConnection,
    };
  },
  methods: {
    initChat(messages) {
      this.chatMessages = messages;
    },
    getSocketConnection() {
      return this.socket;
    },
    sendMessage(message) {
      this.socket.emit('newMessage', {
        user: this.currentUser,
        message: {
          parentId: 0,
          userId: this.currentUser.id,
          text: message,
        },
      });
    },
    newMessage(message) {
      console.log(message);
      this.chatMessages.push(message);
    },
  },
  components: {
    ChatControl,
  },
  name: 'ChatRoom',
};
</script>

<style scoped>
h2 {
  color: purple;
}
.messages {
  position: relative;
  height: 70vh;
  width: 100%;
  padding-right: 2em;
  overflow: auto;
}
.messages::-webkit-scrollbar {
  background: #d8d6d6;
  width: 8px;
  border-radius: 5px;
}
.messages::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: purple;
}
.chatfield {
  background: purple;
  color: white;
  border-radius: 10px;
  border-top-left-radius: 0;
}

.self .chatfield {
  color: black;
}
.self .chatfield {
  border-top-right-radius: 0;
  border-top-left-radius: 10px;
}
.chatfield {
  font-size: 1rem;
  width: fit-content;
}
.bubble {
  flex-flow: row;
}
.bubble.self {
  flex-flow: row-reverse;
}
.self .chatfield {
  float: right;
}
.self {
  text-align: right;
  float: right;
  flex-flow: row-reverse;
}
img {
  -webkit-user-drag: none;
}
</style>
