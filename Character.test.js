import React from 'react';
import renderer from 'react-test-renderer';
import { Character } from './Character';
import characters from './characters.json';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <Character
        navigation={{ getParam: id => 1 }}
        characters={characters.results.reduce(
          (acc, character) => ({ ...acc, [character.id]: character }),
          {}
        )}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders loading state', () => {
  const tree = renderer
    .create(
      <Character
        navigation={{ getParam: id => 1 }}
        loading={true}
        characters={characters.results.reduce(
          (acc, character) => ({ ...acc, [character.id]: character }),
          {}
        )}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders error state', () => {
  const tree = renderer
    .create(
      <Character
        navigation={{ getParam: id => 1 }}
        error="Error ..."
        characters={characters.results.reduce(
          (acc, character) => ({ ...acc, [character.id]: character }),
          {}
        )}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
