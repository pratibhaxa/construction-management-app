import { Box, Paper, Tab, Tabs } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";

export const DocketTab = (props) => {
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    return (
        <React.Fragment>
            <Paper elevation={3} sx={{ position: 'sticky', top: 0, zIndex: 100 }}>
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        <Tab value="one" label="Create Docket" to={`/create-docket`} component={Link} />
                        <Tab value="two" label="View Dockets" to={`/view-dockets`} component={Link} />
                        {/* <Tab value="three" label="View Guest Demo" to={`/viewproperty/${props.id}/view-guest-demo`} component={Link} /> */}
                    </Tabs>
                    <Outlet />
                </Box>
            </Paper>
        </React.Fragment>
    )
};