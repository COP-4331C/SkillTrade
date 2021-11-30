import Button from "@mui/material/Button";
import {Link as RouterLink} from "react-router-dom";

export const Header = () => {
  return (
    <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  "The largest community trading their skills"
                </h1>
                <Button variant="contained" color="secondary" component={RouterLink} to="/Registration">
                  Join Today
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
