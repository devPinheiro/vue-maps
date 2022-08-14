import { InjectionKey } from "vue";
import {
  createStore,
  useStore as baseUseStore,
  Store,
  ActionContext,
} from "vuex";
type Context = ActionContext<State, State>;

export type IBuilding = {
  userId: number;
  name: string;
  countryName: string;
  id: string;
  position: Array<number>;
};

export type ICountry = {
  name: string;
  id: string;
  position: Array<number>;
};

type IUser = {
  id: number;
  buildings: Array<IBuilding>;
  username: string;
};

type ISelectedUserBuilding = {
  buildings?: Array<IBuilding>;
  building?: IBuilding | null;
  loading: boolean;
};

export interface State {
  users: Array<IUser>;
  selectedUserId: number;
  selectedUserBuildings: ISelectedUserBuilding;
  selectedUserBuilding: ISelectedUserBuilding;
  loading: boolean;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    users: [
      { username: "Build Corp", buildings: [], id: 0 },
      { username: "Marina", buildings: [], id: 1 },
    ],
    selectedUserId: 0,
    selectedUserBuildings: { buildings: [], loading: false },
    selectedUserBuilding: { building: null, loading: false },
    loading: false,
  },
  getters: {
    users: (state: State) => {
      return state.users;
    },
    getSelectedUserId: (state: State) => {
      return state.selectedUserId;
    },
    getSelectedUserBuilding: (state: State) => {
      return state.selectedUserBuilding.building;
    },
  },
  mutations: {
    createBuilding(state: State, payload: IBuilding) {
      state.users[payload.userId].buildings.push(payload);
      state.loading = false;
    },
    setSelectedUserId(state: State, payload: number) {
      state.selectedUserId = payload;
      state.loading = false;
    },
    setSelectedUserBuildings(state: State, payload: number) {
      state.selectedUserBuildings.buildings = state.users[payload].buildings;
      state.selectedUserBuildings.loading = false;
    },
    setSelectedUserBuilding(state: State, payload: string) {
      const building = state.users[state.selectedUserId].buildings.filter(
        (item) => item.id === payload
      );
      state.selectedUserBuilding.building = building[0];
      state.selectedUserBuilding.loading = false;
    },
    initialiseStore(state) {
      // Check if the ID exists
      const persistedStore = localStorage.getItem("store");
      if (persistedStore) {
        // Replace the state object with the stored item
        this.replaceState(Object.assign(state, JSON.parse(persistedStore)));
      }
    },
    getDefaultBuilding(state: State) {
      const building = state.users[state.selectedUserId].buildings[0];
      state.selectedUserBuilding.building = building;
      state.selectedUserBuilding.loading = false;
    },
    deleteBuilding(state: State, payload: { userId: number; id: string }) {
      let buildingIndex = 0;

      state.users[payload.userId].buildings.map((item, i) => {
        if (item.id === payload.id) buildingIndex = i;
      });

      state.users[payload.userId].buildings.splice(buildingIndex, 1);
      state.selectedUserBuilding.building = null;
      state.loading = false;
    },
    updateBuilding(state: State, payload: IBuilding) {
      let buildingIndex = 0;

      state.users[payload.userId].buildings.map((item, i) => {
        if (item.id === payload.id) buildingIndex = i;
      });
      state.users[payload.userId].buildings[buildingIndex] = payload;
      state.loading = false;
      state.selectedUserBuilding.loading = false;
    },
  },
  actions: {
    createBuilding(context: Context, payload: IBuilding) {
      this.state.loading = true;
      this.state.selectedUserBuilding.loading = true;
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          context.commit("createBuilding", payload);
          context.commit("setSelectedUserBuilding", payload.id);
          resolve();
        }, 3000);
      });
    },

    fetchAllBuilding(context: Context, payload: number) {
      this.state.selectedUserBuildings.loading = true;
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          context.commit("setSelectedUserBuildings", payload);
          resolve();
        }, 1000);
      });
    },

    fetchBuilding(context: Context, payload) {
      this.state.selectedUserBuilding.loading = true;
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          context.commit("setSelectedUserBuilding", payload);
          resolve();
        }, 1000);
      });
    },

    fetchDefaultBuilding(context: Context) {
      this.state.selectedUserBuilding.loading = true;
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          context.commit("getDefaultBuilding");
          resolve();
        }, 1000);
      });
    },

    deleteBuilding(context: Context, payload) {
      this.state.loading = true;
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          context.commit("deleteBuilding", payload);
          context.dispatch("fetchAllBuilding", payload.userId);
          resolve();
        }, 1000);
      });
    },

    updateBuilding(context: Context, payload: IBuilding) {
      this.state.loading = true;
      this.state.selectedUserBuilding.loading = true;
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          context.commit("updateBuilding", payload);
          context.commit("setSelectedUserBuilding", payload.id);
          resolve();
        }, 3000);
      });
    },
  },
});

// Subscribe to store updates
store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem("store", JSON.stringify(state));
});
// define your own `useStore` composition function
export function useStore(): Store<State> {
  return baseUseStore(key);
}
