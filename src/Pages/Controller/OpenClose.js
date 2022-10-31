import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';

import GreenHouseSelector from '../../Components/GreenHouseSelector';
import ControllerType from '../../Components/ControllerType';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import data from '../../json/data.json';

const OpenClose = () => {

    const renderItems = (item) => <ControllerType title={item.label} iconName={"sensor-door"} />

    return (
        <View>
            <GreenHouseSelector />
            <View style={styles.container}>
                <FlatList
                    numColumns={2}
                    data={data}
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
    }
)

export default OpenClose;
