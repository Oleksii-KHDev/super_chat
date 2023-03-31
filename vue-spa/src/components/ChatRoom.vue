<template>
  <div
    class="col-12 d-flex flex-column p-0 justify-content-between p-3 border border-top-0n"
  >
    <div class="d-flex flex-column justify-content-between chat">
      <div
        class="d-flex flex-column m-auto text-center justify-content-center mb-2 header"
      >
        <h2 class="fw-bold">{{ chatName }}</h2>
        <div class="logout">
          <h5><span class="badge bg-secondary">
            <a @click.prevent="logout" href="#">Logout</a></span>
          </h5>
        </div>

        <p class="text-muted" v-if="chatMessages.length === 0">
          {{ noMessagesText }}
        </p>
      </div>
      <div class="messages">
        <ChatMessage
          v-for="msg in chatMessages"
          :key="msg.id"
          :message="msg"
          @reply="replyMessage"
          @sort="sortChatMessages"
        >
        </ChatMessage>
      </div>
    </div>
    <ChatControl
      @send-message="sendMessage"
      :reply-message="replayMessage"
      ref="chatControl"
    ></ChatControl>
  </div>
</template>

<script>
import ChatControl from '@/components/ChatControl.vue';
import ChatMessage from '@/components/ChatMessage.vue';
import io from 'socket.io-client';

export default {
  beforeCreate() {
    if (!localStorage.getItem('super-chat-user')) {
      this.$router.push('/login');
    } else {
      const user = JSON.parse(localStorage.getItem('super-chat-user'));
      this.$store.commit('set_user', user);
    }
  },
  data() {
    return {
      chatName: this.$store.getters.appName,
      chatMessages: [],
      noMessagesText: 'There are no messages in the chat',
      socket: {},
      currentUser: this.$store.getters.currentUser,
      messageBundle: 1,
      replayMessage: undefined,
      messagesOrder: this.$store.getters.defaultSortOrder,
    };
  },
  created() {
    this.socket = io(
      /* eslint-disable-next-line comma-dangle */
      `${process.env.VUE_APP_SERVER_URL}:${process.env.VUE_APP_SERVER_PORT}`
    );

    this.socket.on('updateChat', this.updateChat);
    this.socket.on('chatInit', this.initChat);
    this.socket.on('chatSorted', this.updateChat);
    this.socket.on('serverError', this.showServerError);
  },

  methods: {
    logout() {
      localStorage.removeItem('super-chat-user');
      this.$store.commit('set_user', {});
      this.$router.push('/login');
    },

    initChat(messages) {
      this.chatMessages = messages;
      this.messageBundle = 1;
    },

    sendMessage(data) {
      const message = {
        user: this.currentUser,
        parentId: data.parentMessage ? data.parentMessage.id : 0,
        userId: this.currentUser.id,
        text: data.message,
        createdAt: new Date(Date.now()).toISOString(),
        padding: data.parentMessage ? +data.parentMessage.padding + 1 : 0,
        file: data.fileSource ? data.fileSource.name : undefined,
        fileSource: data.fileSource ? data.fileSource : undefined,
      };
      this.socket.emit('newMessage', message, this.messagesOrder);
      this.replayMessage = undefined;
    },

    replyMessage(message) {
      this.replayMessage = message;
    },

    updateChat(messages) {
      this.chatMessages = messages;
    },

    sortChatMessages(order) {
      this.messagesOrder = order;
      this.socket.emit('sortMessage', order);
    },

    showServerError(message) {
      this.$refs.chatControl.showServerError(message);
    },
  },
  components: {
    ChatControl,
    ChatMessage,
  },
  name: 'ChatRoom',
};
</script>

<style scoped>
h2 {
  color: black;
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

img {
  -webkit-user-drag: none;
}

.chat {
  position: relative;
}

.logout {
  padding-right: 1rem;
  left: 95%;
  top: 0;
  position: absolute;
}

.badge.bg-secondary {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
