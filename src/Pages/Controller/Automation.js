import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import GreenHouseSelector from '../../Components/GreenHouseSelector';
import MyController from '../../Components/MyController';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import data from '../../json/data.json';

const Automation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(data);

    const handleAddButton = () => setIsOpen(!isOpen);

    const renderItems = (item) => {
        if (item.value === selectedValue)
            return (
                item.controllers.map((item) =>
                    <MyController title={item.name} notification={item.notification} isActive={item.isActive} whichValue={item.id.toString()} />
                )
            )
    }
    const selectGreenHouse = (selectedItem) => {
        setSelectedValue(selectedItem);
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container_dropdown}>
                <Icon name={'foundation'} size={28} color={'#7f8282'} style={styles.header_text} />
                <View style={styles.dropdown_area}>
                    <DropDownPicker
                        style={styles.dropdown}
                        open={open}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        value={value}
                        setItems={setItems}
                        //onSelectItem={() => selectGreenHouse(value)}
                        onChangeValue={() => selectGreenHouse(value)}
                        placeholder="Seranızı seçin"
                    />
                </View>
            </View>
            {
                isOpen ?
                    <View style={styles.controller_add_area}>
                        <Text>
                            ekle
                        </Text>
                    </View> :
                    <View />
            }
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => renderItems(item)
                    }
                />

            </View>
            {
                <TouchableOpacity style={[styles.plus_button, { backgroundColor: isOpen ? '#f00' : '#35ab48', }]} activeOpacity={0.7} onPress={handleAddButton}>
                    {isOpen ?
                        <Icon name='close' size={30} color="#fff" />
                        :
                        <Icon name='add' size={30} color="#fff" />
                    }
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container:
        {
            backgroundColor: '#f6f6f6',
            padding: 10,
        },
        plus_button:
        {
            position: 'absolute',
            bottom: 20,
            right: 20,
            width: 54,
            height: 54,
            borderRadius: 27,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 9,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        controller_add_area:
        {
            width: '100%',
            height: 150,
            backgroundColor: '#f0f0f0'
        },
        container_dropdown:
        {
            backgroundColor: '#f0f0f0',
            flexDirection: 'row',
            height: 64,
            width: '100%',
            paddingBottom: 10,
            zIndex: 1,
        },
        dropdown_area:
        {
            flex: 6,
        },
        dropdown:
        {
            borderWidth: 0,
            backgroundColor: '#f0f0f0',
        },
        header_text:
        {
            flex: 1,
            textAlignVertical: 'center',
            justifyContent: 'center',
            textAlign: 'center',
        }
    }
)

export default Automation;
