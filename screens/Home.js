import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Home = (props) => {
          return (
                    <View style={styles.container}>
                              <TouchableOpacity style={styles.button} onPress={()=>{
                                        props.navigation.navigate('Video Recorder')
                              }}>
                                        <Text style={styles.text}>Video Record</Text>
                              </TouchableOpacity>
                    </View>
          )
}

const styles = StyleSheet.create({
          container:{
                    flex:1,
                    justifyContent:'center',
                    alignItems:'center',
                    width:'100%',
          },
          button:{
                    backgroundColor:'#ff6b6b',
                    borderRadius: 10,
                    padding: 15,
                    alignItems:'center',
                    justifyContent:'center',
          },
          text:{
                    fontSize: 20,
                    color:'#fff',
          }
})

export default Home;
