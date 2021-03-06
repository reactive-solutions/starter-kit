/*
 * HomeScreen.js
 * 
 * This file handles the render for the HomeScreen. The HomeScreenRender class does the
 * rendering, the HomeScreen class only connects the HomeScreenRender class to its container -
 * notice how use HomeScreen class to subscribe to the desired stores.
 * 
 * Invariant:
 *      HomeCont.js must exist
 * 
 */ 

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Subscribe } from "unstated";
import HomeCont from "../containers/HomeCont";

class HomeScreenRender extends React.Component {
    constructor(props) {
        super(props);

        this.cont = this.props.cont;
        this.globalCont = this.props.globalCont;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center", marginTop: "50%" }}>
                    {this.cont.state.name}
                </Text>
                <Text style={{ textAlign: "center", marginTop: "50%" }}>
                    {this.globalCont.state.user}
                </Text>
            </View>
        );
    }
}

// HACK: allows the usage of Cont outside of child's render
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
    }

    // Exports to stack navigation
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        };
    };

    render() {
        // pass global cont down
        const AppCont = global.cont;

        return (
            <Subscribe to={[HomeCont, AppCont]}>
                {(HomeCont, AppCont) => (
                    <HomeScreenRender
                        cont={HomeCont}
                        globalCont={AppCont}
                        navigation={this.navigation}
                    />
                )}
            </Subscribe>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
});
