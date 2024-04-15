<template>
    <div class="section highlights">
        <div class="title">Today's Highlights</div>
        <div class="highlights-wrapper">
            <div class="highlight">
                <div class="card">
                    <div class="card-title">Wind</div>
                    <div class="card-pic card-pic--wind"></div>
                    <div class="card-info">
                        <div class="card-justify">
                            <div class="info-main">
                                <div class="info-main-num">{{ weatherInfo?.wind?.speed }}</div>
                                <div class="info-main-text">m/s</div>
                            </div> 
                            <div class="info-main">
                                <div class="info-main-num">{{ weatherInfo?.wind?.deg }}</div>
                                <div class="info-main-text">deg</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-small">
                    <div class="card-small-title">Wind gusts</div>
                    <div class="card-small-info">
                        <div class="card-small-data" v-if="weatherInfo?.wind?.gust">
                            <div class="info-main-num">{{ Math.round(weatherInfo?.wind?.gust) }}</div>
                            <div class="info-main-text">m/s</div>
                        </div>
                        <div class="card-small-hint">
                            <div class="card-small-pic card-small-pic--wind"></div>
                            <div class="card-small-text text-egorova">Learn
                                <a href="https://www.windy.com/articles/weather-phenomena-what-s-the-difference-between-sustained-winds-and-wind-gusts-10390?satellite,7.787,115.115,5" target="_blank">more</a> about gusts
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="highlight">
                <div class="card">
                    <div class="card-title">Pressure</div>
                    <div class="card-pic card-pic--pressure"></div>
                    <div class="card-info">
                        <div class="card-centered">
                            <div class="info-main">
                                <div class="info-main-num">{{ Math.round(weatherInfo?.main?.pressure * 0.750062) }}</div>
                                <div class="info-main-text">mm</div>
                            </div> 
                        </div> 
                    </div>
                </div>
                <div class="card-small">
                    <div class="card-small-title">Feels like</div>
                    <div class="card-small-info">
                        <div class="card-small-data">
                            <div class="info-main-num">{{ Math.round(weatherInfo?.main?.feels_like) }}</div>
                            <div class="info-main-text">°C</div>
                        </div>
                        <div class="card-small-hint">
                            <div class="card-small-pic card-small-pic--margin card-small-pic--pressure"></div>
                            <div class="card-small-text">How hot or cold it really feels</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="highlight">
                <div class="card">
                    <div class="card-title">Sunrise and sunset</div>
                    <div class="card-pic card-pic--sun"></div>
                    <div class="card-info">
                        <div class="states">
                            <div class="state">
                                <div class="state-pic"></div>
                                <div class="state-title">Sunrise</div>
                                <div class="state-time">{{ sunriseTime }}</div>
                            </div>
                            <div class="state">
                                <div class="state-pic state-pic--flipped"></div>
                                <div class="state-title">Sunset</div>
                                <div class="state-time">{{ sunsetTime }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-small">
                    <div class="card-small-title">Cloudiness</div>
                    <div class="card-small-info">
                        <div class="card-small-data">
                            <div class="info-main-num">{{ weatherInfo?.clouds?.all }}</div>
                            <div class="info-main-text">%</div>
                        </div>
                        <div class="card-small-hint">
                            <div class="card-small-pic card-small-pic--sun"></div>
                            <div class="card-small-text">The sky fraction obscured by clouds</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    weatherInfo: {
        type: [Object, null],
        required: true,
    },
});

const getTime = (seconds) => {
  return new Date(seconds * 1000).toLocaleTimeString('ru-RU', { timeZone: 'Atlantic/Reykjavik' })
}

const timezone = computed(() => props.weatherInfo?.timezone);

const sunriseTime = computed(() => {
    return getTime(props.weatherInfo?.sys?.sunrise + timezone.value);
});

const sunsetTime = computed(() => {
    return getTime(props.weatherInfo?.sys?.sunset + timezone.value);
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common.scss";

.highlights {
    padding: 28px 16px 16px;
    background: url("../assets/img/gradient-4.jpg") no-repeat 0% 0%;
    background-size: cover;
    border-radius: 25px;
}
.highlights-wrapper {
    display: flex;
    justify-content: space-between;
}
.title {
    padding-bottom: 16px;
}
.highlight {
    width: 32%;
}
.card {
    min-height: 230px;
    padding: 16px;
    background: url("../assets/img/gradient-2.jpg") no-repeat 50% 50%;
    background-size: cover;
    border-radius: 8px;
}
.card-centered {
    display: flex;
    justify-content: center;
    margin-top: 40px;
}
.card-justify {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
}
.card-title {
    padding-bottom: 12px;
    font-size: 13px;
}
.card-pic {
    width: 100%;
    height: 90px;
    margin-bottom: 16px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
}
.card-pic--wind {
    background-image: url("../assets/img/equalizer-2.png");
}
.card-pic--pressure {
    background-image: url("../assets/img/barometer.png");
}
.card-pic--sun {
    background-image: url("../assets/img/sun-moving.png");
}
.states {
    display: flex;
    justify-content: space-between;
}
.states--margin {
    margin-top: 40px;
}
.state {
    width: 40%;
}
.state:last-child {
    text-align: right;
}
.state-pic {
    width: 20px;
    height: 20px;
    margin-bottom: 6px;
    background: url("../assets/img/sun.svg") no-repeat 50% 50%;
    background-size: cover;
}
.state-pic--flipped {
    margin-left: auto;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
}
.state-title {
    font-size: 12px;
    color: #FFF347;
}
.state-time {
    font-size: 13px;
    font-weight: 700;
}
.info-main {
    display: flex;
    align-items: flex-end;
}
.info-main:last-child {
    text-align: right;
}
.info-main-num {
    font-size: 20px;
}
.info-main-text {
    padding-left: 2px;
    padding-bottom: 3px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.75);
}
.card-small {
    margin-top: 12px;
    padding: 12px 16px;
    background: url("../assets/img/gradient-2.jpg") no-repeat 50% 50%;
    background-size: cover;
    border-radius: 8px;
}
.card-small-title {
    font-size: 13px;
}
.card-small-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.card-small-pic {
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
}
.card-small-pic--margin {
    width: 16px;
    height: 16px;
    margin-bottom: 3px;
}
.card-small-pic--wind {
    background-image: url("../assets/img/gusts.svg");
}
.card-small-pic--pressure {
    background-image: url("../assets/img/humidity.svg");
}
.card-small-pic--sun {
    background-image: url("../assets/img/cloud.svg");
}
.card-small-data {
    display: flex;
    align-items: flex-end;
    width: 45%;
}
.card-small-hint {
    width: 55%;
}
.card-small-text {
    font-size: 11px;
    line-height: 1.2;
    color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 575px) {
    .highlights-wrapper {
        flex-direction: column;
    }
    .highlight {
        width: 100%;
        margin-bottom: 16px;
    }
}
@media (max-width: 1199px) {
    .card {
        padding: 12px;
    }
    .card-title {
        font-size: 12px;
    }
    .state-time {
        font-size: 11px;
    }
    .info-main-num {
        font-size: 18px;
    }
    .info-main-text {
        padding-bottom: 1.5px;
        font-size: 12px;
    }
    .card-small-info {
        flex-direction: column;
        align-items: flex-start;
    }
    .card-small-pic {
        display: none;
    }
    .card-small-data {
        width: 100%;
        padding-top: 8px;
    }
    .card-small-hint {
        width: 100%;
    }
    .card-small-text {
        min-height: 22px;
        font-size: 9px;
    }
}
</style>