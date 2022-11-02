import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Alert, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import GreenHouseSelector from '../../Components/GreenHouseSelector';
import MyController from '../../Components/MyController';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import data from '../../json/data.json';
import controllerTypes from '../../json/controllerTypes.json';

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
                    <MyController key={item.id} title={item.name} notification={item.notification} isActive={item.isActive} whichValue={item.id.toString()} />
                )
            )
    }
    const selectGreenHouse = (selectedItem) => {
        setSelectedValue(selectedItem);
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container_dropdown}>
                <Icon name={'foundation'} size={28} color={'#7f8282'} style={styles.header_icon} />
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
                    <ControllerAddArea />
                    :
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

const ControllerAddArea = () => {
    const [controllerText, setControllerText] = useState(null);
    const [conditionText, setConditionText] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {
            label: "Aç",
            value: "Aç"
        }
        ,
        {
            label: "Kapat",
            value: "Kapat"
        }
    ]);

    function clearText() {
        setConditionText(null);
    }
    function selectAction(value) {
        setSelectedValue(value);
    }
    return (
        <View style={styles.controller_add_area}>
            <View style={{ flex: 1, alignItems: 'center', padding: 5 }}>
                <Text>
                    Kontrolcü
                </Text>
                <TextInput
                    style={styles.textbox}
                    onChangeText={setControllerText}
                    value={controllerText}
                />
            </View>
            <View style={{ flex: 1, alignItems: 'center', padding: 5 }}>
                <Text>
                    Şartlar
                </Text>
                <TextInput
                    style={styles.textbox_conditions}
                    onChangeText={setConditionText}
                    value={conditionText}
                    multiline
                    numberOfLines={4}
                />
                <TouchableOpacity activeOpacity={0.7} style={styles.clear_button} onPress={clearText}>
                    <Icon name={"delete"} size={28} color={"#fff"} />
                    <Text style={{ color: '#fff' }}>
                        Temizle
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1.2, alignItems: 'center', padding: 5 }}>
                <Text>
                    Aksiyon
                </Text>
                <DropDownPicker
                    style={styles.dropdown_action}
                    open={open}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    value={value}
                    setItems={setItems}
                    onChangeValue={() => selectAction(value)}
                    placeholder="Aksiyon"
                />
            </View>
            <View style={{ flex: 0.7, alignItems: 'center', padding: 5 }}>
                <TouchableOpacity activeOpacity={0.7} style={styles.add_button}>
                    <Text style={{ color: '#fff' }}>
                        Ekle
                    </Text>
                </TouchableOpacity>
            </View>
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
            height: 172,
            backgroundColor: '#f0f0f0',
            flexDirection: 'row',
            padding: 5,
            justifyContent: 'space-between',
        },
        container_dropdown:
        {
            backgroundColor: '#f0f0f0',
            flexDirection: 'row',
            height: 64,
            width: '100%',
            paddingBottom: 10,
            zIndex: 10,
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
        dropdown_action:
        {
            borderWidth: 0,
            backgroundColor: '#f0f0f0',
            zIndex: 5,
        },
        header_icon:
        {
            flex: 1,
            textAlignVertical: 'center',
            justifyContent: 'center',
            textAlign: 'center',
        },
        textbox:
        {
            width: '100%',
            height: 36,
            borderWidth: 1,
            borderRadius: 10
        },
        textbox_conditions:
        {
            width: '100%',
            height: 64,
            borderWidth: 1,
            borderRadius: 10
        },
        clear_button:
        {
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 10,
            marginTop: 5,
            padding: 5,
            backgroundColor: '#e9767a',
            borderColor: '#f00',
            borderWidth: 1,
        },
        add_button:
        {
            width: '90%',
            borderRadius: 10,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 18,
            backgroundColor: '#74d784',
            borderColor: '#35ab48',
            borderWidth: 1,
        }
    }
)

export default Automation;
