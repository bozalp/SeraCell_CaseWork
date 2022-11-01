import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';


const MyCheckbox = ({ condition }) => {
    return (
        <View>
            {
                condition ?
                    <View style={styles.checkbox_true}>
                        <Icon name={'done'} size={32} color={'#35ab48'} />
                    </View>
                    :
                    <View style={styles.checkbox_false} activeOpacity={0.7} />
            }
        </View>

    )
}

const styles = StyleSheet.create(
    {
        checkbox_true:
        {
            width: 36,
            height: 36,
            borderWidth: 2,
            borderColor: '#35ab48',
            borderRadius: 18,
            marginTop: 5
        },
        checkbox_false:
        {
            width: 36,
            height: 36,
            borderWidth: 2,
            borderColor: '#35ab48',
            borderRadius: 18,
            marginTop: 5
        }
    }
)

export default MyCheckbox;