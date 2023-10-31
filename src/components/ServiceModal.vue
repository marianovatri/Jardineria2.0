<template>
    <div v-if="showModal" class="service-modal" @click="closeModal">
      <div class="modal-content">
          <img :src="selectedService.image" alt="Imagen del servicio" />
          <span class="close-modal" @click="closeModal">×</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showModal: Boolean,
      selectedService: Object,
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>

.close-modal {
  /* Estilos para la cruz negra */
  font-size: 30px;
  cursor: pointer;
  font-weight: 600;
}
  .service-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .modal-content {
    background-color: #2bcd6f;
    display: flex;
    border-radius: 5px;
    padding: 20px;
    text-align: center;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    align-items: flex-start;
  }
  
  .modal-content img {
    max-width: 100%;
    max-height: 70vh;
  }
  
  button {
    margin-top: 10px;
  }
</style>