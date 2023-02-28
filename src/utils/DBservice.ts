import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { TodoItemProp } from './constants';

const tableName = 'todoData';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'todo-data.db', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed BOOLEAN,
    date TEXT
);`;

  await db.executeSql(query);
};

export const getTodoItems = async (db: SQLiteDatabase): Promise<TodoItemProp[]> => {
  try {
    const todoItems: TodoItemProp[] = [];
    const results = await db.executeSql(`SELECT * FROM ${tableName} ORDER BY id DESC`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        todoItems.push(result.rows.item(index))
      }
    });

    return todoItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todoItems !!!');
  }
};

export const saveTodoItems = async (db: SQLiteDatabase, todoItem: TodoItemProp) => {
    db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO ${tableName} (id, title, completed, date) VALUES (?,?,?,?)`,
                [todoItem?.id, todoItem?.title, todoItem?.completed, todoItem?.date],
            )
        }
    )
};

export const updateTodoItemStatus = async (db: SQLiteDatabase, status: boolean, id: number) => {
  const insertQuery =
    `UPDATE ${tableName}
    SET completed = ${status}
    WHERE id = ${id}`

  return db.executeSql(insertQuery);
};

export const updateTodoItems = async (db: SQLiteDatabase, todoItem: TodoItemProp) => {
  const insertQuery =
    `UPDATE ${tableName}
    SET id = ${todoItem?.id},
        title = '${todoItem?.title}',
        completed = ${todoItem?.completed},
        date = '${todoItem?.date}'
    WHERE
        id = ${todoItem?.id}`

  return db.executeSql(insertQuery);
};

export const deleteTodoItemFromDB = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where id = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};