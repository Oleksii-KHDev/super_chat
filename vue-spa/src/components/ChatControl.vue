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
        <v-btn
          color="primary"
          rounded="xl"
          value="outlined"
          @click="aButtonClick"
        >
          &lt;a&gt;
        </v-btn>
        <v-dialog v-model="dialog" width="25%">
          <v-card>
            <v-card-text>
              <v-text-field
                :rules="[rules.linkRequired, rules.linkInvalidFormat]"
                validate-on="blur"
                single-line
                label="Link url"
                variant="outlined"
                ref="linkUrl"
                v-model="linkUrl"
              ></v-text-field>
              <v-text-field
                :rules="[rules.linkTitleRequired]"
                single-line
                label="Link title"
                variant="outlined"
                validate-on="blur"
                ref="linkTitle"
                v-model="linkTitle"
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="primary" @click="okButtonClick">Ok</v-btn>
              <v-btn color="primary" @click="cancelButtonClick">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div
        class="btn-group me-2 align-self-center"
        role="group"
        aria-label="Button for tag code"
      >
        <v-btn
          color="primary"
          rounded="xl"
          value="outlined"
          @click="codeButtonClick"
        >
          &lt;code&gt;
        </v-btn>
      </div>
      <div
        class="btn-group me-2 align-self-center"
        role="group"
        aria-label="Button for tag i"
      >
        <v-btn
          color="primary"
          rounded="xl"
          value="outlined"
          @click="iButtonClick"
        >
          &lt;i&gt;
        </v-btn>
      </div>
      <div
        class="btn-group me-2 align-self-center"
        role="group"
        aria-label="Button for tag strong"
      >
        <v-btn
          color="primary"
          rounded="xl"
          value="outlined"
          @click="strongButtonClick"
        >
          &lt;strong&gt;
        </v-btn>
      </div>
      <v-file-input
        accept=".jpg, .jpeg, .png, .txt, .gif"
        label="Add file"
        show-size
        counter
        validate-on="input"
        :rules="[rules.fileSize]"
        v-model="file"
        id="messageFile"
        class="message-file"
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
        ref="messageText"
      ></textarea>
      <div class="d-flex flex-column">
        <button
          type="button"
          class="btn btn-primary send-btn ms-2"
          @click="sendMessage(message)"
        >
          Send
        </button>
        <div class="mt-2 mb-2" v-html="captchaImg"></div>
        <v-text-field
          single-line
          label="Enter value"
          variant="outlined"
          v-model.trim="captchaInputValue"
        >
        </v-text-field>
      </div>
    </div>
    <v-snackbar
      v-model="isShowError"
      :timeout="3000"
      variant="outlined"
      color="red"
    >
      {{ errorMessage }}
    </v-snackbar>
  </div>
</template>

<script>
import { BIconReplyFill, BIconX } from 'bootstrap-icons-vue';
import { getCaptcha } from '@/helpers/auth';

export default {
  name: 'ChatControl',
  emits: ['sendMessage', 'deleteReplayMessage'],
  props: ['replyMessage'],
  components: { BIconReplyFill, BIconX },

  data() {
    return {
      /**
       * @property {object} emptyTagsList Tags which don't have closed tag
       */
      emptyTagsList: {},

      isShowError: false,
      errorMessage: '',

      /**
       * @property {string} captchaString Text on the captcha image
       */
      captchaString: '',

      /**
       * @property {string} captchaImg Svg image
       */
      captchaImg: '',

      /**
       * @property {string} captchaInputValue Captcha value which user has inputted
       */
      captchaInputValue: '',

      dialog: false,
      message: '',
      replyHeader: '',
      isShowReplayAlert: false,
      isReplayAlertClosed: false,

      /**
       * @property {object} file Uploaded file
       */
      file: null,

      linkUrl: '',
      linkTitle: '',

      /**
       * Links and files validation
       *
       * @property {object}  rules                     - Validation rules
       * @property {function}  rules.linkRequired      - Link - is required field
       * @property {function}  rules.linkTitleRequired - Link title attribute is required
       * @property {function}  rules.linkInvalidFormat - Checks link format
       * @property {function}  rules.fileSize          - Checks size of uploaded .txt file
       */
      rules: {
        linkRequired: (v) => !!v || 'Links url required',
        linkTitleRequired: (v) => !!v || 'Links title required',
        linkInvalidFormat: (v) =>
          /* eslint-disable-next-line implicit-arrow-linebreak */
          /(https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%\-/]))?/.test(
            v,
          ) || 'Invalid link format',
        fileSize: (v) => {
          if (v && v.length > 0 && v[0].name.trim().endsWith('.txt')) {
            return v[0].size < 102400 ? true : "Text file can't be over 100 Kb";
          }
          return true;
        },
      },
    };
  },

  created() {
    this.createCaptcha();
    this.emptyTagsList = this.$store.getters.emptyTagsList;
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

  methods: {
    /**
     * Shows error from socket server
     * @param {string} message Error message
     */
    showServerError(message) {
      this.errorMessage = message;
      this.isShowError = true;
    },

    /**
     * Validates that message is correct HTML
     *
     * @param {string} text User message with HTML
     * @returns {Promise<boolean>} is message valid or invalid HTML
     */
    async validateClosedTags(text) {
      let result = true;
      const regExpOpenTag = /<\s*([^/].*?)\s+.*?>/gi;
      const regExpOCloseTag = /<\s*\/(.*?)\s*>/gi;
      const openTags = {};
      const closeTags = {};
      const itOpenTags = text.matchAll(regExpOpenTag);
      const itCloseTags = text.matchAll(regExpOCloseTag);
      const openTagsValues = Array.from(itOpenTags, (m) => m[1]);
      const closeTagsValues = Array.from(itCloseTags, (m) => m[1]);

      for (let i = 0; i < openTagsValues.length; i += 1) {
        if (openTags[openTagsValues[i]]) {
          openTags[openTagsValues[i]] += 1;
        } else {
          openTags[openTagsValues[i]] = 1;
        }
      }

      for (let i = 0; i < closeTagsValues.length; i += 1) {
        if (closeTags[closeTagsValues[i]]) {
          closeTags[closeTagsValues[i]] += 1;
        } else {
          closeTags[closeTagsValues[i]] = 1;
        }
      }

      const closeTagsKeys = Object.keys(closeTags);

      for (let i = 0; i < closeTagsKeys.length; i += 1) {
        if (openTags[closeTagsKeys[i]] !== closeTags[closeTagsKeys[i]]) {
          result = false;
          break;
        }

        delete openTags[closeTagsKeys[i]];
      }

      if (result) {
        const openTagsKeys = Object.keys(openTags);
        for (let i = 0; i < openTagsKeys.length; i += 1) {
          if (!this.emptyTagsList.has(openTagsKeys[i])) {
            result = false;
            break;
          }
        }
      }

      return result;
    },

    /**
     * Creates new captcha image
     *
     * @returns {Promise<void>}
     */
    async createCaptcha() {
      try {
        const c = await getCaptcha();
        this.captchaImg = c.data;
        this.captchaString = c.text;
      } catch (err) {
        this.errorMessage = err.message || "Can't create captcha";
        this.isShowError = true;
      }
    },

    async okButtonClick() {
      const validLinkUrl = await this.$refs.linkUrl.validate();
      const validLinkTitle = await this.$refs.linkTitle.validate();

      if (validLinkUrl.length !== 0 || validLinkTitle.length !== 0) {
        return;
      }

      this.insertTag('a', this.linkUrl, this.linkTitle);
      this.dialog = false;
      this.linkUrl = '';
      this.linkTitle = '';
    },

    cancelButtonClick() {
      this.dialog = false;
      this.linkUrl = '';
      this.linkTitle = '';
    },

    /**
     * Adds <strong> tag
     */
    strongButtonClick() {
      this.insertTag('strong');
    },

    /**
     * Adds <code> tag
     */
    codeButtonClick() {
      this.insertTag('code');
    },

    /**
     * Adds <i> tag
     */
    iButtonClick() {
      this.insertTag('i');
    },

    /**
     * Adds <a> tag
     */
    aButtonClick() {
      /* eslint-disable operator-linebreak */
      if (
        this.$refs.messageText.selectionEnd !== 0 &&
        this.$refs.messageText.selectionEnd >
          this.$refs.messageText.selectionStart
      ) {
        this.dialog = true;
      }
      /* eslint-enable operator-linebreak */
    },

    /**
     *  Insert tag in message
     *
     * @param {string} tagName Name of the tag to add
     * @param {string} hRef If added tag <a> contains value href attribute
     * @param {string} title If added tag <a> contains value title attribute
     */
    insertTag(tagName, hRef = '', title = '') {
      const textArea = this.$refs.messageText;
      const selectedText = this.message.substring(
        textArea.selectionStart,
        textArea.selectionEnd,
      );

      const linkAttrib = hRef && title ? `href="${hRef}" title="${title}"` : '';

      if (selectedText) {
        const replacedText = `<${tagName} ${linkAttrib}>${selectedText}</${tagName}>`;
        this.message = `${this.message.substring(
          0,
          /*  eslint-disable-next-line comma-dangle */
          textArea.selectionStart
        )}${replacedText}${this.message.substring(textArea.selectionEnd)}`;
      }
    },

    /**
     * Validate and send message to the socket server
     *
     * @param message
     * @returns {Promise<void>}
     */
    async sendMessage(message) {
      if (!message || /^\s*$/.test(message)) {
        this.errorMessage = "Message can't be empty";
        this.isShowError = true;
        return;
      }

      if (this.captchaInputValue !== this.captchaString) {
        this.errorMessage = 'Incorrect captcha value';
        this.isShowError = true;
        await this.createCaptcha();
        this.captchaInputValue = '';
        return;
      }

      if (!(await this.validateClosedTags(message))) {
        this.errorMessage = 'Invalid HTML';
        this.isShowError = true;
        return;
      }

      this.message = '';
      /*  eslint-disable-next-line operator-linebreak */
      const regEx =
        /<\s*(?!(i\s.*>)|(\/i\s*?>)|(a.*?>)|(\/a\s*?>)|code|\/code|strong|\/strong).*?>/gi;
      const data = { message: message.replace(regEx, '') };

      if (this.replyMessage && this.isShowReplayAlert) {
        data.parentMessage = this.replyMessage;
      }

      if (this.file?.length > 0) {
        // eslint-disable-next-line prefer-destructuring
        data.fileSource = this.file[0];
        this.file = null;
      }

      this.$emit('sendMessage', data);
      await this.createCaptcha();
      this.captchaInputValue = '';
    },

    /**
     * Hides element with replied message
     */
    hideReplayField() {
      this.isShowReplayAlert = false;
      this.isReplayAlertClosed = true;
      this.$emit('deleteReplayMessage');
    },
  },
};
</script>
<style>
.v-input.message-file .v-input__control,
.v-input__details {
  max-width: 30%;
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

.send-btn {
  padding: 10px;
  height: 50%;
  color: black;
  font-weight: bold;
}

.send-btn:hover {
  color: #d8d6d6;
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
</style>
