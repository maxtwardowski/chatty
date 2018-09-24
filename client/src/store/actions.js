import axios from 'axios'
import { LOAD_USER } from '../constants/mutation-types'

const actions = {
  changeMessage ({ commit }) {
    commit('CHANGE_MESSAGE')
  },

  fetchUser ({ commit }) {
    axios.get('http://localhost:3000/users', {
      withCredentials: true
    }).then(res => {
      commit(LOAD_USER, res.data)
    }).catch(err => console.log(err))
  }
}

export default actions
