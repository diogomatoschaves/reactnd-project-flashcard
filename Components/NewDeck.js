import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { pink, white, lightPink, gray } from "../helpers/colors";

class NewDeck extends Component {
  state = {
    errorMessage: false,
    title: ""
  };

  onChangeHandler = value => {
    this.setState({
      title: value
    });
  };

  submitHandler = () => {
    const { navigation } = this.props;
    const { title } = this.state;
    //update store

    //update "DB"

    //update state
    this.setState({
      title: ""
    });

    //back to Home if state is not null
    if (title !== "") {
      navigation.goBack();
    } else {
      this.setState(prevState => ({
        ...prevState,
        errorMessage: !prevState.errorMessage
      }));
    }
  };

  render() {
    const { title, errorMessage } = this.state;
    let errorAlert = null;
    if (errorMessage === true) {
      errorAlert = "🛑 no title provided 🛑";
    }

    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.headerContainer}>
          <Ionicons name="ios-happy" size={100} color={pink} />
          <Text style={styles.headerText}>
            Add a new deck to your Flashcard 🎴 App!
          </Text>
          <Text style={{ color: gray }}>Start with the title</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.textInput}
            inlineImageLeft="search_icon"
            value={title}
            placeholder={errorMessage ? errorAlert : "Deck title here... "}
            onChangeText={value => this.onChangeHandler(value)}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.submitHandler()}
          style={
            Platform.OS === "ios"
              ? styles.iosSubmitBtn
              : styles.androidSubmitBtn
          }
        >
          <Text style={{ color: white, fontSize: 20 }}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default NewDeck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 20
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: Platform.OS === "ios" ? 8 : 2,
    padding: 40,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0,0,0,0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    },
    width: "100%"
  },
  headerText: { fontSize: 25, textAlign: "center", marginBottom: 15 },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%"
  },
  textInput: {
    borderWidth: 1,
    backgroundColor: lightPink,
    padding: 10,
    width: "100%"
  },
  iosSubmitBtn: {
    backgroundColor: pink,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginRight: 40,
    marginLeft: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  androidSubmitBtn: {
    backgroundColor: pink,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    height: 45,
    alignSelf: "flex-end",
    justifyContent: "center"
  }
});
