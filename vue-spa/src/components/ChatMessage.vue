<template>
  <div
    class="d-flex gap-2 w-75 mb-4 bubble"
    :style="{ marginLeft: padding * 5 + '%' }"
  >
    <img :src="avatar1" width="50" height="50" alt="avatar" />
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
          :href="serverUrl + '/' + msg.id + '/' + msg.file"
          >{{ msg.file }}</a
        >
        <a
          v-else
          :href="serverUrl + '/' + msg.id + '/' + msg.file"
          target="_blank"
          >{{ msg.file }}</a
        >
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
  BIconFileEarmarkFont,
  BIconFileEarmarkImage,
} from 'bootstrap-icons-vue';

export default {
  name: 'ChatMessage',
  props: ['message'],
  emits: ['reply', 'sort'],
  components: {
    BIconReplyFill,
    BIconSortNumericDown,
    BIconSortNumericDownAlt,
    BIconSortAlphaDown,
    BIconSortAlphaDownAlt,
    BIconFileEarmarkFont,
    BIconFileEarmarkImage,
  },
  data() {
    return {
      avatar1: 'assets/avatar1.svg',
      msg: this.message,
      padding: 0,
      serverUrl: this.$store.getters.serverUrl,
    };
  },
  created() {
    this.padding = this.message.padding;
    // this.serverUrl = this.$store.getters.serverUrl
  },
  beforeUpdate() {
    this.padding = this.message.padding;
  },
  methods: {
    reply() {
      this.$emit('reply', this.message);
    },
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
</style>
