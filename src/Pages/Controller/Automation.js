import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Alert, TextInput, Modal } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

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
                    <MyController key={item.id} title={item.name} condition={item.condition} notification={item.notification} isActive={item.isActive} whichValue={item.id.toString()} />
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
                    <ControllerAddArea selectedGreenHouse={selectedValue} />
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

const ControllerAddArea = ({ selectedGreenHouse }) => {
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
    const [controllertypes, setControllertypes] = useState(controllerTypes);
    const [selectedController, setSelectedController] = useState(null);
    const [openController, setOpenController] = useState(false);
    const [valueController, setValueController] = useState(null);
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const selectController = (value) => {
        setSelectedController(value);
    };

    function clearText() {
        setSelectedController(null);
        setMax("");
        setMin("");
    }
    function selectAction(value) {
        setSelectedValue(value);
    }

    function addController() {
        const targetArray = data.find((item) => item.value === selectedGreenHouse);
        targetArray.controllers.push({
            id: Math.floor(Math.random() * 1000),
            name: controllerText,
            condition: min + " < " + selectedController + " < " + max,
            notification: false,
            isActive: selectedValue
        });
    }

    return (

        <View style={styles.controller_add_area}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
            >
                <View style={styles.add_modal}>
                    <TouchableOpacity style={styles.close_modal_button} activeOpacity={0.7} onPress={toggleModal}>
                        <Icon name='close' size={30} color="#fff" />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', width: '100%', flex: 1, padding: 10, justifyContent: 'space-around' }}>
                        <TextInput
                            style={{ width: 64, height: 36, borderWidth: 1, margin: 5, borderRadius: 10 }}
                            onChangeText={setMin}
                            value={min}
                        />
                        <View style={{ width: 80 }}>
                            <DropDownPicker
                                style={styles.dropdown_controller}
                                open={openController}
                                items={controllertypes}
                                setOpen={setOpenController}
                                setValue={setValueController}
                                value={valueController}
                                onSelectItem={(item) => {
                                    selectController(item.label)
                                }}
                                setItems={setControllertypes}
                                //onChangeValue={() => selectController(valueController)}
                                placeholder="Seç"
                            />
                        </View>
                        <TextInput
                            style={{ width: 64, height: 36, borderWidth: 1, margin: 5, borderRadius: 10 }}
                            onChangeText={setMax}
                            value={max}
                        />
                    </View>
                    <TouchableOpacity activeOpacity={0.7} style={styles.add_button} onPress={toggleModal}>
                        <Text style={{ color: '#fff' }}>
                            Ekle
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
                <TouchableOpacity activeOpacity={0.7} onPress={toggleModal}
                    style={{ height: 36, marginTop: 10, borderRadius: 10, borderWidth: 1, width: '100%', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                    <Text>
                        {selectedController ? (min + "<" + selectedController + "<" + max) : "Seç"}
                    </Text>
                </TouchableOpacity>
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
            <View style={{ flex: 0.7, alignItems: 'center', padding: 5, marginTop: 10 }}>
                <TouchableOpacity activeOpacity={0.7} style={styles.add_button} onPress={addController}>
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
        dropdown_controller:
        {
            borderWidth: 0,
            backgroundColor: '#f0f0f0',
            width: '100%',
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
            borderRadius: 10,
            marginTop: 10
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
        },
        add_modal:
        {
            width: '80%',
            height: 128,
            backgroundColor: '#fff',
            alignSelf: 'center',
            alignItems: 'center',
            borderRadius: 10,
            padding: 10,
            marginTop: 100,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 9,
        },
        close_modal_button:
        {
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: 'red',
            width: 36,
            height: 36,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
        }
    }
)

export default Automation;
