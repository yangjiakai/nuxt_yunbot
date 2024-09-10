import { defineStore } from "pinia";

export const useTaskStore = defineStore("task", {
  state: () => ({
    isLoading: false,
    errorMessage: "",
    successMessage: "",
  }),
  actions: {
    startTask() {
      this.isLoading = true;
      this.errorMessage = "";
      this.successMessage = "";
    },

    endTask() {
      this.isLoading = false;
    },
    setError(message: string) {
      this.errorMessage = message;
      this.isLoading = false;
    },
    setSuccess(message: string) {
      this.successMessage = message;
      this.isLoading = false;
    },
  },
  // persist: [
  //   {
  //     paths: [],
  //     storage: persistedState.localStorage,
  //   },
  // ],
});
