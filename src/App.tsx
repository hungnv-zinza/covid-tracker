import React from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './theme/layout';
import { HighShadowButton } from './components/Buttons';
import {
  Box,
  colors,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Select,
  Typography
} from '@mui/material';
import './@types/index';

function App() {
  return (
    <>
      <CssBaseline />
      <Layout>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <div style={{ width: 260 }}>
            <FormControl fullWidth required error>
              <FormControlLabel
                labelPlacement={'top'}
                value={10}
                control={
                  <Select size="small" id="demo-simple-select" fullWidth>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                }
                label={
                  <Typography style={{ width: '100%' }} gutterBottom>
                    Ngày sinh{' '}
                    <Box component="span" sx={{ color: colors.red[700] }}>
                      (*)
                    </Box>
                  </Typography>
                }
              />
              <FormHelperText id="my-helper-text">
                We'll never share your email.
              </FormHelperText>
            </FormControl>

            <HighShadowButton fullWidth>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer">
                Learn React
              </a>
            </HighShadowButton>
          </div>
        </header>
      </Layout>
    </>
  );
}

export default App;
