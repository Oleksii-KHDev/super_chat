<template>
  <v-tooltip v-model="arrowDownTooltip" location="top">
    <template v-slot:activator="{ props }">
      <BIconArrowDown
        v-if="index === messagesInChat - 1"
        class="pag-arrow"
        @focusin="arrowDownTooltip = true"
        @focusout="arrowDownTooltip = false"
        v-bind="props"
        @click="$emit('nextPage', 'down')"
      >
      </BIconArrowDown>
    </template>
    Next page
  </v-tooltip>
  <div
    class="d-flex gap-2 w-75 mb-4 bubble"
    :style="{ marginLeft: padding * 5 + '%' }"
  >
    <img :src="message.user.avatar" width="50" height="50" alt="avatar" />
    <div class="text">
      <div class="text-header">
        <div class="username fw-bold">{{ message.user.name }}</div>
        <div class="message-time w-bold">
          {{ new Date(message.createdAt).toLocaleString() }}
          <BIconSortNumericDown
            class="icon"
            @click="sort({ sortField: 'createdAt', sortOrder: 'asc' })"
          ></BIconSortNumericDown>
          <BIconSortNumericDownAlt
            class="icon"
            @click="sort({ sortField: 'createdAt', sortOrder: 'desc' })"
          ></BIconSortNumericDownAlt>
        </div>
        <div class="user-email">
          {{ message.user.email }}
          <BIconSortAlphaDown
            class="icon"
            @click="sort({ sortField: 'email', sortOrder: 'asc' })"
          ></BIconSortAlphaDown>
          <BIconSortAlphaDownAlt
            class="icon"
            @click="sort({ sortField: 'email', sortOrder: 'desc' })"
          ></BIconSortAlphaDownAlt>
        </div>
        <div class="answer">
          <BIconReplyFill class="icon" @click="reply"></BIconReplyFill>
        </div>
      </div>
      <div class="chat-field p-2">
        <span v-html="message.text"></span>
      </div>
      <div class="message-file" v-if="msg.file">
        <BIconFileEarmarkImage
          class="icon"
          v-if="!msg.file.endsWith('.txt')"
        ></BIconFileEarmarkImage>
        <BIconFileEarmarkFont class="icon" v-else></BIconFileEarmarkFont>
        <a
          v-if="!msg.file.endsWith('.txt')"
          :data-lightbox="msg.id"
          :href="serverUrl + '/files/' + msg.id + '/' + msg.file"
          >{{ msg.file }}</a
        >
        <a
          v-else
          :href="serverUrl + '/files/' + msg.id + '/' + msg.file"
          target="_blank"
          >{{ msg.file }}</a
        >
      </div>
    </div>
  </div>
  <v-tooltip v-model="arrowUpTooltip" location="bottom">
    <template v-slot:activator="{ props }">
      <BIconArrowUp
        v-if="index === 0"
        class="pag-arrow pag-arrow-top"
        @focusin="arrowUpTooltip = true"
        @focusout="arrowUpTooltip = false"
        @click="$emit('nextPage', 'up')"
        v-bind="props"
      >
      </BIconArrowUp>
    </template>
    Previous page
  </v-tooltip>
</template>

<script>
import {
  BIconReplyFill,
  BIconSortNumericDown,
  BIconSortNumericDownAlt,
  BIconSortAlphaDown,
  BIconSortAlphaDownAlt,
  BIconFileEarmarkFont,
  BIconFileEarmarkImage,
  BIconArrowUp,
  BIconArrowDown,
} from 'bootstrap-icons-vue';

export default {
  name: 'ChatMessage',
  props: ['message', 'index'],
  emits: ['reply', 'sort', 'nextPage'],
  components: {
    BIconReplyFill,
    BIconSortNumericDown,
    BIconSortNumericDownAlt,
    BIconSortAlphaDown,
    BIconSortAlphaDownAlt,
    BIconFileEarmarkFont,
    BIconFileEarmarkImage,
    BIconArrowUp,
    BIconArrowDown,
  },
  data() {
    return {
      avatar1: 'assets/avatar1.svg',
      /**
       * @property {object} msg Current message
       */
      msg: this.message,
      padding: 0,
      serverUrl: this.$store.getters.serverUrl,
      /**
       * @property {number} messagesInChat Max count of messages on one chat page
       */
      messagesInChat: 0,
      arrowDownTooltip: false,
      arrowUpTooltip: false,
    };
  },
  created() {
    this.padding = this.message.padding;
    this.messagesInChat = process.env.VUE_APP_MESSAGES_IN_CHAT;
  },

  beforeUpdate() {
    this.padding = this.message.padding;
  },

  methods: {
    /**
     * Emits 'reply' event when user replies on message
     */
    reply() {
      this.$emit('reply', this.message);
    },
    /**
     * Emits 'sort' event when user sorts chat messages
     */
    sort(order) {
      this.$emit('sort', order);
    },
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
  width: fit-content;
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
.pag-arrow {
  font-size: 2rem;
  font-weight: bold;
  position: absolute;
  left: 95%;
  cursor: pointer;
}
.pag-arrow-top {
  top: 2%;
}
</style>
