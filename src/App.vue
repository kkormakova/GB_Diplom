<template>
<div class="page">
  <main class="main">
    <div class="container">
      <div class="laptop">
        <div class="sections">
          <section :class="['section', 'section-left', {'section-error': isError}]">
            <div class="info">
              <div class="city-inner">
                <input v-model="city" type="text" class="search" placeholder="Enter your city" @keyup.enter="getWeather()">
                <div class="city-inner-after" @click="getWeather()"></div>
                <p class="error">{{ error }}</p>
              </div>
              <WeatherSummary :weatherInfo="weatherInfo" />
            </div>
          </section>
          <section class="section section-right">
            <Highlights :weatherInfo="weatherInfo"/>
          </section> 
        </div>
        <div class="sections" v-if="weatherInfo?.weather">
          <Coords :coord="weatherInfo.coord"/>
          <Humidity :humidity="weatherInfo.main.humidity"  />
        </div>
      </div>
    </div>
  </main>
</div>
</template>

<script>
import WeatherSummary from '@/components/WeatherSummary.vue';
import Highlights from '@/components/Highlights.vue';
import { API_KEY, BASE_URL } from './constants';
import Coords from '@/components/Coords.vue';
import Humidity from '@/components/Humidity.vue';

export default {
  name: 'App',
  data() {
    return {
      city: '',
      weatherInfo: null,
      error: '',
      isError: true,
    }
  },
  components: {
    WeatherSummary,
    Highlights,
    Coords,
    Humidity,
  },
  methods: {
    getWeather() {
      if (this.city.trim().length < 2) {
        this.error = "Enter the correct city name"
        return false
      }
      else {
        this.error = ""
        fetch(`${BASE_URL}?q=${this.city}&units=metric&appid=${API_KEY}`)
          .then((response) => response.json())
          .then((data) => this.weatherInfo = data)
      }
    }
  },
  computed: {
    isErrorCheck() {
      if (this.weatherInfo.value?.cod !== 200) {
        return this.isError = false
      } 
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/common.scss";

.page {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px 0;
  background-color: #59585d;
}
.laptop {
  width: 100%;
  padding: 20px;
  background-color: #0e100f;
  border-radius: 25px;
}
.sections {
  display: flex;
  width: 100%;
}
.section-left {
  width: 30%;
  padding-right: 10px;
}
.section-right {
  width: 70%;
  padding-left: 10px;
}
.section-error {
  min-width: 235px;
  padding-right: 0;
}
.city-inner {
  position: relative;
  display: inline-block;
  width: 100%;
}
// .city-inner::after {
//   content: '';
//   position: absolute;
//   top: 0;
//   right: 10px;
//   width: 25px;
//   height: 25px;
//   background: url("../src/assets/img/search.svg") no-repeat 50% 50%;
//   background-size: contain;
//   transform: translateY(50%);
//   cursor: pointer;
// }
.city-inner-after {
  content: '';
  position: absolute;
  top: 0;
  right: 10px;
  width: 25px;
  height: 25px;
  background: url("../src/assets/img/search.svg") no-repeat 50% 50%;
  background-size: contain;
  transform: translateY(50%);
  cursor: pointer;
}
.error {
  color: rgb(201, 41, 41);
  text-align: center;
  margin: 5px;
}
.info {
  height: 100%;
  padding: 16px;
  background: url("../src/assets/img/gradient-1.jpg") no-repeat 50% 50%;
  background-size: cover;
  border-radius: 25px;
}
.search {
  width: 100%;
  padding: 16px;
  font-family: 'Inter', Arial, sans-serif;
  color: #FFFFFF;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 16px;
  border: none;
  outline: none;
  cursor: pointer;
}
.section-bottom {
  width: 50%;
  margin-top: 16px;
}
.pic-coords {
  background-image: url("../src/assets/img/compass.png");
}
.pic-humidity {
    background-image: url("../src/assets/img/humidity.png");
}
.block-bottom {
  height: 100%;
  margin-left: 10px;
  padding: 28px 16px 16px;
  background: url("../src/assets/img/gradient-1.jpg") no-repeat 0% 0%;
  background-size: cover;
  border-radius: 25px;
}
@media (max-width: 767px) {
  .sections {
    flex-direction: column;
  }
  .section-left {
    width: 100%;
    padding-right: 0;
  }
  .section-right {
    width: 100%;
    margin-top: 16px;
    padding-left: 0;
  }
  .section-bottom {
    width: 100%;
  }
}
</style>
