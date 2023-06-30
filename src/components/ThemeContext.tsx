import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    palette:{
        primary:{
            main:'#1DB954',
            contrastText:'#ffffff'
        }
    }
})

const ThemeContext = (props:any)=>{
    return(
        <ThemeProvider theme={theme}>
            {...props.children}
        </ThemeProvider>
    )
}

export default ThemeContext;