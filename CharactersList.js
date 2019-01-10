import React from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { listCharacters } from './reducer';

class CharactersList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { listCharacters, charactersList } = this.props;
    if (!charactersList.length) {
      listCharacters();
    }
  }

  onLoadMore = () => {
    const { listCharacters, info, loading } = this.props;
    if (!loading) {
      listCharacters(info.next);
    }
  };

  onPress = id => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Character', { id });
  };

  renderItem = ({ item }) => (
    <View>
      <TouchableOpacity onPress={() => this.onPress(item.id)}>
        <ListItem roundAvatar title={item.name} avatar={{ uri: item.image }} />
      </TouchableOpacity>
    </View>
  );

  render() {
    const {
      characters,
      navigation: { navigate },
    } = this.props;
    return (
      <View>
        <FlatList
          styles={styles.container}
          data={characters}
          renderItem={this.renderItem}
          onEndReached={this.onLoadMore}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => {
  const { characters, charactersList, loading, info } = state;
  return {
    loading,
    info,
    charactersList,
    characters: charactersList.map(id => ({
      key: `character-${id}`,
      ...characters[id],
    })),
  };
};

const mapDispatchToProps = {
  listCharacters,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharactersList);

export { CharactersList };
