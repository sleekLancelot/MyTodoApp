import React, {useState} from 'react'
import {StyleSheet} from 'react-native'
import {Modal, Card, Button, Text, Input, Layout, Datepicker, Icon} from '@ui-kitten/components'

interface AddOrEditModalProps {
    visible: boolean
    close: any
}

const CalendarIcon = (props: any) => (
    <Icon {...props} name='calendar'/>
  );

const AddOrEditModal = ({
    visible,
    close,
}: AddOrEditModalProps) => {
    const now = new Date()
    const [todoDetails, setTodoDetails] = useState({
        title: '',
        date: now,
        note: '',
    })

  return (
    <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={close}
        style={{
            width: 260,
            height: 400,
        }}
    >
        <Layout style={{
            flex: 1,
            padding: 10,
        }}>

            <Input
                style={styles.input}
                size='small'
                placeholder='Small'
                value={todoDetails.title}
                onChangeText={() => {}}
            />

            <Datepicker
                style={styles.input}
                label='Date'
                caption='Select due date'
                placeholder='Pick Date'
                min={now}
                date={todoDetails.date}
                onSelect={(nextDate: any) => setTodoDetails((td) => ({
                    ...todoDetails,
                    date: nextDate,
                }))}
                accessoryRight={CalendarIcon}
            />

        <Input
            style={styles.input}
            multiline={true}
            textStyle={{ minHeight: 64 }}
            placeholder='Add a note'
            value={todoDetails.note}
            onChangeText={() => {}}
        />

            <Button
                style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
                onPress={close}
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