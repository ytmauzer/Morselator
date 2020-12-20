import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { swap, getCurrentCode, fromMorse } from '../common/utils'
import Refresh from '../../assets/icons/refresh_ccw.png'
import Icon from '../common/Icon'
import { SelectorProps, Lang } from './interfaces.ts'

import { data } from '../../assets/dictionaries'

const Selector: React.FC<SelectorProps> = ({ lang, setLang, setInput, navigation }: SelectorProps) => {
    const [flexDirection, setFlexDirection] = useState('row')

    const switchHandler = (): void => {
        setLang(swap(lang, 'from', 'into'))
        setInput('')
        setFlexDirection(flexDirection === 'row' ? 'row-reverse' : 'row')
    }

    const changeLanguage = (): void => {
        navigation.navigate('Home.SelectLanguage', {
            data, lang
        })
    }

    const getCurrentName = (lang: Lang): string => {
        // TODO: Refactor
        const name = data.find(({ code }) => code === getCurrentCode(lang)).name
        return name.length > 12
            ? name.substr(0, name.length - (name.length - 12)) + '...▼'
            : name + '▼'
    }

    return (
        <View style={[styles.container, { flexDirection }]}>
            <View style={{ flex: 1 }}>
                <Text style={[styles.text, flexDirection === 'row' ? styles.mra : styles.mla ]} onPress={changeLanguage}>
                    {getCurrentName(lang)}
                </Text>
            </View>
            <Icon src={Refresh} style={styles.icon} onPress={() => switchHandler()} />
            <View style={{ flex: 1 }}>
                <Text style={[styles.text, flexDirection === 'row' ? styles.mla : styles.mra ]}>Morse</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 22
    },
    icon: {
         width: 22,
         height: 22
    },
    text: {
        color: '#043087',
        fontSize: 18
    },
    mra: { marginRight: 'auto' },
    mla: { marginLeft: 'auto' }
})

export default Selector