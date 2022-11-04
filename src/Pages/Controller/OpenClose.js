import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import ControllerType from '../../Components/ControllerType';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import data from '../../json/data.json';
import controllerTypes from '../../json/controllerTypes.json';

const OpenClose = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(data);

    const renderItems = (item) =>
    //contollertypes.json dan gelen verilerde greenhouse value ile seçilen seranın verisi aynı mı kontrolünü yapıp ekrana bastırdım
        item.greenhouses.map((items) => 
        {
            if(items.value === selectedValue)
                return(
                    <ControllerType key={items.id} title={item.label}
                iconName={item.icons} isOpen={items.isActive}/>
                )
        }
            )



    const selectGreenHouse = (selectedItem) => {
        setSelectedValue(selectedItem);
    }

    return (
        <View>
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
            <View style={styles.container}>
                <FlatList
                    numColumns={2}
                    data={controllerTypes}
                    renderItem={({ item }) => renderItems(item)
                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container:
        {
            padding: 10,
            backgroundColor: '#f6f6f6',
            width: '100%',
            alignItems: 'center',
            height: '100%'
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
        header_icon:
        {
            flex: 1,
            textAlignVertical: 'center',
            justifyContent: 'center',
            textAlign: 'center',
        }
    }
)

export default OpenClose;
