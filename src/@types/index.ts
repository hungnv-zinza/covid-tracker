import React from 'react';
declare module '@mui/material/styles' {
  interface TypographyVariants {
    bodySmall: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    bodySmall?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    bodySmall: true;
  }
}

const m = {};

export default m;
