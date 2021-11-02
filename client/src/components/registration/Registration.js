// ** create-user.component.js ** //
import React,{Component} from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import PasswordFields from './PasswordField';
import AppNavBar from "../AppNavBar";

export default class Registration extends Component {
  
// TODO: Bring back the confirm password field
// TODO: Bring back the show password icon (Need to convert Registration class to function)
// TODO: Bring back the links under the Sign up button, and make them routable
// TODO: Can't add a last name
// TODO: Check registration functionality
// TODO: Remove commented out code
// TODO: Remove unused imports

    constructor(props) {
        super(props)

        this.onChangeUseremail = this.onChangeUseremail.bind(this);
        this.onChangepasswordhash = this.onChangepasswordhash.bind(this);
        this.onChangefirstName = this.onChangefirstName.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
            
        }
    }

    onChangeUseremail(e) {
        this.setState({ email: e.target.value })
    }

    onChangepasswordhash(e) {
        this.setState({ password: e.target.value })
    }

    onChangefirstName(e) {
      this.setState({ firstName: e.target.value })
    }

    onChangelastName(e) {
      this.setState({ lastName: e.target.value })
    }

    

    onSubmit(e) {
        e.preventDefault()

        const userObject = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        };

        axios.post('./api/user/register', userObject)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        //this.setState({ email: '', passwordHash: '', firstName:'' })
    }


    render() {
        return (
          <Grid>
            <AppNavBar />
            <form onSubmit={this.onSubmit}>
              <Paper elevation={3} style={{ padding: 40, height: '50vh', width: 280, margin: '20px auto' }}>

                <Grid align='center'>
                  <Avatar style={{backgroundColor: '#0031FF'}}>
                    <AssignmentOutlinedIcon />
                  </Avatar>
                    <h2>Create account</h2>
                </Grid>
                    
                <Grid container spacing={2}>
                  <Grid item xs>
                    <TextField
                      required
                      fullWidth
                      type= "text"
                      label="First name"
                      value={this.state.firstName}
                      placeholder="Enter first name"
                      onChange={this.onChangefirstName}
                      variant="standard"
                      style={{marginTop: 0}}
                      size="small"
                    />
                  </Grid>
                
                  
                    <Grid item xs>
                      <TextField
                        fullWidth
                        type= "text"
                        label="Last name"
                        value={this.state.lastName}
                        placeholder="Enter first name"
                        onChange={this.onChangelastName}
                        variant="standard"
                        style={{marginTop: 0}}
                        size="small"
                      />
                    </Grid>    
                </Grid>

                <Grid item s>
                  <TextField
                    fullWidth
                    type="text"
                    label="Email"
                    placeholder="Enter email address"
                    value={this.state.email}
                    onChange={this.onChangeUseremail}
                    variant="standard"
                    style={{marginTop: 0}}
                    size="small"/>
                </Grid>

                <Grid item s>
                  <TextField
                    fullWidth
                    type="text"
                    label="password"
                    placeholder="Enter Password"
                    value={this.state.password}
                    onChange={this.onChangepasswordhash}
                    variant="standard"
                    style={{marginTop: 0}}
                    size="small"/>
                </Grid>

                <Button type="submit" color="primary" variant="contained" fullWidth style={{margin: '8px 0'}}>Sign Up</Button>

                  
                            
                            
                        
                        
                        {/* <div className="form-group">
                            <label>Add User password</label>
                            <input type="text" value={this.state.password} onChange={this.onChangepasswordhash} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Add User firstName</label>
                            <input type="text" value={this.state.firstName} onChange={this.onChangefirstName} className="form-control" />
                        </div> */}
                        
                        {/* <div className="form-group">
                            <input type="submit" value="Create User" className="btn btn-success btn-block" />
                        </div> */}
              </Paper>
                
            </form>
          </Grid>
            
            
        )
    }
}
