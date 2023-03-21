<template>
  <div class="alert alert-warning" role="alert">
    <div
      class="btn-toolbar"
      role="toolbar"
      aria-label="Toolbar with tag buttons"
    >
      <div class="btn-group me-2" role="group" aria-label="Button for tag a">
        <button type="button" class="btn btn-warning">&lt;a&gt;</button>
      </div>
      <div class="btn-group me-2" role="group" aria-label="Button for tag code">
        <button type="button" class="btn btn-secondary">&lt;code&gt;</button>
      </div>
      <div class="btn-group me-2" role="group" aria-label="Button for tag i">
        <button type="button" class="btn btn-info">&lt;i&gt;</button>
      </div>
      <div
        class="btn-group me-2"
        role="group"
        aria-label="Button for tag strong"
      >
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
      <button
        type="button"
        class="btn btn-primary send-btn align-self-center ms-2"
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
export default {
  name: 'ChatControl',
  methods: {
    sendMessage() {},
  },
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

.btn-group .btn {
  padding: 3px;
  font-size: 0.8rem;
}

.send-btn {
  padding: 5px 10px;
  height: 50%;
}
</style>
