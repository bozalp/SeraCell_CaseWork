import React, { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { Switch } from 'react-native-switch';

import Icon from 'react-native-vector-icons/MaterialIcons';

const ControllerType = ({ title, isOpen, iconName }) => {
    const [isEnabled, setIsEnabled] = useState(isOpen);
    const toggleSwitch = () => setIsEnabled(!isEnabled);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {title}
            </Text>
            <View style={styles.switch_area}>
                {iconName &&
                    <Icon name={iconName} size={48} color={'#000'} />
                }
                <Switch
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    circleSize={30}
                    barHeight={30}
                    circleBorderWidth={2}
                    backgroundActive={'#35ab48'}
                    backgroundInactive={'#e8e8e9'}
                    circleActiveColor={'#35ab48'}
                    circleInActiveColor={'#f4f4f4'}
                    renderActiveText={false}
                    renderInActiveText={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container:
        {
            width: '45%',
            height: 128,
            backgroundColor: 'white',
            borderRadius: 10,
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
            margin:10
        },
        title:
        {
            color: '#000',
            fontWeight: '700',
            bottom:10
        },
        switch_area:
        {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'space-around',
            width:'100%',
        }
    }
)

export default ControllerType;