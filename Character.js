import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import { singleCharacter } from './reducer';

class Character extends React.Component {
  componentDidMount() {
    const { singleCharacter, characters, navigation } = this.props;
    const id = navigation.getParam('id', null);
    if (!(id && characters[id])) {
      singleCharacter(id);
    }
  }

  render() {
    const { navigation, characters, loading, error } = this.props;
    const id = navigation.getParam('id', null);
    const character = characters[id];
    return (
      <View style={styles.container}>
        <View>
          {loading && <Text style={styles.headlines}>Loading...</Text>}
          {!loading && error && <Text style={styles.headlines}>{error}</Text>}
          {!loading && !error && character && (
            <View>
              <Avatar
                containerStyle={styles.section}
                xlarge
                rounded
                source={{ uri: character.image }}
              />
              <View style={styles.section}>
                <Text style={styles.headlines}>Name</Text>
                <Text>{character.name}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.headlines}>Status</Text>
                <Text>{character.status}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.headlines}>Species</Text>
                <Text>{character.species}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.headlines}>Origin</Text>
                <Text>{character.origin.name}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.headlines}>Gender</Text>
                <Text>{character.gender}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: 24,
  },
  headlines: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

const mapStateToProps = state => {
  const { characters, error, loading } = state;
  return {
    error,
    loading,
    characters,
  };
};

const mapDispatchToProps = {
  singleCharacter,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Character);

export { Character };
