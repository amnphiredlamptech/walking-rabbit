export default function (context, inject) {
  const { $axios, store } = context;
  $axios.onError(error => {
    store.commit('setIsLoading', false);
  })
  inject('api', $axios);
}