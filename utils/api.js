import { AsyncStorage } from "react-native";

//NOTE: Things that I needed to do
//getDecks will get us the decks[DONE]
//getDeck will give us all the info of that deck [Done]
//saveDeck will save a new deck [DONE]
//addCardToDeck will save the {question, answer} to that deck title

const DECK_STORAGE_KEY = "Flashcards:decks";

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    return JSON.parse(results);
  });
}

export function saveDeck(title) {
  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({
      [title]: { title: title, questions: [] }
    })
  );
}

export function saveCardToDeck(title, newQuestion) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    Object.keys(data).map(dTitle => {
      if (dTitle === title) {
        data[dTitle].questions.push(newQuestion);
      }
    });
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
  });
}

export function deleteDeck(title) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    const newData = Object.keys(data).reduce((newObj, key) => {
      if (key !== title) {
        newObj[key] = data[key];
      }
      return newObj;
    }, {});
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(newData));
  });
}

export function deleteAll() {
  return AsyncStorage.clear();
}
