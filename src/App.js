import React, { useState, useEffect } from "react";
import * as Apis from "./api/api";
import { useDispatch } from "react-redux";
import { getTwitchStreamers } from "./store/actions/twitch.actions";
import { Switch, Route, Redirect } from "react-router-dom";

import TwitchLayout from "./components/twitch-layout";
import Whitelist from "./components/whitelist";
import Header from "./components/Header";

import "../src/components/Layout.scss";
import { makeStyles } from "@material-ui/core";
import main from "./components/main";
import discord from "./components/discord"

const App = () => {
    const dispatch = useDispatch();
    //obtain data from my api for twitch
    useEffect(() => {
        Apis.getTwitchStreamers().then((results) => {
            dispatch(getTwitchStreamers(results));
        }, []);
    });

    const useStyle = makeStyles((theme) => ({
        background: {
            backgroundColor: "var(--primary)",
            height: "1350px"
        }
    }))

    const classes = useStyle();

    return (
        <div className={classes.background}>
            <Header />
            <Switch>
                <Route exact path="/" component={main} />
                <Route path="/streams" component={TwitchLayout} />
                <Route path="/whitelist" component={Whitelist} />
                <Route path="/discord" component={discord} />
            </Switch>
        </div>
    );
};

export default App;
