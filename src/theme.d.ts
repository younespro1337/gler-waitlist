// MUI theme augmentation for custom brand tokens

declare module '@mui/material/styles' {
  interface Theme {
    gler: {
      userName: string;
      userManagementBg: string;
      userManagementText: string;
    };
  }
  interface ThemeOptions {
    gler?: {
      userName?: string;
      userManagementBg?: string;
      userManagementText?: string;
    };
  }
}

declare module '@mui/system' {
  interface Theme {
    gler: {
      userName: string;
      userManagementBg: string;
      userManagementText: string;
    };
  }
  interface ThemeOptions {
    gler?: {
      userName?: string;
      userManagementBg?: string;
      userManagementText?: string;
    };
  }
}
