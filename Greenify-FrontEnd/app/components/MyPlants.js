//This component for view the user's plant, it will make a get request for the back-end side
//then after success it will put the plants in the plants array that is the state.After it
//they will be rendered.


import React from 'react';
import {ScrollView, StyleSheet, Text, View ,TouchableOpacity,TextInput,Image} from 'react-native';
import { DB_URL } from 'react-native-dotenv'
export default class MyPlants extends React.Component {
    constructor(){
      super();
   
      this.state={
        plants: []
      };
    }
  

    componentDidMount = () => {
 
      fetch(DB_URL + "/viewProfile")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          plants:responseJson.plants
        })
      })
      .catch((error) => {
        console.error(error);
      }); 
         
    }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.container}>
            {this.state.plants.map((plant) => (
              <View style={{justifyContent:'center',alignItems: "center",borderWidth:2,borderRadius:10,borderColor:'#00603a'}} key={plant.number}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('PlantProgress',{plant:plant})}>
                  <Image source={{uri:plant.imageUrl}} borderRadius={75} style={{width: 175, height: 150,margin:10}}/>
                </TouchableOpacity>
                <Text style={styles.text}>
                  {plant.name}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#deede7',
    justifyContent: 'center',
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  text:{
    fontSize:20,
    textAlign:'center',
    margin:15,
    fontWeight:'bold',
    color:'#7ead9b'
  },
  button: {
    padding:20,
    borderWidth:1,
    backgroundColor:'green'
  }
  
});