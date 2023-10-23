import React from 'react';
import {useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import LinearProgress from '@mui/material/LinearProgress';


const Forecast = ({forecast : {forecastday},City}) => {

    const [expanded, setExpanded] = useState(false);

  const handleChange =
    (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };


    return (
        <div>
            <h3>Forecast for {City} </h3>
            
            {forecastday.map(
                (curdate) => {
                    const {date, day, hour} = curdate;
                    const {
                        maxtemp_c, mintemp_c, daily_chance_of_rain, condition : {icon , text},
                    } = day;
                
                    return (
                        <Accordion expanded={expanded === date} onChange={handleChange(curdate.date)}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id={date}
                            >
                            <img src={icon}/>
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            {date}({text})
                            </Typography>

                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            <b>Temp</b> : {mintemp_c} deg to {maxtemp_c} deg
                            </Typography>

                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            <b>{daily_chance_of_rain}%</b> of rain possible 
                            </Typography>

                          
                            
                            </AccordionSummary>
                            <AccordionDetails>

                                {
                                    hour.map(
                                        (curdatehour,index) => {
                                            return(
                                                <div>
                                                    <div>
                                                    <b>{index}:00</b>
                                                    <img src={curdatehour.condition.icon}/>
                                                    </div>
                                                    <div>
                                                    <LinearProgress variant="determinate" value={(curdatehour.temp_c*100)/maxtemp_c} />
                                                    {curdatehour.temp_c} deg
                                                    </div>
                                                    
                                                    
                                                </div>
                                                
                                            )
                                        }
                                    )
                                }
                            </AccordionDetails>
                        </Accordion>
                    )
                

                }
            )}

            

        </div>
    )
}

export default Forecast

