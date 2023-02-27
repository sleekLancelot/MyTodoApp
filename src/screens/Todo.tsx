import {useState} from 'react'
import {Platform, StatusBar, Dimensions} from 'react-native'
import {Layout, Text, Icon, Button} from '@ui-kitten/components'
import AddOrEditModal from '../components/AddOrEditModal';

const AddIcon = (props: any) => (
  <Icon
    {...props}
    style={{
      width: 40,
      height: 40,
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: '#1F936D',
    }}
    name='plus'
  />
);

const TodoScreen = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Layout style={{
      display: 'flex',
      flex: 1,
    }}>
      <Text>TodoScreen</Text>

      <AddOrEditModal
        visible={visible}
        close={() => setVisible(false)}
      />

      <Button
        accessoryLeft={AddIcon}
        style={{
          width: 200,
          height: 50,
          marginVertical: 10,
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: 12,
          borderColor: '#1ea87b',
          backgroundColor: '#1ea87b',
          position: "absolute",
          bottom: 0,
          transform: [{translateX: Dimensions.get('window').width * 0.24}]
        }}
        onPress={() => setVisible(true)}
      >Add a task</Button>
    </Layout>
  )
}

export {TodoScreen}