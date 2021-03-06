import { Button, Container, Divider, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import AdBlockDetect from "react-ad-block-detect";
import { connect, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as Apis from "../api/api";
import * as actions from "../store/actions/whitelist.actions";
import * as selectors from "../store/selectors/whitelist.selectors";
import "./Layout.scss";

const useStyles = makeStyles((theme) => ({
    text: {
        color: "black",
        backgroundColor: "black",
        
        "&:hover": {
            backgroundColor: "white",
        },
    },
    reminder: {
        margin: 20
    }
}));

const Whitelist = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        Apis.getIpUrl().then((results) => {
            dispatch(actions.getIp(results.data));
        });
    }, []);

    const fivem = () => {
        Apis.setWhitelist(props.ip).then((results) =>
            console.log(results.data.finishedMessage)
        );
        window.location = "fivem://connect/fivem.pmarp.com:30120";
    };

    return (
        <Container fixed>
            <AdBlockDetect>
                <p className={classes.text}>
                    Hey! You have your adblocker turned on. If you don't see
                    your IP you need to turn it off.
                </p>
            </AdBlockDetect>
            <p></p>
            <Button
                variant="contained"
                color="primary"
                component="span"
                onClick={() => fivem()}
            >
                Launch the game
            </Button>
            <Grid className={classes.reminder}>
                This box here is now hidden with a fly over, hover your mouse over the black box to see if it's your IP.
            </Grid>
            <Divider/>
            <p className={classes.text}>
                {props.ip ? props.ip : null} is now whitelisted until the Linux
                Box restarts!
            </p>
        </Container>
    );
};

const mapStateToProps = createStructuredSelector({
    ip: selectors.selectIp,
});

export default connect(mapStateToProps)(Whitelist);
