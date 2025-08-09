import React from 'react';
import { Grid } from '@mui/material';

interface ResponsiveGridProps {
  children: React.ReactNode;
  spacing?: number;
  sx?: any;
  textAlign?: string;
  justifyContent?: string;
  alignItems?: string;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  spacing = 3,
  sx,
  textAlign,
  justifyContent,
}) => {
  return (
    <Grid
      container
      spacing={spacing}
      sx={{
        width: '100%',
        margin: 0,
        ...(justifyContent && { justifyContent }),
        ...(textAlign && { textAlign }),
        '& > .MuiGrid-item': {
          paddingLeft: { xs: 1, sm: 2 },
          paddingTop: { xs: 1, sm: 2 },
        },
        ...sx,
      }}
    >
      {children}
    </Grid>
  );
};

interface ResponsiveGridItemProps {
  children: React.ReactNode;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  sx?: any;
}

export const ResponsiveGridItem: React.FC<ResponsiveGridItemProps> = ({
  children,
  xs = 12,
  sm,
  md,
  lg,
  xl,
  sx,
}) => {
  return (
    <Grid
      item
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      {children}
    </Grid>
  );
};

export default ResponsiveGrid;