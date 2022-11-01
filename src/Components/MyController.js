import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import MyCheckbox from './Checkbox/MyCheckbox';

const MyController = ({ title, notification, isActive, whichValue }) => {
    const [notificate, setNotification] = useState(notification);
    const [isActivate, setActivate] = useState(isActive);

    function toggleNotification() {
        //background processes with whichValue
        setNotification(!notificate);
    }
    function toggleActivate() {
        //background processes with whichValue
        setActivate(!isActivate);
    }

    return (
        <View>

            <TouchableOpacity style={styles.container} activeOpacity={0.7}>
                <Text>
                    {title}
                </Text>
                <View>
                    <Text>
                        {"rüzgar > 18"}
                    </Text>
                </View>
                <View style={styles.checkbox_area}>
                    <View style={{ alignItems: 'center' }}>
                        <Text>
                            Bildirim
                        </Text>
                        <TouchableOpacity onPress={toggleNotification} activeOpacity={0.7}>
                            <MyCheckbox condition={notificate} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text>
                            Aktiflik
                        </Text>
                        <TouchableOpacity onPress={toggleActivate} activeOpacity={0.7}>
                            <MyCheckbox condition={isActivate} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={null} activeOpacity={0.7} style={styles.delete_button}>
                <Icon name={'delete'} size={24} color={'#fff'} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container:
        {
            height: 120,
            flexDirection: 'row',
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 5,
            padding: 10,
            alignItems: 'center',
            marginBottom: 10,
            justifyContent: 'space-between'
        },
        checkbox_area:
        {
            flexDirection: 'row',
            width: '35%',
            justifyContent: 'space-evenly',
        },
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
        },
        delete_button:
        {
            position: 'absolute',
            top: 2,
            right: 0,
            width: 28,
            height: 28,
            borderRadius: 12,
            backgroundColor: 'red',
            justifyContent:'center',
            alignItems:'center'
        }
    }
)

export default MyController;