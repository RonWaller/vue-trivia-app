<template>
  <v-container text-center>
    <h1>This is my Quiz Game</h1>
    <div>
      <v-card
        max-width="344"
        class="mx-auto"
      >
        <v-card-title >
        {{ this.quizData[index].question }}
        </v-card-title>
        <v-card-actions>
          <v-btn text>Click</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
  
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Quiz',
  data: () => ({
    questionIndex: 0,
    index: 0,
    questions: []
    
  }),
  computed: {
    ...mapState(['quizData'])
  },
  methods: {
    
  }
  
  
};
</script>

// v-for='(currentQuestion, index) in quizData'
//          :key='currentQuestion.question'
//          v-show='index === questionIndex'