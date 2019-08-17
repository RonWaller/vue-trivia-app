import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showSelection: true,
    showQuiz: false,
    numberOfQuestions: ['10', '20', '30'],
    categories: [
      { category: 'Animals', value: '27' },
      { category: 'Anime', value: '31' },
      { category: 'Art', value: '25' },
      { category: 'Board Games', value: '16' },
      { category: 'Books', value: '10' },
      { category: 'Cartoons', value: '32' },
      { category: 'Celebrities', value: '26' },
      { category: 'Comics', value: '29' },
      { category: 'Computers', value: '18' },
      { category: 'Film', value: '11' },
      { category: 'Gadgets', value: '30' },
      { category: 'General Knowledge', value: '9' },
      { category: 'Geography', value: '22' },
      { category: 'History', value: '23' },
      { category: 'Mathematics', value: '19' },
      { category: 'Music', value: '12' },
      { category: 'Musicals', value: '13' },
      { category: 'Mythology', value: '20' },
      { category: 'Nature', value: '17' },
      { category: 'Politics', value: '24' },
      { category: 'Sports', value: '21' },
      { category: 'Television', value: '14' },
      { category: 'Video Games', value: '15' }
    ],
    difficulty: ['easy', 'medium', 'difficult'],
    quizData: [],
    responseCode: -1
  },
  mutations: {
    SET_QUIZ_DATA: (state, questions) => (state.quizData = questions),
    SET_RESCODE: (state, code) => (state.responseCode = code),
    SET_COMPONENTS: (state, values) => {
      state = Object.assign(state, values);
    }
  },
  actions: {
    async getQuiz({ commit }, payload) {
      const baseurl = 'https://opentdb.com/api.php?';
      const amount = payload.amount;
      const category = payload.category;
      const difficulty = payload.difficulty;
      const url = `${baseurl}amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
      const response = await axios.get(url);
      if (response.data.response_code === 0) {
        commit('SET_QUIZ_DATA', response.data.results);
        console.log(response.data.results);
      } else {
        commit('SET_RESCODE', response.data.response_code);
        console.log(response.data.response_code);
      }

      console.log(response.data);
    },
    showComponents({ commit }, payload) {
      commit('SET_COMPONENTS', payload);
    }
  },
  getters: {}
});
