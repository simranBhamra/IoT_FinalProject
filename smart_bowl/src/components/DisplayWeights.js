//Used to display basic current weight of the food for the user
import React, {Component} from 'react';
import {
    Grid,
    GridItem,
    Box,
    Text,
    Center,
    Wrap,
    WrapItem
} from "@chakra-ui/react";


class DisplayWeights extends React.Component  {
  


    render() {
    


        return (

            <div>
            
                <Text> Current amount of food in Lily's bowl</Text>

                <GridItem colSpan={1}
                        bg="#FFFDED">

                        <h2 style={
                            {color: "#201335"}
                        }>Smart Bowl</h2>
                        <DisplayWeights></DisplayWeights>

                        
                        {
                            this.props.eventHistory.slice(-1).map((event) => (

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

               
                    
            </div>
        );
    }


}

export default DisplayWeights;