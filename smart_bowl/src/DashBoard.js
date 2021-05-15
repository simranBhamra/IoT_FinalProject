import React, {Component} from "react";
import {Grid, GridItem, Wrap,Center,    Box} from "@chakra-ui/react";
import {Text} from "@chakra-ui/react";
import DisplayWeights from './components/DisplayWeights';
import LineGraph from './components/LineGraph'; 


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
                    backgroundColor="#4F4789"
                    padding="10px"
                  >
                        
                

                    <GridItem colSpan={4}
                        bg="#FFFDED" h="50px" paddingBottom="20px">

                        <h2 style={
                            {color: "#201335"}
                        }>Smart Bowl </h2>


                       
                    </GridItem>

                    <GridItem colSpan={1}
                        bg="#FFFDED"
                        padding="1%">

                            <Center>
                        <Box w="15rem" bg="#FFB17A" p="5px" borderRadius="3%" h="150px" w="500px"  marginBottom="50px" marginTop="30px"> 
                        <h2 style={
                            {color: "#201335"}
                        }>Currently in Lily's bowl there is: </h2>
                     

                        
                        {
                            this.state.eventHistory.slice(-1).map((event) => (

                                <div key={
                                    event.id
                                }>


                                    <h1 color="black">
                                        {
                                        event.level
                                    } g </h1>
                                </div>


                            ))
                        }

                        </Box>
                        </Center>

<Center>
                        <Box w="15rem" bg="#FFB17A" p="5px" borderRadius="3%" h="590px"  w ="500px" overflowY="scroll" marginBottom="60px"  >
                        <h2 style={
                            {color: "#201335"}
                        }>Eating Log </h2>
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
                        } 

                        </Box> 
                        </Center>


                    </GridItem>

                    <GridItem colSpan={3}
                        bg="#FFFDED">

                        <h2 style={
                            {color: "#201335"}
                        }>Daily Overview</h2>


                        <LineGraph></LineGraph>
                    </GridItem>

                    {/* <GridItem colSpan={4}
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

                    </GridItem> */}

                </Grid>

            </div>
        );
    }
}
export default DashBoard;

