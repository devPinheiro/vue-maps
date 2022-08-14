<template>
  <li>
    <span @click="fetchBuilding(id)">{{ name }}</span>
    <div class="action">
      <span class="edit" @click="editBuilding(id)"
        ><svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
            stroke="#118167"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.5 2.49998C18.8978 2.10216 19.4374 1.87866 20 1.87866C20.5626 1.87866 21.1022 2.10216 21.5 2.49998C21.8978 2.89781 22.1213 3.43737 22.1213 3.99998C22.1213 4.56259 21.8978 5.10216 21.5 5.49998L12 15L8 16L9 12L18.5 2.49998Z"
            stroke="#118167"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span @click="deleteBuilding(userId, id)"
        ><svg
          width="15"
          height="15"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 6.25H5H21"
            stroke="#AC1519"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 6.25V4.25C8 3.71957 8.21071 3.21086 8.58579 2.83579C8.96086 2.46071 9.46957 2.25 10 2.25H14C14.5304 2.25 15.0391 2.46071 15.4142 2.83579C15.7893 3.21086 16 3.71957 16 4.25V6.25M19 6.25V20.25C19 20.7804 18.7893 21.2891 18.4142 21.6642C18.0391 22.0393 17.5304 22.25 17 22.25H7C6.46957 22.25 5.96086 22.0393 5.58579 21.6642C5.21071 21.2891 5 20.7804 5 20.25V6.25H19Z"
            stroke="#AC1519"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10 11.25V17.25"
            stroke="#AC1519"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14 11.25V17.25"
            stroke="#AC1519"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </div>
  </li>
</template>

<script lang="ts">
import router from "@/router";
import { useStore } from "@/store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListItem",
  props: {
    name: {
      type: String,
    },
    id: {
      type: String,
    },
    userId: {
      type: Number,
    },
  },
  setup() {
    const store = useStore();
    const fetchBuilding = (id: string | undefined) => {
      store.dispatch("fetchBuilding", id);
      router.push("/");
    };

    const deleteBuilding = (
      userId: number | undefined,
      id: string | undefined
    ) => {
      store.dispatch("deleteBuilding", { userId, id });
    };

    const editBuilding = (id: string | undefined) => {
      router.push(`/edit/${id}`);
    };
    return {
      fetchBuilding,
      deleteBuilding,
      editBuilding,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../sass/globals.scss";

ul {
  list-style: none;
  padding: 0;
}
li {
  text-decoration: none;
  cursor: pointer;
  list-style: none;
  margin: 0px 5px;
  padding: 5px 10px;
  color: $theme-color;
  @extend .f-split;
  @extend .align-center;
  font-weight: 400;
  font-size: 14px;
  border-radius: 6px;
  transition: 0.3s;
  .action {
    display: none;
    @extend .f-spread;
    .edit {
      margin-right: 4px;
    }

    svg {
      @extend .f-v-center;
    }
  }
  &:hover {
    background-color: $hover-menu-bg;
    .action {
      @extend .f-v-center;
    }
  }
  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
}
</style>
