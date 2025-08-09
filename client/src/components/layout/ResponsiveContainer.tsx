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
  const containerSx = {
    width: '100%',
    mx: 'auto',
    px: { xs: 2, sm: 3, md: 4 },
    ...(padding && { p: padding }),
    ...(fullHeight && { minHeight: '100vh' }),
    ...(centerContent && {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }),
    ...sx,
  };

  return (
    <Container
      maxWidth={maxWidth}
      sx={containerSx}
    >
      {children}
    </Container>
  );
};

export default ResponsiveContainer;