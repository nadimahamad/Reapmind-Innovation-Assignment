import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => { console.log(error) }
);

const initDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, isSignup BOOLEAN)"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Auth (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)"
    );
  });
};

const addUser = (name, email, isSignup) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Users (name, email, isSignup) VALUES (?, ?, ?)",
        [name, email, isSignup],
        (_, results) => {
          resolve(results);
        },
        error => {
          reject(error);
        }
      );
    });
  });
};

const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Users",
        [],
        (_, results) => {
          resolve(results.rows.raw());
        },
        error => {
          reject(error);
        }
      );
    });
  });
};
const addAuth = (email, password) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Auth (email, password) VALUES (?, ?)",
        [email, password],
        (_, results) => {
          resolve(results);
        },
        error => {
          reject(error);
        }
      );
    });
  });
};

const getAuth = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Auth LIMIT 1",
        [],
        (_, results) => {
          resolve(results.rows.item(0));
        },
        error => {
          reject(error);
        }
      );
    });
  });
};

const clearAuth = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM Auth",
        [],
        (_, results) => {
          resolve(results);
        },
        error => {
          reject(error);
        }
      );
    });
  });
};
const clearUsers = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM Users",
          [],
          (_, results) => {
            resolve(results);
          },
          error => {
            reject(error);
          }
        );
      });
    });
  };

export { initDB, addUser,getUsers, addAuth, getAuth, clearAuth,clearUsers };
