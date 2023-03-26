<template>
  <div class="alert alert-warning" role="alert">
    <div
      class="btn-toolbar"
      role="toolbar"
      aria-label="Toolbar with tag buttons"
    >
      <div
        class="btn-group me-2 align-self-center"
        role="group"
        aria-label="Button for tag a"
      >
        <button type="button" class="btn btn-warning">&lt;a&gt;</button>
      </div>
      <div
        class="btn-group me-2 align-self-center"
        role="group"
        aria-label="Button for tag code"
      >
        <button type="button" class="btn btn-secondary">&lt;code&gt;</button>
      </div>
      <div
        class="btn-group me-2 align-self-center"
        role="group"
        aria-label="Button for tag i"
      >
        <button type="button" class="btn btn-info">&lt;i&gt;</button>
      </div>
      <div
        class="btn-group me-2 align-self-center"
        role="group"
        aria-label="Button for tag strong"
      >
        <button type="button" class="btn btn-success">&lt;strong&gt;</button>
      </div>
      <v-file-input
        accept=".jpg, .jpeg, .png, .txt, .gif"
        label="Add file"
        show-size
        counter
        validate-on="input"
        :rules="rules"
        v-model="file"
      ></v-file-input>
    </div>

    <div class="d-flex reply-message">
      <div
        class="alert alert-primary mb-0 mt-2"
        v-bind:class="[isShowReplayAlert ? 'show' : 'hide']"
      >
        <BIconReplyFill class="icon"></BIconReplyFill>
        {{ replyHeader ? replyHeader : '' }}
        <BIconX class="icon icon-close" @click="hideReplayField"></BIconX>
      </div>
    </div>
    <div class="mt-2 d-flex">
      <textarea
        rows="replyMessage ? 5 : 2"
        v-model="message"
        placeholder="Please type your message ..."
        class="px-3 p-2 form-control chat-box"
        @keyup.enter="sendMessage($event.target.value)"
      ></textarea>
      <button
        type="button"
        class="btn btn-primary send-btn align-self-center ms-2"
        @click="sendMessage(message)"
      >
        Send
      </button>
    </div>

    <hr />
    <p class="mb-0">
      * You can use tags <strong>&lt;a&gt;</strong>,
      <strong>&lt;code&gt;</strong>, <strong>&lt;i&gt;</strong>,
      <strong>&lt;strong&gt;</strong>. Also you can add image or text file.
    </p>
  </div>
</template>

<script>
import { BIconReplyFill, BIconX } from 'bootstrap-icons-vue';

export default {
  name: 'ChatControl',
  emits: ['sendMessage'],
  props: ['replyMessage'],
  components: { BIconReplyFill, BIconX },
  data() {
    return {
      message: '',
      replyHeader: '',
      isShowReplayAlert: false,
      isReplayAlertClosed: false,
      file: null,
      rules: [
        (v) => {
          if (v && v.length > 0 && v[0].name.trim().endsWith('.txt')) {
            return (v[0].size < 102400) ? true : 'Text file can\'t be over 100 Kb';
          }
          return true;
        },
      ],
    };
  },
  beforeUpdate() {
    /* eslint-disable comma-dangle */
    if (this.replyMessage) {
      this.replyHeader = `${this.replyMessage.user.name} ${new Date(
        this.replyMessage.createdAt
      ).toLocaleString()} ${this.replyMessage.user.email}`;
    }
    /* eslint-enable comma-dangle */

    if (this.isReplayAlertClosed || !this.replyMessage) {
      this.isShowReplayAlert = false;
      this.isReplayAlertClosed = false;
    } else {
      this.isShowReplayAlert = true;
    }
  },
  computed: {},
  methods: {
    sendMessage(message) {
      if (message && !/^\s*$/.test(message)) {
        this.message = '';
        const data = { message };

        if (this.replyMessage && this.isShowReplayAlert) {
          data.parentMessage = this.replyMessage;
        }

        if (this.file?.length > 0) {
          // eslint-disable-next-line prefer-destructuring
          data.fileSource = this.file[0];
        }

        this.$emit('sendMessage', data);
        return;
      }

      console.warn("Message can't be empty");
    },
    hideReplayField() {
      this.isShowReplayAlert = false;
      this.isReplayAlertClosed = true;
    },
  },
};
</script>
<style>
.v-input .v-input__control, .v-input__details {
  max-width: 30%!important;
}
</style>
<style scoped>
.chat-box {
  outline: none;
  border: 1px dotted lightblue;
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  transition: 0.2s;
  color: black;
  width: 100%;
}

.btn-group .btn {
  padding: 3px;
  font-size: 0.8rem;
}

.send-btn {
  padding: 5px 10px;
  height: 50%;
}

.alert {
  padding: 0.5rem;
}

.show {
  display: flex;
}

.hide {
  display: none;
}

.icon {
  font-size: 1.5rem;

  margin-left: 2px;
}

.icon-close {
  cursor: pointer;
  font-weight: bold;
}

.icon-close:hover {
  color: red;
}

.reply-message {
  font-weight: bold;
}

.btn-group {
  height: 50%;
}

.btn-group .btn {
  font-weight: 600;
  font-size: 1rem;
  color: black;
}
</style>
