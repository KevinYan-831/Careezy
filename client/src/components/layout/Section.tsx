import React from 'react';
import { Box } from '@mui/material';
import { ResponsiveContainer } from './ResponsiveContainer';

interface SectionProps {
  children: React.ReactNode;
  sx?: any;
  background?: 'default' | 'grey' | 'primary' | 'secondary' | string;
  centerContent?: boolean;
  fullHeight?: boolean;
  containerMaxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  noPadding?: boolean;
}

const Section: React.FC<SectionProps> = ({
  children,
  background = 'default',
  centerContent = false,
  fullHeight = false,
  containerMaxWidth = 'lg',
  noPadding = false,
  sx,
}) => {
  const getBackgroundColor = () => {
    switch (background) {
      case 'grey':
        return 'grey.50';
      case 'primary':
        return 'primary.main';
      case 'secondary':
        return 'secondary.main';
      case 'default':
        return 'transparent';
      default:
        return background;
    }
  };

  const sectionSx = {
    width: '100%',
    bgcolor: getBackgroundColor(),
    ...(fullHeight && { minHeight: '100vh' }),
    ...(!noPadding && {
      py: { xs: 6, sm: 8, md: 10, lg: 12 },
    }),
    ...(centerContent && {
      display: 'flex',
      alignItems: 'center',
    }),
    ...sx,
  };

  return (
    <Box sx={sectionSx}>
      <ResponsiveContainer
        maxWidth={containerMaxWidth}
        centerContent={centerContent}
        fullHeight={fullHeight && !noPadding}
      >
        {children}
      </ResponsiveContainer>
    </Box>
  );
};

export default Section;