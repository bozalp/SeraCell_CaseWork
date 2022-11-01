import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import data from '../json/data.json';

const GreenHouseSelector = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(data);

    function getSelectedGreenHouse()
    {
        return value;
    }
    
    return (
        <View style={styles.container}>
            <Icon name={'foundation'} size={28} color={'#7f8282'} style={styles.header_text} />
            <View style={styles.dropdown_area}>
                <DropDownPicker
                    style={styles.dropdown}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    onSelectItem={setValue}
                    placeholder="Seranızı seçin"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container:
        {
            backgroundColor: '#f0f0f0',
            flexDirection: 'row',
            height: 64,
            width: '100%',
            paddingBottom: 10,
            zIndex:1,
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
            textAlign:'center',
        }
    }
)

export default GreenHouseSelector;
