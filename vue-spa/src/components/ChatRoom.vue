<template>
  <div
    class="col-12 d-flex flex-column p-0 justify-content-between p-3 border border-top-0n"
  >
    <div class="d-flex flex-column justify-content-between chat">
      <div
        class="d-flex flex-column m-auto text-center justify-content-center mb-2 header"
      >
        <h2 class="fw-bold">{{ chatName }}</h2>
        <p class="text-muted" v-if="channelMessages.length === 0">
          {{ noMessagesText }}
        </p>
      </div>
      <div class="messages">
        <div
          v-for="msg in channelMessages"
          :key="msg.id"
          class="d-flex gap-2 w-75 mb-4 bubble"
          :class="{ self: currentUser.id === msg.userId }"
        >
          <img
            :src="msg?.avatar || avatar1"
            width="50"
            height="50"
            alt="avatar"
          />
          <div class="text">
            <div class="username fw-bold">{{ msg.username }}</div>
            <div class="chatfield p-2">
              <span v-html="convertToLink(msg.message)"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="alert alert-warning" role="alert">
      <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with tag buttons">
        <div class="btn-group me-2" role="group" aria-label="Button for tag a">
          <button type="button" class="btn btn-warning">&lt;a&gt;</button>
        </div>
        <div class="btn-group me-2" role="group" aria-label="Button for tag code">
          <button type="button" class="btn btn-secondary">&lt;code&gt;</button>
        </div>
        <div class="btn-group me-2" role="group" aria-label="Button for tag i">
          <button type="button" class="btn btn-info">&lt;i&gt;</button>
        </div>
        <div class="btn-group me-2" role="group" aria-label="Button for tag strong">
          <button type="button" class="btn btn-success">&lt;strong&gt;</button>
        </div>
        <div class="btn-group" role="group" aria-label="Button for adding file">
          <button type="button" class="btn btn-danger">Add File</button>
        </div>
      </div>
      <div class="mt-2 d-flex">
        <textarea
          rows="2"
          placeholder="Please type your message ..."
          class="px-3 p-2 form-control chatbox"
          @keyup.enter="sendMessage"
        ></textarea>
        <button type="button" class="btn btn-primary send-btn align-self-center ms-2">Send</button>
      </div>

      <hr>
      <p class="mb-0">* You can use tags <strong>&lt;a&gt;</strong>,
        <strong>&lt;code&gt;</strong>, <strong>&lt;i&gt;</strong>,
        <strong>&lt;strong&gt;</strong>. Also you can add image or text file.
      </p>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      chatName: this.$store.getters.chatName,
      channelMessages: this.$store.getters.messages,
      noMessagesText: 'There are no messages in the chat',
    };
  },
  methods: {
    sendMessage() {

    },
  },
  name: 'ChatRoom',
};
</script>

<style scoped>
.chatbox {
  outline: none;
  border: 1px dotted lightblue;
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  transition: 0.2s;
  color: black;
  width: 100%;
}

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

.btn-group .btn {
  padding: 3px;
  font-size: 0.8rem;
}

.send-btn {
  padding: 5px 10px;
  height: 50%;
}

</style>
