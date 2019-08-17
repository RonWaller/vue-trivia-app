<template>
  <v-container text-center>
    <div class='relative'>
      <v-card
        max-width="600"
        height="600"
        class="mx-auto mt-5 "
      >
        <div class='py-5' v-show='this.responseCode > 0'>
            <h3>Sorry no questions with the options you selected</h3>
            <v-btn class='mx-2 my-2' @click='reset'>Try again</v-btn>
          
        </div>
        <v-card-title class='justify-center questionTitle'
        height="200"
        v-if="!!quizData[questionIndex]" 
        v-html='this.quizData[questionIndex].question'
        >
        
        {{ this.quizData[questionIndex].question }}
        </v-card-title>
        <v-layout justify-center mt-3>
          <v-card-actions v-if="!!quizData[questionIndex]" class='grid'  text-center>
            <v-btn  
            v-for='(answer, index) in answers'
            v-html='answer'
            :key='index'
            @click='getAnswerIndex(answer, index)'
            :class="answerClass(answer, index)"
            >
            {{answer}}
            </v-btn>
          </v-card-actions>
        </v-layout>
        <v-layout justify-center mt-5>
          <v-btn v-show='finalAnswer' @click='checkAnswer'>Final Answer</v-btn>
          <v-btn v-show='nextQuestion' @click='next'>Next</v-btn>
          <div v-show='gameOver'>
            <div id='message' class="container">
              <h1>GAME OVER!!!</h1>
              <h3>Final Score: {{this.totalCorrect}}/{{this.totalQuestions}}</h3>
            </div>
            <v-btn class='mx-2' @click='reset'>Try again</v-btn>
            <v-btn class='mx-2' @click='quit'>Quit</v-btn>
          </div>
          
        </v-layout>
        <v-layout>
          <div v-show='score' class="score">
            <h4>Score:</h4>
            {{this.totalCorrect}}/{{this.totalQuestions}}
          </div>
        </v-layout>
        
        
          
        
        
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
    selectedIndex: null,
    nextQuestion: false,
    finalAnswer: false,
    gameOver: false,
    correctAnswer: null,
    selectedAnswer: null,
    answered: false,
    score: true,
    noQuizData: false,
    totalCorrect: 0,
    totalQuestions: 0
    
    
    
  }),
  computed: {
    ...mapState(['quizData', 'responseCode']),
    
    answers() {
      this.correctAnswer = this.quizData[this.questionIndex].correct_answer
      let answers = [...this.quizData[this.questionIndex].incorrect_answers, this.quizData[this.questionIndex].correct_answer ]
      let shuffledAnswers = answers.sort(() => Math.random() - .5)
      return shuffledAnswers
      
    }

  },
  methods: {
    getAnswerIndex(answer, index) {
      this.selectedIndex = index;
      this.selectedAnswer = answer;
      this.finalAnswer = true;

    },
    next() {
      this.questionIndex++
      this.selectedIndex = null;
      this.nextQuestion = false;
      this.answered = false;
      this.selectedAnswer = null;


    },
    checkAnswer() {
      this.nextQuestion = true;
      this.finalAnswer = false;

      if (this.selectedAnswer === this.correctAnswer) {
        this.totalCorrect++
      }
      this.totalQuestions++
      this.answered = true

      if (this.totalQuestions === this.quizData.length) {
        this.nextQuestion = false;
        this.finalAnswer = false;
        this.gameOver = true;
        this.score = false;
      }
      
    },
    answerClass(answer, index) {
      let answerClass = '';
      // console.log('selectedAnswer:', this.selectedAnswer)
      // console.log('selectedIndex:', this.selectedIndex)
      // console.log('correctAnswer:', this.correctAnswer)
      // console.log('index:', index)

      if (!this.answered && this.selectedIndex === index) {
            answerClass = 'selected'
        } else if (this.answered && this.correctAnswer === answer) {
          answerClass = 'correct'
        } else if (this.answered && this.selectedIndex === index && this.correctAnswer != answer) {
          answerClass = 'incorrect'
        }
      return answerClass
    },
    reset() {
      window.location.reload()
    },
    quit() {
      document.querySelector('#message h1').innerHTML = 'HAVE A GREAT DAY!!!';
      setTimeout(() => { this.reset(); }, 3000);
    }
  }
};

</script>
<style lang="scss" scoped>
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4 1fr);
    grid-gap: 15px;
  }

  .titleCenter {
    text-align: center !important;
  }

  .v-card__title{
    padding-top: 40px;
  }

  .selected {
    background-color: #60aef7 !important;
  }

  .correct {
    background-color: #39be34 !important;
  }

  .incorrect {
    background-color: #ff1818 !important;
  }

  .relative {
    position: relative;
  }

  .score {
    position: absolute;
    top: 75%;
    left: 5%;
    background-color: #02bb02;
    color: #fff;
    border-radius: 50%;
    padding: 15px;
    margin-left: 10px;
  }
</style>


