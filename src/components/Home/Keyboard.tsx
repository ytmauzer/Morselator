import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'

import Hr from '../common/Hr'

import { getFromClipboard } from '../common/utils'
import { KeyboardProps } from './interfaces'

interface Key {
    char: string,
    style: object,
    charStyle: object,
    onPress: (key: string) => void,
    disabled?: boolean
}

const Key: React.FC<Key> = ({ char, style, charStyle, onPress, disabled = false }: Key) => (
    <TouchableOpacity onPress={() => onPress(char)} style={style} disabled={disabled}>
        <Text style={charStyle}>{char}</Text>
    </TouchableOpacity>
)

const Keyboard: React.FC<KeyboardProps> = ({ setInput }) => (
    <View style={styles.container}>
        <View style={styles.keys}>
            {['-', '.'].map(el => <Key
                char={el}
                key={el}
                style={styles.key}
                charStyle={styles.char}
                onPress={k => setInput(input => input + k)}
                />
            )}
        </View>
        <Hr />
        <View style={styles.keys}>
            <Key
                char={'PASTE'}
                style={[styles.small, { flex: 2 }]}
                charStyle={{ fontSize: 18, color: '#043087' }}
                onPress={k => getFromClipboard().then(e => setInput(input => input + e))} />
            <Key
                char={'SPACE'}
                style={[styles.small, { flex: 4 }]}
                charStyle={{ fontSize: 18, color: '#043087' }}
                onPress={k => setInput(input => input + ' ')} />
            <Key
                char={'BS'}
                style={[styles.small, { flex: 2 }]}
                charStyle={{ fontSize: 18, color: '#043087' }}
                onPress={k => setInput(input => input.slice(0, -1))} />
        </View>
    </View>
)

const styles = StyleSheet.create({
    keys: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 10
    },
    container: { // TODO: Refactor
        position: 'absolute',
        top: Dimensions.get('window').height - 200,
        width: '100%'
    },
    key: {
        borderRadius: 4,
        backgroundColor: '#c7cceb',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '3%',
        marginBottom: 6,
        minWidth: '40%',
        height: 80,
    },
    small: {
        borderRadius: 4,
        backgroundColor: '#c7cceb',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '3%',
        height: 30,
    },
    char: {
        fontSize: 65,
        color: '#043087'
    },
    image_key: {
        width: 25,
        height: 25
    }
})

export default Keyboard