import React from 'react';
import renderer from 'react-test-renderer';
import { CharactersList } from './CharactersList';
import characters from './characters.json';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <CharactersList
        listCharacters={jest.fn()}
        navigation={{ navigate: jest.fn() }}
        charactersList={[]}
        characters={characters.results.map(character => ({
          key: `character-${character.id}`,
          ...character,
        }))}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
