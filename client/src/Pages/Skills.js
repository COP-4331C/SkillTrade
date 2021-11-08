import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import how from '../how.jpeg';
import { styled } from '@material-ui/styles';
import FormControl from "@mui/material/FormControl";
import { TextField } from '@mui/material';


export default function Skills() {
  const CardContentNoPadding = styled(CardContent)(`
    padding: 0;
    &:last-child {
    padding-bottom: 0;
  }
`);
  
  return (
    <Grid container justifyContent="center">
      <Card sx={{ maxWidth: 345 }}>
      <img  style={{ 
                width:300,
                height:450,
                border: "1px solid", 
                borderColor: 'black' }} 
                src={how}/>
      <CardContentNoPadding>
        <Typography  variant="body2" >
          I can teach you...
        </Typography>
        <Typography gutterBottom variant="h5"  style={{ backgroundColor: "primary", color: "black" }} component="div">
          How to speak in chinese
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {/* <FormControl>
            <item> 
              <TextField
                id="required"
                label="Enter Description"
                defaultValue="Description"
                inputProps={{ maxLength: 50 }}
              />
            </item>
          </FormControl> */}
          CHinese langage is awesome
        </Typography>
      </CardContentNoPadding>
      <Grid container spacing={2}>
        <Grid item xs={3} justifyContent="left">
          <img  style={{ 
                  marginTop: 0, 
                  width: 70, 
                  height: 70, 
                  borderRadius: 200 / 2,
                  border: "1px solid", 
                  borderColor: 'black' }} 
                  src={how}/>
        </Grid>
      </Grid>

      
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </Grid>
    
  );
}
