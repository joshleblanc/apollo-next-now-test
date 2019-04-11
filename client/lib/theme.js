import {createMuiTheme} from '@material-ui/core';
import primary from "@material-ui/core/colors/blueGrey";
import secondary from "@material-ui/core/colors/orange";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: primary,
    secondary: secondary
  },
  typography: {
    useNextVariants: true,
  },
});

export default theme;