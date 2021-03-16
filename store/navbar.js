export const state = () => ({
  mobileMenuIsActive: false,
})

export const mutations = {
  setMobileMenuActive(state, active) {
    state.mobileMenuIsActive = active
  },
}
