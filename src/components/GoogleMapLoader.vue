<template>
  <div class="google-map" ref="googleMap"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { Loader } from "@googlemaps/js-api-loader";

export default defineComponent({
  name: "GoogleMapLoader",
  props: {
    apiKey: String,
    lat: Number,
    lng: Number,
    building: String,
    country: String,
    loading: Boolean,
  },
  emits: ["change"],
  setup(props, { emit }) {
    emit("change");
    const googleMap = ref(null);

    const loader = new Loader({
      apiKey: props.apiKey || "",
      libraries: ["places"],
    });
    const point = {
      lat: props.lat || 0,
      lng: props.lng || 0,
    };
    const mapOptions = {
      center: point,
      zoom: 6,
    };
    // fetch google map api
    const Map: any = (ref: HTMLElement) => {
      loader
        .load()
        .then((google) => {
          const map = new google.maps.Map(ref, mapOptions);
          const infoWindow = new google.maps.InfoWindow({
            content: `<div class='map-info'>${props.building} located in ${props.country}</div>`,
          });
          const marker = new google.maps.Marker({
            position: point,
            map,
          });
          marker.addListener("click", () => {
            infoWindow.open({
              anchor: marker,
              map,
              shouldFocus: false,
            });
          });
        })
        .catch((e) => {
          console.log("====================================");
          console.log(e);
          console.log("====================================");
          // do something
        });
    };
    onMounted(() => {
      Map(googleMap.value);
    });
    return {
      googleMap,
    };
  },
  components: {},
});
</script>

<style scoped lang="scss">
.google-map {
  display: flex;
  position: absolute;
  width: 70%;
  height: 80%;
}
</style>
