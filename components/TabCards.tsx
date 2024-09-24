import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

interface TabCardsProps {
  tabs: Array<{ label: string; component: React.ReactNode }>;
  currentStep: number;
  onTabChange: (newStep: number) => void; // Function to change tabs
}

const TabCards: React.FC<TabCardsProps> = ({ tabs, currentStep, onTabChange }) => {
  return (
    <Box>
      <Tabs value={currentStep} onChange={(event, newValue) => onTabChange(newValue)} aria-label="tabs">
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
      <Box p={2}>
        {tabs[currentStep]?.component}
      </Box>
    </Box>
  );
};

export default TabCards;
