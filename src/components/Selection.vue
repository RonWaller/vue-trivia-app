<template>
  <v-container pa-0>
    <v-layout pa-5 id='selection' row fill-height justify-center>
        <v-flex id='selectBox' md-4 px-2>
          <v-select
          color='rgba(0, 0, 0, 0.42)'
          :items="numberOfQuestions"
          label="Choose Number of Questions"
          v-model='questionsSelected'
          @change='buttonGo'
          outlined
        ></v-select>
        </v-flex>
        <v-flex id='selectBox' md-4 px-2>
          <v-select
          color='rgba(0, 0, 0, 0.42)'
          item-text="category"
          item-value="value"
          :items="categories"
          v-model='categorySelected'
          @change='buttonGo'
          label="Choose Category"
          outlined
        ></v-select>
        </v-flex>
        <v-flex id='selectBox' md-4 px-2>
          <v-select
          color='rgba(0, 0, 0, 0.42)'
          :items="difficulty"
          label="Choose Difficulty"
          v-model='difficultySelected'
          @change='buttonGo'
          outlined
        ></v-select>
        </v-flex>
      </v-layout>
      <v-layout id='button' row fill-height justify-center >
        <v-flex text-center xs-12>
          <v-btn @click='runAxios' v-show='selectedTrue' color='success' x-large rounded>
            GO!
          </v-btn>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'Selection',
  data: () =>({
    selectedTrue: false,
    questionsSelected: '',
    categorySelected: '',
    difficultySelected: ''
  }),
  computed: {
      ...mapState([
        'numberOfQuestions',
        'categories',
        'difficulty',
        'showSelection',
        'showQuiz'
        
      ])
      
  },
  methods: {
  ...mapActions([
        'getQuiz',
        'showComponents'
    ]),
  buttonGo: function() {
    if (this.questionsSelected && this.categorySelected && this.difficultySelected) {
        this.selectedTrue = true;
      } 
    },
  runAxios: function() {
      console.log('Go button was clicked');
      const payload = {
        amount: this.questionsSelected,
        category: this.categorySelected,
        difficulty: this.difficultySelected
      }
      console.log(payload);
      const setValues = {
      showSelection: false,
      showQuiz: true
      }
      this.showComponents(setValues);
      this.getQuiz(payload);
      
    }
  }
}
</script>

<style lang="scss" scoped>
  #selection {
    max-width: 70%;
    margin: 0 auto;
  }
  #selectBox {
    max-width: 265px;
  }
  
  .v-btn{
    font-size: 1.2rem;
  }
  #button {
    width: 25%;
    margin: 0 auto;
  
  }
  
    // color:rgba(0, 0, 0, 0.87) !important; 
    // caret-color: rgba(0, 0, 0, 0.87) !important;
  
</style>

