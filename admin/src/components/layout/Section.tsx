import React from 'react';
import { Box } from '@mui/material';
import { ResponsiveContainer } from './ResponsiveContainer';

interface SectionProps {
  children: React.ReactNode;
  sx?: any;
  background?: string;
  centerContent?: boolean;
  fullHeight?: boolean;
  containerMaxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  noPadding?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  children,
  background,
  centerContent = false,
  fullHeight = false,
  containerMaxWidth = 'lg',
  noPadding = false,
  sx,
}) => {
  return (
    <Box
      component="section"
      sx={{
        py: noPadding ? 0 : { xs: 6, sm: 8, md: 12 },
        ...(background && {
          background,
        }),
        ...(fullHeight && {
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }),
        ...sx,
      }}
    >
      <ResponsiveContainer
        maxWidth={containerMaxWidth}
        centerContent={centerContent}
        fullHeight={fullHeight}
        padding={noPadding ? 0 : undefined}
      >
        {children}
      </ResponsiveContainer>
    </Box>
  );
};

export default Section;