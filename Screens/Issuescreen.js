import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class Issuescreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      Scanned: false,
      ScannedData: '',
      ButtonState: 'normal',
      BookID: '',
      StudentID: '',
    }
  }
  GetCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermissions: status === "granted",
      ButtonState: 'clicked',
      Scanned: false,
    })
  }
  HandleBarCodeScanner = async ({ type, data }) => {
    this.setState({
      Scanned: true,
      ScannedData: data,
      ButtonState: 'normal',
    })
  }

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const Scanned = this.state.Scanned;
    const ButtonState = this.state.ButtonState;
    if (ButtonState === "clicked" && hasCameraPermissions === true) {
      return (
        <BarCodeScanner onBarCodeScanned={Scanned ? undefined : this.HandleBarCodeScanner} />
      )
    } else {
      return (
        <View styles={styles.Container} >
          <Image style={styles.ImageStyle} source={require("../assets/booklogo.jpg")} />
          <View styles={styles.view} >
            <TextInput style={styles.TextBox} value={this.state.ScannedData} onChangeText={(Text) => (this.setState({
              BookID: Text
            }))} placeholder="BookID" />
            <TouchableOpacity style={styles.ScanButton} onPress={this.GetCameraPermissions}> <Text style={styles.Text} >SCAN</Text></TouchableOpacity>
          </View>
          <View styles={styles.view} >
            <TextInput style={styles.TextBox} onChangeText={(Text) => (this.setState({
              StudentID: Text
            }))} placeholder="StudentID" />
            <TouchableOpacity style={styles.ScanButton} onPress={this.GetCameraPermissions}> <Text style={styles.Text} >SCAN</Text></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.SumbitButton}><Text style={styles.Text} >SUMBIT</Text></TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageStyle: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  ScanButton: {
    alignSelf: 'center',
    border: 'Solid',
    backgroundColor: 'lightgreen',
    width: 60,
    height: 40,
  },
  Text: {
    alignSelf: 'center',
    marginTop: 10,
  },
  SumbitButton: {
    alignSelf: 'center',
    marginTop: 50,
    border: 'Solid',
    borderRadius: 10,
    width: 90,
    height: 40,
  },
  TextBox: {
    alignSelf: 'center',
    border: 'Solid',
    width: 200,
    height: 50,
  },
  view: {
    flexDirection: 'row'
  },
})