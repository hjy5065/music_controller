import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class CreateRoomPage extends Component {
    defaultVotes = 2;

    constructor(props) {
        super(props);
        //I guess these are the default states
        this.state = {
            guestCanPause: true,
            votesToSkip: this.defaultVotes,
        };
    }

    //In this case the e will be the textfield
    handleVotesChange = (e) => {
        this.setState({
            votesToSkip: e.target.value,
        });
    }

    handleGuestCanPauseChange = (e) => {
        this.setState({
            //If the e value is true, then make this true and if not false. 
            guestCanPause: e.target.value === 'true' ? true : false
        });
    }

    handleRoomButtonPressed = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                //the variable names have to match the variables that we're looking for from the server side
                //go to views.py serializer and make sure the variable names match
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause
            })
        };
        //I want to send a request to localhost to api/create-room,
        //I'm gonna send it with the requestOptions that I defined above with payload
        //.then: Once we get a response convert that response into .json
        //.then take the data and print to console

        fetch('/api/create-room', requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    render() {
        return (
            //12 is the value that fills the entire thing
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component='h4' variant='h4'>
                        Create A Room
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText component='div'>
                            <div align='center'>
                                Guest Control of Playback State
                            </div>
                        </FormHelperText>
                        <RadioGroup 
                            row 
                            defaultValue='true' 
                            onChange={this.handleGuestCanPauseChange}
                        >
                            <FormControlLabel
                                value='true'
                                control={<Radio color='primary' />}
                                label='Play/Pause'
                                labelPlacement='bottom'
                            />
                            <FormControlLabel
                                value='false'
                                control={<Radio color='secondary' />}
                                label='No Control'
                                labelPlacement='bottom'
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField 
                            required={true} 
                            type='number' 
                            onChange={this.handleVotesChange}
                            defaultValue={this.defaultVotes} 
                            inputProps={{
                                min: 1,
                                style: {textAlign:'center'}
                            }}
                        />
                        <FormHelperText component='div'>
                            <div align='center'>
                                Votes Required to Skip Song
                            </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color='primary' variant='contained' onClick={this.handleRoomButtonPressed}>
                        Create A Room
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color='secondary' variant='contained' to='/' component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }
}