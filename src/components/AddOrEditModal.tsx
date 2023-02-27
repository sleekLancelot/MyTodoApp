import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {StyleSheet} from 'react-native'
import {Modal, Card, Button, Text, Input, Layout, Datepicker, Icon} from '@ui-kitten/components'
import { COLORS, TodoItemProp, MODE } from '../utils'

interface AddOrEditModalProps {
    visible: boolean
    close: any
    mode: string
    itemToEdit: TodoItemProp
    allTodo: Array<TodoItemProp>
    setAllTodo: any
}

const CalendarIcon = (props: any) => (
    <Icon {...props} name='calendar'/>
  );

const AddOrEditModal = ({
    visible,
    close,
    mode,
    itemToEdit,
    allTodo,
    setAllTodo,
}: AddOrEditModalProps) => {
    const now = new Date()

    const incrementId = useCallback(() => {
        if (!!allTodo?.length) {
            return allTodo.reduce((acc, cur) => {
                if (cur.id > acc.id) return cur;
                return acc;
            }).id + 1
        } else {
            return 1
        }
    }, [allTodo?.length])

    const initialDetails = useMemo(() => ({
        title: itemToEdit?.title || '',
        date: itemToEdit?.date ?? now,
        completed: itemToEdit.completed ?? false,
        id: itemToEdit?.id ?? incrementId(),
    }), [itemToEdit])

    const [todoDetails, setTodoDetails] = useState(initialDetails)

    useEffect(() => {
        // console.log(todoDetails, 'todo in form')
        if (!visible) {
            setTodoDetails(initialDetails)
        }
    },[visible])

    const addTodo = (todo: TodoItemProp) => {
        // const newTodos = [...allTodo, {
        //     id: allTodo?.reduce((acc, cur) => {
        //       if (cur.id > acc.id) return cur;
        //       return acc;
        //     }).id + 1, value: todo
        //   }];
        //   setAllTodo(newTodos);

        if (todo?.id !== undefined) {
            setAllTodo((atd: Array<TodoItemProp>) => ([
                {...todo, id: incrementId()},
                ...atd,
            ]))
        }
    }

    const editTodo = () => {}

    const onSubmit = () => {
        if (mode === MODE.CREATE) {
            addTodo(todoDetails)
        } else {
            editTodo()
        }
        setTodoDetails(initialDetails)
        close()
    }

    const invalid = () => !todoDetails?.id || !todoDetails?.title

  return (
    <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={close}
        style={{
            width: 300,
            height: 250,
            backgroundColor: COLORS.secondary,
        }}
    >
        <Layout style={{
            flex: 1,
            padding: 10,
            backgroundColor: COLORS.primary,
        }}>

            <Input
                style={styles.input}
                size='small'
                placeholder='Title'
                value={todoDetails.title}
                onChangeText={(e) => {
                    setTodoDetails(td => ({
                        ...td,
                        title: e
                    }))
                }}
            />

            <Datepicker
                style={styles.input}
                label='Select due date'
                // caption='Select due date'
                placeholder='Pick Date'
                min={now}
                date={todoDetails.date}
                onSelect={(nextDate: any) => setTodoDetails((td) => ({
                    ...todoDetails,
                    date: nextDate,
                }))}
                accessoryRight={CalendarIcon}
            />

        {/* <Input
            style={styles.input}
            multiline={true}
            textStyle={{ minHeight: 64 }}
            placeholder='Add a note'
            value={todoDetails.note}
            onChangeText={() => {}}
        /> */}

            <Button
                style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 30,
                    backgroundColor: invalid() ? 'grey' : COLORS.accent,
                    borderRadius: 12,
                    borderColor: 'transparent'
                }}
                disabled={invalid()}
                onPress={onSubmit}
            >
                submit
            </Button>
        </Layout>
    </Modal>
  )
}

const styles = StyleSheet.create({
    container: {
      minHeight: '70%',
      width: '80%',
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    input: {
        marginVertical: 10,
        borderRadius: 8,
    }
  });

export default AddOrEditModal