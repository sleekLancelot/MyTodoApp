import {useEffect, useState} from 'react'
import {Platform, StatusBar, Dimensions, Alert} from 'react-native'
import {Layout, Text, Icon, Button, Input, List} from '@ui-kitten/components'
import AddOrEditModal from '../components/AddOrEditModal';
import { COLORS, MODE, TodoItemProp } from '../utils';
import { TodoItem } from '../components';

const AddIcon = (props: any) => (
  <Icon
    {...props}
    style={{
      width: 40,
      height: 40,
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.accent,
    }}
    name='plus'
  />
);

const TodoScreen = () => {
  const [visible, setVisible] = useState(false);
  const [allTodo, setAllTodo] = useState<Array<TodoItemProp>>([])
  const [itemToEdit, setItemToEdit] = useState<TodoItemProp>({}as TodoItemProp)
  const [itemToDelete, setItemToDelete] = useState({})
  const [mode, setMode] = useState(MODE.CREATE)

  useEffect(() => {
    console.log(allTodo, 'all todo')
  },[allTodo])

  const updateStatus = (status: boolean, id: number) => {
    if (id !== undefined) {
      let newTodos: Array<TodoItemProp> = allTodo?.map( (todo: TodoItemProp) => todo?.id === id ? {...todo, completed: status} : todo)

      setAllTodo(() => newTodos)
    }
  }

  const startEditProcess = (todo: TodoItemProp) => {
    setItemToEdit(() => todo)
    setMode(() => MODE.EDIT)
    setVisible(true)
  }

  useEffect(() => {
    if (
        visible &&
        (!itemToEdit.hasOwnProperty('id') || !itemToEdit.hasOwnProperty('title'))
      ) {
      setMode(MODE.CREATE)
    }
  },[itemToEdit, visible])

  useEffect(() => {
    if (!visible) {
      setItemToEdit({} as TodoItemProp)
    }
  },[visible])

  const deleteTodoItem = (todo: TodoItemProp) => {
    Alert.alert(
        "Delete Item",
        `Are you sure you want to delete ${todo?.title}?`,
        [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Yes", onPress: () => {
                  const data = allTodo.filter((item, index) => item?.id !== todo?.id)
                  setAllTodo(() => data?.map( item => item?.id < todo?.id ? item : {
                    ...item,
                    id: item?.id - 1,
                  }))
                }
            }
    ])
  }

  return (
    <Layout style={{
      display: 'flex',
      flex: 1,
      backgroundColor: COLORS.primary,
    }}>
      <List
        style={{
          paddingVertical: 15,
          maxHeight: '90%',
        }}
        data={allTodo}
        renderItem={({item, index}) => (
          <TodoItem
            todo={item}
            setCompleted={updateStatus}
            deleteTodoItem={deleteTodoItem}
            startEditProcess={startEditProcess}
          />
        )}
      />

      <AddOrEditModal
        visible={visible}
        close={() => setVisible(false)}
        mode={mode}
        allTodo={allTodo}
        setAllTodo={setAllTodo}
        itemToEdit={itemToEdit}
      />

      <Layout>
        
      </Layout>
      <Button
        // accessoryLeft={AddIcon}
        style={{
          // width: 200,
          // height: 50,
          marginVertical: 10,
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: 12,
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          position: "absolute",
          bottom: 0,
          right: 10,
          // transform: [{translateX: Dimensions.get('window').width * 0.24}]
        }}
        onPress={() => setVisible(true)}
      >{AddIcon}</Button>
    </Layout>
  )
}

export {TodoScreen}