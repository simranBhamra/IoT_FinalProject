import React, {Component} from "react";
import {Grid, GridItem, Wrap} from "@chakra-ui/react";
import {Text} from "@chakra-ui/react";
import DisplayWeights from './components/DisplayWeights';


// main page, componments will be arranged here
class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventHistory: []

        };
    }

    // get request
    getData() {
        fetch('http://192.168.1.2:5000/events/').then(response => response.json()).then(response => {
            this.setState({eventHistory: response.eventHistory})
            console.log(this.state)
        })
    }

    componentDidMount() {
        this.getData();
    }


    render() {

        return (
            <div>

                <Grid h="100%" templateRows="repeat(auto, 1fr)"
                    gap={4}
                    backgroundColor="#FFFFFF">

                    <GridItem colSpan={1}
                        bg="#FFFDED">

                        <h2 style={
                            {color: "#201335"}
                        }>Smart Bowl</h2>
                        <DisplayWeights></DisplayWeights>

                        
                        {
                            this.state.eventHistory.slice(-1).map((event) => (

                                <div key={
                                    event.id
                                }>


                                    <h2 color="black">
                                        {
                                        event.level
                                    } g </h2>
                                </div>


                            ))
                        }

                       

                    </GridItem>

                    <GridItem colSpan={3}
                        bg="#FFFDED">

                        <h2 style={
                            {color: "#201335"}
                        }>Graphs</h2>
                    </GridItem>

                    <GridItem colSpan={4}
                        bg="#FFFDED">

                        <h2 style={
                            {color: "#201335"}
                        }>
                            List</h2>

                            <Wrap borderRadius="lg" bg="primary.500"
                            templateColumns="repeat(4, 1fr)"
                            gap={6}
                            p="30px"
                            width="90%">
                                
                            {
                            this.state.eventHistory.map((event) => (

                                <div key={
                                    event.id
                                }>

                                    <h2 color="black">
                                        {
                                        event.type
                                    }</h2>

                                    <h2 color="black">
                                        {
                                        event.value
                                    }</h2>

                                    <h2 color="black">
                                        {
                                        event.time
                                    }</h2>
                                    

                                    

                                </div>


                            ))
                        } </Wrap>

                    </GridItem>

                </Grid>

            </div>
        );
    }
}
export default DashBoard;

