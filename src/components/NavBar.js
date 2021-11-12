import React from 'react';
import { Tabs, Tab } from '@material-ui/core';

function NavBar(props) {
    const [value, setValue] = React.useState(props.position);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
        <Tabs value={value} onChange={handleChange}
            textColor="primary" indicatorColor="primary"
            aria-label="nav tabs example" centered>
            <Tab
                label="Inicio"
                href="/"
            />
            <Tab
                label="M/M/1"
                href="/mm1"
            />
            <Tab
                label="M/M/S"
                href="/mms"
            />
            <Tab
                label="M/M/S/K"
                href="/mmsk"
            />
            <Tab
                label="M/G/1"
                href="/mg1"
            />
        </Tabs>
    );
}

export default NavBar