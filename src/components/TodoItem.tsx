import { CheckBox, ListItem, Text } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { COLORS, TodoItemProp } from '../utils'

interface TodoItemCompProp {
    todo: TodoItemProp
    setCompleted: Function
}
const TodoItem = ({
    todo,
    setCompleted,
}: TodoItemCompProp) => {
    const now = new Date()

    const [today] = useState(now)
    const [checked, setChecked] = React.useState(false);

    useEffect(() => {
        setCompleted(checked, todo?.id)

        // console.log(todo)
    }, [checked])

  return (
    <ListItem
        style={{
            elevation: 5,
            shadowColor: COLORS.secondary,
            shadowOffset: { width: 2, height: 12 },
            shadowRadius: 12,
            width: '90%',
            marginRight: 'auto',
            marginLeft: 'auto',
            paddingVertical: 7,
            paddingHorizontal: 10,
            borderRadius: 15,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.secondary,
            marginBottom: 15,
            borderColor: today > todo?.date ? 'red' : 'transparent',
            borderWidth: 1,
        }}
        accessoryLeft={(props) => (
            <CheckBox
                {...props}
                // style={{}}
                status='success'
                checked={checked}
                onChange={setChecked}
            />
        )}
        // accessoryRight={}
        title={(evaProps: any) => <Text
            {...evaProps}
            style={{
                fontSize: 18,
                fontWeight: 600,
                color: 'black',
            }}
        >{todo?.title}</Text>}
        description={(evaProps: any) => <Text
            {...evaProps}
            style={{
                // fontSize: 18,
                // fontWeight: 600,
                color: today > todo?.date ? 'red' : 'black'
            }}
        >{todo?.date?.toDateString()}</Text>}
    />
  )
}

export {TodoItem}