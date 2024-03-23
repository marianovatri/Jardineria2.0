<template>
  <v-app>
    <!-- <v-app-bar app color="green darken-2" dark class="fixed-navbar" >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">Jardineria 2.0</v-toolbar-title>
    </v-app-bar> -->

    <nav id="nav" class="menu">
      <v-app-bar-nav-icon @click="showDrawer"></v-app-bar-nav-icon>
      <div class="navigation-container d-flex ma-2">  
        <v-img src="../assets/Logo.jpg" alt="Logo Jardineria2.0" loading="lazy" class="header-image" />
        <div class="text-white text-h5 ml-2">Jardineria 2.0</div>
      </div>
      <ul class="links d-flex">  
        <li class="ml-5 cursor-pointer" v-for="link in links" :key="link.id" @click="scrollToSection(link.text)">
          <a class="link pa-3 rounded-shaped">{{ link.text }}</a> 
        </li>
      </ul>
      <v-btn class="ma-5 bg-green-lighten-5 text-green-darken-4">
        <v-icon dark>mdi-whatsapp</v-icon>
        Pedir presupuesto
      </v-btn>
    </nav>

    <v-navigation-drawer class="text-center w-100" app v-model="drawer">
      <v-list >
        <v-list-item  v-for="link in links" :key="link.id" link @click="scrollToSection(link.text)">
          <v-list-item-content>
            <v-list-item-title class="text-h4 mt-5 pa-5">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list-item link @click="closeDrawer" class="close-item">
        <v-list-item-content>
          <v-list-item-title class=" color-white text-h4 pa-5">Cerrar</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="body" id="Biografía">
        <v-row class="header align-center">
          <!-- <v-col cols="12" class="text-center pa-10">
            <h1 class="headline font-weight-bold text-white">
              TU JARDÍN, NUESTRO COMPROMISO
            </h1>
            <h2 class="subheadline text-white">Jardinería Profesional a tu Alcance</h2>
          </v-col> -->

          <v-col cols="12" class="text-center">
            <v-carousel v-model="carouselIndex" 
            cycle
            interval="5000"
            hideDelimiters
            >
              <v-carousel-item v-for="(image, index) in imageUrls"
                height="100%"
                :src="imageSrc(image)"
                alt="Imagen del Carrusel"
                cover
              >
                <div class="d-flex flex-column fill-height justify-center align-center">
                  <div class="text-h3 headline font-weight-bold text-white">
                    TU JARDÍN, NUESTRO COMPROMISO
                  </div>
                  <div class="text-h5 headline text-white">
                    Jardinería Profesional a tu Alcance
                  </div>
                </div>
            
              </v-carousel-item>
            </v-carousel>

            <!-- <v-btn class="ma-5 bg-light-green-darken-4">
              Obtener un presupuesto
            </v-btn>
            <v-btn class="ma-5 text-green-darken-4">
              Ver servicios
            </v-btn> -->
          </v-col>
        </v-row>

        <v-row>
          <v-col class="letter section-container scroll-content fadeTop d-flex pa-16">
              <iframe style="border:0;" src="https://lottie.host/embed/13b3d8ec-9604-48fa-ab54-e6dae63af9c5/t36iXCYCyd.json"></iframe>
              <v-container>
                <h2 class="biografia text-h4 font-weight-bold mb-5">¿Quiénes <span style="color: green">Somos?</span> </h2>
                <p class="biografia text-h6 font-weight-regular">
                  Somos una empresa apasionada por la naturaleza y comprometida con el mantenimiento de los espacios verdes. En <span class="font-weight-bold" style="color: green">Jardineria2.0</span> nos enorgullece brindar una excelente atención en el cuidado de sus jardines. Ofrecemos un servicio personalizado y profesional, utilizando los mejores materiales y técnicas.
                </p>
                <br>
                <p class="biografia text-h6 font-weight-regular">
                  Actualmente, ofrecemos servicios de jardinería de alta calidad, como el diseño y mantenimiento de jardines, poda de árboles, control de plagas y enfermedades, y mucho más.                </p>
              </v-container>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="mt-10 d-flex justify-center">
            <v-card class="pt-5 custom-col rounded-shaped" style="width: min-content;">
              <iframe style="border: 0; height: 70%;" src="https://lottie.host/embed/d0967822-3f94-4f17-adda-73b4f9d650c9/GqaKVi4S4S.json"></iframe>
              <h2 style="font-family: 'Roboto', sans-serif; color: green;">Nuestros Servicios</h2>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="d-flex" id="Servicios">
          <v-col cols="12" sm="12" md="6" lg="6" v-for="(service, index) in services" :key="service.id">
            <v-card
              class=" d-flex flex-column mx-auto scroll-content fadeTop text-center align-center"
              max-width="500"
            >
              <v-img
                :src="imageSrc(service.image)"
                loading="lazy"
                :width="300"
                alt="Icono de servicio"
                class="service-image"
                @click="openModal(service)"
              ></v-img>
    
              <v-card-title>
                {{service.alt}}
              </v-card-title>
    
              <div class="text-grey-darken-1 mx-4">
                {{ service.description }}
              </div>
                    
              <v-card-actions>
                <v-btn
                  color="green darken-2"
                  icon
                  variant="tonal"
                  :href="'https://wa.me/3564328430?text=Hola%2C%20estoy%20interesado%20en%20obtener%20un%20presupuesto%20para%20el%20servicio%20de%20' + service.alt"
                  target="_blank"
                  style="width: 100%;border-radius: 0;font-size: 70%;"
                >
                  <v-icon dark>mdi-whatsapp</v-icon>
                  Pedir Presupuesto
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>



        <!-- <v-row>
          <v-col cols="12" class="">
            <h2 id="Servicios" class="mb-4 text-center">Nuestros servicios</h2>
            <v-card class="d-flex flex-column align-center letter">

              <v-card-text cols="12" sm="6" md="4" lg="3" v-for="(service, index) in services" :key="service.id" >
                <v-container class="service-box">
                  <div class=" section-container scroll-content fadeTop d-flex">


                    <v-img
                      :src="imageSrc(service.image)"
                      loading="lazy"
                      :width="300"
                      aspect-ratio="1/1"
                      alt="Icono de servicio"
                      class="service-image"
                      @click="openModal(service)"
                    ></v-img>
                    <div class="px-3 d-flex flex-column justify-space-between">
                      <p class="text-h5 text-md-h4 text-lg-h4 mb-5 mt-5">{{ service.alt }}</p> 
                      <p class="text-grey-darken-1 mx-4 text-h6 text-md-h5 text-lg-h5">{{ service.description }}</p>
                      <v-btn
                        color="green darken-2"
                        icon
                        variant="tonal"
                        :href="'https://wa.me/3564328430?text=Hola%2C%20estoy%20interesado%20en%20obtener%20un%20presupuesto%20para%20el%20servicio%20de%20' + service.alt"
                        target="_blank"
                        style="width: 100%;border-radius: 0;font-size: 70%;"
                      >
                        <v-icon dark>mdi-whatsapp</v-icon>
                        Pedir Presupuesto
                      </v-btn>
                    </div>
                  </div>
                </v-container>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row> -->

        <!-- <v-row>
          <v-col cols="12">
            <v-container class="section-container">
              <h2 id="Contacto" class="mb-4 text-center">Contacto</h2>
              <div class="contact-details align-items-center">
                <div class="d-flex justify-space-around w-100 mb-4">
                  <div class="contactBox">
                    <v-btn class="contact-item" color="green">
                      <v-icon size="20" color="white">mdi-phone</v-icon>
                    </v-btn>
                    <span class="cursor-pointer text-md-h6 text-lg-h6">Teléfono: 3564328430</span>
                  </div>
                  <div class="contactBox">
                    <v-btn class="contact-item" color="blue" @click="openLink('https://www.facebook.com/profile.php?id=100063937125255')">
                      <v-icon size="20" color="white">mdi-facebook</v-icon>
                    </v-btn>
                    <span @click="openLink('https://www.facebook.com/profile.php?id=100063937125255')" class="cursor-pointer text-md-h6 text-lg-h6">Seguinos en Facebook</span>
                  </div>
                </div>
                <div class="d-flex justify-space-around w-100 mb-4">
                  <div class="contactBox">
                    <v-btn class="contact-item" color="pink" @click="openLink('https://instagram.com/jardineria2.0/')">
                      <v-icon size="20" color="white">mdi-instagram</v-icon>
                    </v-btn>
                    <a class="cursor-pointer text-md-h6 text-lg-h6" href="https://instagram.com/jardineria2.0/" target="_blank" aria-label="Seguinos en instagram">
                      Instagram: jardineria2.0
                    </a>
                  </div>
                  <div class="contactBox">
                    <v-btn class="contact-item" color="green" @click="openWhatsApp()">
                      <v-icon size="20" color="white">mdi-whatsapp</v-icon>
                    </v-btn>
                    <span @click="openWhatsApp()" class="cursor-pointer text-md-h6 text-lg-h6">WhatsApp: 3564328430</span>
                  </div>
                </div>
              </div>
            </v-container>
          </v-col>
        </v-row> -->

        <v-row>
          <v-container class="section-container d-flex" id="Contacto">
            <v-col cols="8">
              <h2 class="text-white">Sobre Jardinería 2.0</h2>
              <p class="text-white"> Escriba un párrafo corto y descriptivo sobre la historia de Monarch Jardinería. Puede mencionar cuándo se fundó, su enfoque principal, o cualquier otra información que destaque su negocio.
              </p>
            </v-col>
            <v-col cols="4">
              <h2 class="text-white">Datos de Contacto</h2>
              <div class="contact-details">
                <div class="contactBox">
                  <v-btn class="contact-item" icon color="green">
                    <v-icon size="20" color="white">mdi-phone</v-icon>
                  </v-btn>
                  <span class="cursor-pointer text-md-h6 text-lg-h6 text-white">Teléfono: 3564328430</span>
                </div>
                <div class="contactBox">
                  <v-btn class="contact-item" icon color="blue" @click="openLink('https://www.facebook.com/profile.php?id=100063937125255')">
                    <v-icon size="20" color="white">mdi-facebook</v-icon>
                  </v-btn>
                  <span @click="openLink('https://www.facebook.com/profile.php?id=100063937125255')" class="cursor-pointer text-md-h6 text-lg-h6 text-white">Seguinos en Facebook</span>
                </div>
                <div class="contactBox">
                  <v-btn class="contact-item" icon color="pink" @click="openLink('https://instagram.com/jardineria2.0/')">
                    <v-icon size="20" color="white">mdi-instagram</v-icon>
                  </v-btn>
                  <a class="cursor-pointer text-md-h6 text-lg-h6" href="https://instagram.com/jardineria2.0/" target="_blank" aria-label="Seguinos en instagram">
                    Instagram: jardineria2.0
                  </a>
                </div>
                <div class="contactBox">
                  <v-btn class="contact-item" icon color="green" @click="openWhatsApp()">
                    <v-icon size="20" color="white">mdi-whatsapp</v-icon>
                  </v-btn>
                  <span @click="openWhatsApp()" class="cursor-pointer text-white text-md-h6 text-lg-h6">WhatsApp: 3564328430</span>
                </div>
              </div>
            </v-col>
          </v-container>
        </v-row>

        <div class="scroll-to-top" @click="scrollToTop" v-show="showScrollToTop">
          <v-icon color="white">mdi-chevron-up</v-icon>
        </div>

        <!--  <div :class="scrollToTopContainerClass">
          <a target="_blank" class="whatsapp-link">
            <div class="whatsapp-circle">
              <a :href="whatsappLink">
                <v-icon color="white">mdi-whatsapp</v-icon>
              </a>
            </div>
          </a>
        </div> -->

        <div :class="moreUp">
          <a target="_blank" class="whatsapp-link">
            <div class="whatsapp-circle">
              <a :href="whatsappLink">
                <v-icon color="white">mdi-whatsapp</v-icon>
              </a>
            </div>
          </a>
          <a target="_blank" class="instagram-link" href="https://instagram.com/jardineria2.0/">
            <div class="instagram-circle">
              <v-icon color="white">mdi-instagram</v-icon>
            </div>
          </a>
        </div>

        <service-modal :show-modal="isModalOpen" :selected-service="selectedService" @close="closeModal" />

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ServiceModal from './ServiceModal.vue';

const whatsappNumber = '3564328430';
const whatsappMessage = 'Hola%2C%20estoy%20interesado%20en%20obtener%20un%20presupuesto';

export default {
  components: {
    ServiceModal,
  },
  data() {
    return {

      imageUrls: [ 
        "ARMADOC.jpeg",
        "CC2.jpeg",
        "CC3.jpeg",
        "CC3.jpeg",
        "CC3.jpeg",
      ],
      carouselIndex: 0, 
      
      dynamicWords: ['Jardines', 'Flores', 'Paisajismo', 'Naturaleza', 'Verdor'], // Lista de palabras relacionadas
      dynamicWordIndex: 0, // Índice actual de la palabra

      isModalOpen: false,
      selectedService: null,

      drawer: false,

      showScrollToTop: false,

      links: [
        { id: 1, text: "Biografía" },
        { id: 2, text: "Servicios" },
        { id: 3, text: "Contacto" },
      ],

      instagramLink: 'https://www.instagram.com/jardineria2.0/',

      services: [
        {
          id: 4,
          image: 'CORTECESPED.jpeg',
          alt: 'CORTE DE CÉSPED',
          description: "El corte de césped es uno de nuestros servicios principales. Utilizamos equipos diseñados para realizar este trabajo de manera uniforme y mantener tu jardín en óptimas condiciones."
        },
        {
          id: 2,
          image: 'N1.jpeg',
          alt: 'NIVELADO DE TERRENO',
          description: "Nuestro equipo está especializado en nivelar terrenos de manera precisa y profesional. Realizamos el nivelado necesario para garantizar que tu césped quede perfectamente cortado y uniforme."
        },
        {
          id: 6,
          image: 'LIMPIEZA.jpeg',
          alt: 'LIMPIEZA DE JARDINES Y LOTES',
          description: "Ofrecemos servicios de limpieza de jardines y lotes, eliminando hojas, ramas y desechos. Deja que nuestro equipo se encargue de mantener tu espacio exterior limpio y ordenado."
        },
        {
          id: 3,
          image: 'PODA.jpeg',
          alt: 'PODA DE ÁRBOLES Y PALMERAS',
          description: "La poda de árboles y palmeras es esencial para mantener la salud y estética de tus plantas. Nuestros expertos en jardinería se encargarán de manera profesional, asegurando que tus plantas crezcan en forma saludable."
        },
        {
          id: 1,
          image: 'CC2.jpeg',
          alt: 'COLOCACIÓN DE CÉSPED',
          description: "Realizamos colocación de césped de alta calidad para mantener tu jardín impecable y verde durante todo el año."
        },
        {
          id: 5,
          image: 'JARDINSECO.jpeg',
          alt: 'JARDÍN SECO',
          description: "Nos especializamos en la creación y mantenimiento de jardines secos, ideales para conservar agua y energía. Diseñamos y cuidamos jardines que requieren poco riego, pero que lucen hermosos durante todo el año."
        },
      ],

    };
  },

  mounted() {

    let lastScroll = 0;

    // const nav = document.getElementById('nav');

    // if (lastScroll == 0) {
    //   nav.classList.add('visible');
    // }

    window.addEventListener('scroll', function()  {

      const currentScroll = window.scrollY;

      // if (currentScroll > lastScroll) {  
      //   nav.classList.remove('visible');
      // } else {        
      //   nav.classList.add('visible');
      // }

      lastScroll = currentScroll;

      let elements = document.getElementsByClassName('scroll-content');
      let screenSize = window.innerHeight;

      if (elements != null) {
        for(var i = 0; i < elements.length; i++) {
          let element = elements[i];
      
          if(element.getBoundingClientRect().top < screenSize) {     
            element.classList.add('visible');
          } else {      
            element.classList.remove('visible');
          }
        }    
      }
      
    });

    window.addEventListener('scroll', this.handleScroll);

  },

  methods: {

    imageSrc(image) {
      return new URL(`../assets/${image}`, import.meta.url).href;
    },

    closeDrawer() {
      this.drawer = false;
    },

    openWhatsApp() {
      const phoneNumber = '3564328430'; // Número de WhatsApp al que deseas enviar el mensaje
      const message = 'Hola, estoy interesado en obtener un presupuesto'; // Mensaje predeterminado (puedes personalizarlo)
      const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappLink, '_blank');
    },

    openLink(link) {
      window.open(link, "_blank"); // Abre el enlace en una nueva ventana o pestaña del navegador
    },

    handleScroll() {
      // Muestra u oculta el botón de flecha según la posición de desplazamiento
      this.showScrollToTop = window.scrollY > 200; // Cambia "200" al valor deseado
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Agrega un desplazamiento suave
      });
    },

    openModal(service) {
      this.selectedService = service;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },

    showDrawer () {
      this.drawer = !this.drawer;
      this.scrollToTop()
    },

    scrollToSection(target) {  
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        this.drawer = false; // Cierra el cajón de navegación después de hacer clic en un enlace
      }
    }


  },

  computed: {

    whatsappLink() {
      return `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    },

    scrollToTopContainerClass() {
      return {
        'whatsapp-circle-container': this.showScrollToTop,
        'whatsapp-circle-container-bottom': !this.showScrollToTop,
      };
    },

    moreUp() {
      return {
        'instagram-circle-container': this.showScrollToTop,
        'instagram-circle-container-bottom ': !this.showScrollToTop,
      };
    },
  }
};
</script>

<style scoped>

* {
  font-family: "Open Sans", sans-serif;
}

.navigation-container {
  display: flex;
  align-items: center;
}

#Contacto {
  background-color: #008036;
}

#Biografía {
  padding: 0;
}

.custom-col {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.headline {
  font-size: xxx-large;
  font-weight: 500;
}

.subheadline {
  font-weight: 400;
}

.instagram-circle-container {
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 1001; /* Asegura que esté por encima del modal */
}
 
.instagram-circle-container-bottom {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1001; /* Asegura que esté por encima del modal */
}

.instagram-circle {
  background-color: #C13584; /* Color de Instagram */
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #adadad;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border: 1px solid;
  font-size: 24px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Agrega una transición de color */
}

.instagram-circle:hover {
  background-color: #E4405F; /* Cambia el color al pasar el mouse sobre el círculo */
}

.color-white {
  color: white !important;
}

.close-item {
  background-color: #209620;
}

.cursor-pointer {
  cursor: pointer;
}

/* .service-box {
  width: 75%;
} */

.link {
  transition: all 0.5s;
  background-color: #007230
}

.link:hover {
  background-color: #0b4c26;
}

.links a {
  font-size: larger;
  font-weight: 500;
  margin-left: 10px;
}

@media (min-width: 768px) {
  .menu .v-app-bar-nav-icon {
    display: none;
  }
}

@media (max-width: 768px) {
  .links {
    display: none !important;
  }
  .service-image {
    width: 80% !important;
  }

  .revert {
    flex-direction: column-reverse !important;
  }

  .service-box {
    width: 100%;
  }
}

.fadeTop {
  opacity: 0;
  transform: translate(0, 10vh);
  transition: all 1.5s;
}
.fadeRight {
  opacity: 0;
  transform: translate(10vh, 0vh);
  transition: all 1.5s;
}
.fadeLeft {
  opacity: 0;
  transform: translate(0vh, 10vh);
  transition: all 1.5s;
}

.c-pointer {
  cursor: pointer;
}

.v-list-item-title {
  color: black;
}

.visible {
  opacity: 1 !important;
  transform: translate(0, 0)
}

.opacity0 {
  opacity: 0;
  transition: all 0.5s
}

a {
  color: white;
  text-decoration: none;
  font-size: medium;
}

a:hover {
  text-decoration: none;
}

.menu {
  background-color: #008036;
  display: flex;
  align-items: center;
  padding: 1rem;
  transition: all 0.3s ease;
  justify-content: space-between;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

ul {
  list-style: none;
  display: block
}

.biografia {
  font-size: 19px;
  /* text-align: center; */
  font-family: revert;
}

.letter {
  background-color: transparent;
}

.contactBox {
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  text-align: center;
}

.contact-item {
  margin: 5px;
  padding: 0rem;
  justify-content: center;
  cursor: pointer;
}

.v-row {
  justify-content: center;
}

.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  border: 1px solid #adadad;
  z-index: 1002; /* Asegura que esté por encima del modal y la flecha de WhatsApp */
  background-color: rgb(37 145 156);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Agrega una transición de color */
}

.scroll-to-top:hover {
  background-color: rgb(42, 200, 217);}

.instagram-circle-container{
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 1001; /* Asegura que esté por encima del modal */
}

.whatsapp-circle-container {
  position: fixed;
  bottom: 135px;
  right: 20px;
  z-index: 1001; /* Asegura que esté por encima del modal */
}

.instagram-circle-container-bottom {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1001; /* Asegura que esté por encima del modal */
}

.whatsapp-circle-container-bottom {
  position: fixed;
  bottom: 75px;
  right: 20px;
  z-index: 1001; /* Asegura que esté por encima del modal */
}
.whatsapp-circle {
  background-color: green;
  width: 50px;
  border: 1px solid #adadad;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Agrega una transición de color */
}

.whatsapp-circle:hover {
  background-color: #25d366; /* Cambia el color al pasar el mouse sobre el círculo */
}

.whatsapp-link {
  text-decoration: none;
}

.service-image {
  cursor: zoom-in;
  width: 40%;
}

.wpp-button {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.wpp-button v-icon {
  margin-right: 8px;
}

.header-image {
  height: 4rem;
  width: 4rem;
  animation: logo-appear-animation 2s ease forwards;
  border-radius: 50%;
}

@keyframes logo-appear-animation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.rounded-image {
  width: 150px;
  height: 150px;
  border-radius: 50%; /* Esto hace que la imagen sea un círculo */
  overflow: hidden; /* Esto asegura que la imagen se ajuste al círculo */
}

.rounded-imageI {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ajusta la imagen para que cubra el área redondeada */
}

.body {
  background-color: #f0f0f0;
}
.section-container {
  background-color: white;
  padding: 20px;
  min-width: 100%;
  border-radius: 5px;
  box-shadow: 0 2px 10px #000000ba;
}

/* .section-container:hover {
  transform: scale(1.015);
} */


.contact-details {
  /* display: flex; */
  /* align-items: flex-start; */
  /* margin-top: 20px; */
  justify-content: space-around;
}

.contact-item {
  display: flex;
  align-items: center;
}

.contact-item a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.contact-item a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .section-container {
    flex-direction: column;
    padding: 10px 5px;
  }

  .contact-details {
    flex-direction: column;
  }
}

</style>
