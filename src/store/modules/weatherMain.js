const images = [
    {
        id: 1,
        name: 'clear sky',
        img: require('@/assets/img/weather-main/clear sky.png'),
    }
]
const getters = {
    GET_NAME_IMG(images){
        return images.name;
    }
}