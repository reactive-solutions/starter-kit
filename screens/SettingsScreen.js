/*
 * SettingsScreen.js
 * 
 * This file handles the render for the SettingsScreen. The SettingsScreenRender class does the
 * rendering, the SettingsScreen class only connects the SettingsScreenRender class to its container -
 * notice how use SettingsScreen class to subscribe to the desired stores.
 * 
 * Invariant:
 *      SettingsScreen.js must exist
 * 
 */ 

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Subscribe } from "unstated";
import SettingsCont from "../containers/SettingsCont";

class SettingsScreenRender extends React.Component {
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

// HACK: allows the usage of Cont outside of childs render
export default class SettingsScreen extends React.Component {
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
            <Subscribe to={[SettingsCont, AppCont]}>
                {(SettingsCont, AppCont) => (
                    <SettingsScreenRender
                        cont={SettingsCont}
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
