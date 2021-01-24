<template>
  <div class="home">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        img-src="https://via.placeholder.com/1920x450"
      ></b-carousel-slide>

      <b-carousel-slide
        caption="Mil Brinquedos, mil sorrisos"
        img-src="https://via.placeholder.com/1920x450"
      ></b-carousel-slide>
    </b-carousel>
    <div class="button-donations">
      <router-link to="/donations" class="btn primary donations">Ver doações</router-link>
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import axios from "axios";
import { baseApiUrl } from "@/global";

export default {
  name: "Home",
  components: { PageTitle },
  data: function() {
    return {
      stat: {},
      slide: 0,
      sliding: null
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    }
  }
};
</script>

<style>
.button-donations {
  background-color: #46a0be;
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button-donations a {
  width: 300px;
  height: 60px;
  font-weight: bold;
  font-size: 22px;
  color: #46a0be;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button-donations a:hover {
  background-color: #f2f2f2;
  color: #31c5f7;
}
.carousel-caption h3 {
  color: #4f00f7;
  text-transform: uppercase;
  font-weight: bold;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.4);
}
</style>
