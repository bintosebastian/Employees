import React, { Component } from 'react'
import {  FlatList, ActivityIndicator,AppRegistry, View, Text, StyleSheet, Button } from 'react-native'
const baseUrl='http://dotnet2.zerone-consulting.com/PythonRESTapi/api/';

class EmployeeList extends React.Component{
    constructor(props){
        super(props);
        this.state ={ isLoading: true}
        
      }

    componentDidMount(){
        return fetch(baseUrl + 'employees')
          .then((response) => response.json())
          .then((responseJson) => {
    
            this.setState({
              isLoading: false,
              dataSource: responseJson,
            }, function(){
    
            });
    
          })
          .catch((error) =>{
            console.error(error);
          });
      }

    _onPressDeleteButton(item){
      return fetch(baseUrl +'employee/' + item + '/delete', {
        method: 'delete'
      }).then(response =>
        response.json().then(json => {
          return json;
        })
      );
    }

    _onPressEditButton(){
      return fetch(baseUrl  +'employees/update', {
        method: 'delete'
      }).then(response =>
        response.json().then(json => {
          return json;
        })
      );
    }

    _onPressAddButton(){
      return fetch(baseUrl  +'employees/create', {
        method: 'delete'
      }).then(response =>
        response.json().then(json => {
          return json;
        })
      );
    }

    _onPressViewButton(item){
      return fetch(baseUrl +'employees/' + item , {
        method: 'delete'
      }).then(response =>
        response.json().then(json => {
          return json;
        })
      );
    }

    render(){
        if(this.state.isLoading){
            return(
              <View style={{flex: 1, padding: 20}}>
                <ActivityIndicator/>
              </View>
            )
          }
        return(
          <View style={styles.empList}>
            <View style={styles.header}>
            <Text style={styles.title}>Employees</Text>
            <Button style={styles.addButton}
                  onPress={()=> this._onPressAddButton}
                  title="Add"
                  accessibilityLabel="Add New Employee"
                />
            </View>
            <FlatList 
              data={this.state.dataSource}
              renderItem={({item}) =>
                <View style={styles.tile}>
                  <Text style={styles.name}>{item.employee_id}: {item.first_name} {item.last_name}</Text>
                  <Text style={styles.place}>{item.place}</Text>
                  <Text style={styles.designation}>{item.designation}</Text>
                  <View style={styles.buttons}>
                    <Button style={styles.delete}
                      onPress={()=> this._onPressDeleteButton(item.employee_id)}
                      title="Delete"
                      accessibilityLabel="Delete Employee"
                    />
                    <Button style={styles.editbutton}
                      onPress={()=> this._onPressEditButton}
                      title="Edit"
                      accessibilityLabel="Edit This Employee"
                    />
                  </View>
                  
                </View>
                }
              // keyExtractor={(item, index) => index}
            />
          </View>
        );
    }
}

const styles = StyleSheet.create({
    empList:{
      flex:1,
      width:380,
      marginTop:50
    },
    header:{
      marginBottom:20,
      flexDirection:'row',
      alignItems:'flex-start',
      justifyContent:'space-between'
    },
    title: {
      color:'#114B5F',
      fontSize: 25,
      borderBottomWidth:2,
      borderColor:'#456990',
    },
    tile:{
      borderWidth:2,
      borderColor:'#456990',
      borderRadius:5,
      margin:3,
      padding:5,
    },
    name: {
      color:'#F45B69',
      flex: 1,
      fontSize: 20,
    },
    place: {
      color:'#028090',
      flex: 1,
      fontSize: 15,
    },
    place: {
      flex: 1,
      fontSize: 15,
    },
    buttons:{
      alignSelf:'flex-end',
      width:150,
      alignItems:'flex-start',
      flexDirection:'row-reverse',
      justifyContent:'space-around',
      paddingTop:15,
      paddingBottom:5

    },  
    delete: {
      alignSelf:'flex-end',
      backgroundColor:'#841584' 
    },
    editbutton: {
      alignSelf:'flex-end',
      color:'#841584' 
    },
    addButton: {
      width:10,
      alignSelf:'flex-end',
      backgroundColor:'#841584' 
    }
  });
  
export default EmployeeList;