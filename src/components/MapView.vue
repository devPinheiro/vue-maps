<!-- <template>
  <template>
    <GoogleMapLoader :mapConfig="{}" apiKey="yourApiKey">
      <template v-slot="slotProps">
        {{ slotProps.map }}
        {{ slotProps.google }}
      </template>
    </GoogleMapLoader>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapSettings } from "@/constants/mapSettings";

export default defineComponent({
  name: "MapView",
  computed: {
    mapConfig() {
      return {
        ...mapSettings,
        center: { lat: 0, lng: 0 },
      };
    },
  },
});
</script>

<style scoped></style> -->
