export const state = () => ({
  isLoading: false
})

export const mutations = {
  setIsLoading(state, value) {
    state.isLoading = value
  }
}