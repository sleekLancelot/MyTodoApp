import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {StyleSheet} from 'react-native'
import {Modal, Card, Button, Text, Input, Layout, Datepicker, Icon} from '@ui-kitten/components'
import moment from 'moment';
import { MomentDateService } from '@ui-kitten/moment';
import { COLORS, TodoItemProp, MODE, getDBConnection, saveTodoItems, updateTodoItems } from '../utils'

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

  const dateService = new MomentDateService();

const AddOrEditModal = ({
    visible,
    close,
    mode,
    itemToEdit,
    allTodo,
    setAllTodo,
}: AddOrEditModalProps) => {
    const now = new Date()
    const momentNow = moment()

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
        date: itemToEdit?.date || now,
        completed: itemToEdit.completed ?? false,
        id: itemToEdit?.id ?? incrementId(),
    }), [itemToEdit])

    const [todoDetails, setTodoDetails] = useState(initialDetails)

    useEffect(() => {
        if (!visible) {
            setTodoDetails(initialDetails)
        }
    },[visible])

    useEffect(() => {
        if (!!itemToEdit.hasOwnProperty('id') || !!itemToEdit.hasOwnProperty('title')) {
            setTodoDetails(() => itemToEdit)
            console.log(mode, todoDetails)
        }
    },[itemToEdit])

    const addTodo = async (todo: TodoItemProp) => {

        try {
            if (todo?.id !== undefined) {
                setAllTodo((atd: Array<TodoItemProp>) => ([
                    {...todo, id: incrementId()},
                    ...atd,
                ]))
                const db = await getDBConnection();
                await saveTodoItems(db, {...todo, id: incrementId()});
            }
        } catch (error) {
            console.error(error);
        }
    }

    const editTodo = async (todo: TodoItemProp) => {
        try {
            if (todo?.id !== undefined) {
                setAllTodo((atd: Array<TodoItemProp>) => atd?.map(item => item?.id === itemToEdit?.id ? todoDetails : item))

                const db = await getDBConnection();
                await updateTodoItems(db, todoDetails);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const onSubmit = () => {
        if (mode === MODE.CREATE) {
            addTodo(todoDetails)
        } else {
            editTodo(todoDetails)
        }
    }

    const parseDate = (date: any) => new Date(`${date}`)?.toISOString()

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
                // date={parseDate(todoDetails?.date)}
                date={typeof todoDetails?.date !== 'object' ? new Date(todoDetails?.date) : todoDetails?.date}
                // dateService={dateService as any}
                onSelect={(nextDate: Date) => setTodoDetails((td) => ({
                    ...td,
                    date: nextDate,
                }))}
                accessoryRight={CalendarIcon}
            />

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
                onPress={() => {
                    onSubmit()
                    setTodoDetails(initialDetails)
                    close()
                }}
            >
                {mode === MODE.CREATE ? 'Add' : 'Edit'}
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