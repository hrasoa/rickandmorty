export const GET_CHARACTERS = 'LOAD_CHARACTERS';
export const GET_CHARACTERS_SUCCESS = 'LOAD_CHARACTERS_SUCCESS';
export const GET_CHARACTERS_FAIL = 'LOAD_CHARACTERS_FAIL';
export const GET_CHARACTER = 'LOAD_CHARACTER';
export const GET_CHARACTER_SUCCESS = 'LOAD_CHARACTER_SUCCESS';
export const GET_CHARACTER_FAIL = 'LOAD_CHARACTER_FAIL';

export default function reducer(
  state = { characters: {}, charactersList: [], info: {}, error: null },
  action
) {
  switch (action.type) {
    case GET_CHARACTERS:
      return { ...state, loading: true };
    case GET_CHARACTERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        info: { ...state.info, ...action.payload.data.info },
        characters: {
          ...state.characters,
          ...action.payload.data.results.reduce(
            (acc, character) => ({
              ...acc,
              [character.id]: character,
            }),
            {}
          ),
        },
        charactersList: [
          ...state.charactersList,
          ...action.payload.data.results.map(character => character.id),
        ],
      };
    case GET_CHARACTERS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching characters',
      };
    case GET_CHARACTER:
      return { ...state, loading: true };
    case GET_CHARACTER_SUCCESS:
      const id = action.payload.data.id;
      return {
        ...state,
        loading: false,
        characters: {
          ...state.characters,
          [id]: { ...state.characters[id], ...action.payload.data },
        },
      };
    case GET_CHARACTER_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching characters',
      };
    default:
      return state;
  }
}

export function listCharacters(
  url = 'https://rickandmortyapi.com/api/character/'
) {
  return {
    type: GET_CHARACTERS,
    payload: {
      request: {
        url,
      },
    },
  };
}

export function singleCharacter(id) {
  return {
    type: GET_CHARACTER,
    payload: {
      request: {
        url: `https://rickandmortyapi.com/api/character/${id}`,
      },
    },
  };
}
