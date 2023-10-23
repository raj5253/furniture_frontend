import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { SIZES } from '../../constants'
import ProductCardView from './ProductCardView'
import styles from './productRow.styles'
import useFetch from '../../hooks/useFetch'
import { ActivityIndicator } from 'react-native'
const ProductRow = () => {
    const { data, isLoading, error } = useFetch()
    console.log(data, " productRow");

    const products = [1, 2, 3, 4]
    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator size={SIZES.large} /> : error ? <Text>Could not connect to backend!</Text> :
                <FlatList data={data}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (<ProductCardView item={item} />)} horizontal contentContainerStyle={{ columnGap: SIZES.medium - 5 }}>
                </FlatList>
            }
        </View>
    )
}

//earlier it was just flat list, and data has value as products(the simeple intger array )
export default ProductRow

