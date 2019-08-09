<template>
  <v-app>
    <v-container pa-0 fluid>
      <v-layout class='header' text-center align-center row fill-height>
        <v-flex xs-12 >
          <h1>The Ultimate <div class='rotate'>TRIVIA</div> Game</h1>
        </v-flex>
      </v-layout>
    </v-container>
    <v-content>
      <Selection v-if='showSelection' />
      <Quiz v-if='showQuiz'/>
    </v-content>
  </v-app>
</template>

<script>
import Quiz from './components/Quiz';
import Selection from './components/Selection';
import { mapState, mapActions } from 'vuex';
import { log } from 'util';

export default {
  name: 'App',
  components: {
    Quiz,
    Selection
  },
  data: () => ({
    
    }),
  computed: {
    ...mapState([
      'showSelection',
      'showQuiz'
    ])
  }
}

</script>

<style lang="scss" >
  body{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .header {
    height: 200px;
    background-color: #272626;
    color: #fff;
    & h1 {
      font-size: 2.5rem;
      
    }
    
  }
  .rotate {
    display: inline-block;
    transform: rotate(-15deg);
    margin: 10px;
    color: #fa0000;
    font-family: army;
    font-size: 3rem;
    text-transform: uppercase;
    
    
  }
  
</style>

