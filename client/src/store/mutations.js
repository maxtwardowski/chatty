import {
  CHANGE_MESSAGE,
  LOAD_USER
} from '../constants/mutation-types'

const mutations = {
  [CHANGE_MESSAGE] (state) {
    state.message = 'hehehehehheeheh'
  },

  [LOAD_USER] (state, user) {
    state.user = user
  }
}

export default mutations
