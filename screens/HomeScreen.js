import { StyleSheet, Text, View, KeyboardAvoidingView, ActivityIndicator, FlatList, SafeAreaView, ScrollView,TextInput, StatusBar, Button, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/core'
import React, {useEffect, useState} from 'react';

// const HomeScreen = () => {
//   return (
//     <View>
//       <Text>Home Screen</Text>
//     </View>
//   )
// }

// export default HomeScreen

// const styles = StyleSheet.create({})

const HomeScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [validId, setValidId] = useState([])
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const getMovies = async () => {
     try {
      const response = await fetch('https://glacial-tor-25108.herokuapp.com/api/elevator/invalid');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);


// ---------------------------------------


const valid = async () => {
  fetch(`https://glacial-tor-25108.herokuapp.com/api/elevator/ChangeStatusToValid/${validId}`, {
  method: 'POST',
  mode: 'no-cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    id: `${validId}`,
    status: 'valid'
  })
});
}








  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.text}>
        <Text>Elevators not in operation</Text>
      </View>

    <View style={styles.containerHome}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
        data={data}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
            <Text>ID: {item.id}, STATUS: {item.status}</Text>
          )}
        />
      )}
    </View>

    
    <View style={styles.containerHome2}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
        data={validId}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
            <Text>ID: {item.id}, STATUS: {item.status}</Text>
          )}
        />
      )}
    </View>

    <View style={styles.inputContainer2}>
            <TextInput
            placeholder="number"
            value={validId}
            onChangeText={text =>setValidId(text)}
            //onChangeText={text => console.log(text)}
            style={styles.input}
            />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={valid} style={styles.button1}>
                  <Text style={styles.buttonText}>
                      Validate Status 
                  </Text>
          </TouchableOpacity>
        </View>







    
    <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.button}>
                <Text style={styles.buttonText}>
                    Log out
                </Text>
    </TouchableOpacity>
    </KeyboardAvoidingView>
    




  




  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "dodgerblue",
    alignItems: 'center',
    borderWidth: 2,
},

  containerHome: {
    // display: 'flex',
    height: '25%',
    width: '90%',
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 15,
    borderColor: "red",
    borderWidth: 2,
  },
  containerHome2: {
    // display: 'flex',
    height: '10%',
    width: '90%',
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 15,
    borderColor: "red",
    borderWidth: 2,
    marginTop: 10
  },

  inputContainer:{
    width: "80%"
},

input:{
  backgroundColor: "white",
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderRadius: 10,
  marginTop: 10,

},

buttonContainer:{
  width: "100%",
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 40
},

  button1:{
    backgroundColor: "green",
    borderColor: "white",
    borderWidth: 5,
    width: "50%",
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10

},
  button:{
    backgroundColor: "red",
    borderColor: "white",
    borderWidth: 5,
    width: "50%",
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',

},

buttonText:{
    fontWeight: "700",
    fontSize: 16,

}
})

export default HomeScreen










