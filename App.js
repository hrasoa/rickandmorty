import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import reducer from './reducer';
import CharactersList from './CharactersList';
import Character from './Character';

const client = axios.create({
  responseType: 'json',
});

const AppNavigator = createStackNavigator(
  {
    Home: { screen: CharactersList },
    Character: { screen: Character },
  },
  {
    initialRouteName: 'Home',
  }
);

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
