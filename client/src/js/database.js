import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  //connect to db
  const jate = await openDB('jate', 1);
  //setting permission
  const tx = jate.transaction('jate', 'readwrite')
  //adding to db
  const store = tx.objectStore('jate');
  const request = store.add({ content: content });
  const result = await (request);
  //
  return result;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  //connect to db
  const jate = await openDB('jate', 1);
  //setting permission
  const tx = jate.transaction('jate', 'readonly')
  //adding to db
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await (request);
  //
  return result
};

initdb();
