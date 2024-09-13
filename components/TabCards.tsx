import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

interface TabCardsProps {
  tabs: Array<{ label: string; component: React.ReactNode }>;
}

const TabCards: React.FC<TabCardsProps> = ({ tabs }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleChange} aria-label="tabs">
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
      <Box p={2}>
        {tabs[value] && tabs[value].component}
      </Box>
    </Box>
  );
};

export default TabCards;
