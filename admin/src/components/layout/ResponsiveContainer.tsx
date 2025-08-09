import React from 'react';
import { Container, Box } from '@mui/material';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  sx?: any;
  centerContent?: boolean;
  fullHeight?: boolean;
  padding?: number | string;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  maxWidth = 'lg',
  centerContent = false,
  fullHeight = false,
  padding = 3,
  sx,
}) => {
  return (
    <Container
      maxWidth={maxWidth}
      sx={{
        px: { xs: 2, sm: 3, md: 4 },
        py: padding,
        ...(centerContent && {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }),
        ...(fullHeight && {
          minHeight: '100vh',
        }),
        ...sx,
      }}
    >
      <Box
        sx={{
          width: '100%',
          ...(centerContent && {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }),
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default ResponsiveContainer;