import brandLogo from '../static/logobrand.png';
import * as React from 'react';
import { Button } from '@mui/material';


export const Header = ()=> {
   return(
    <div class="mx-auto bg-inherit">
        <img src={brandLogo} alt="Brand Logo" class="justify-left inline"/>
         <div class="inline object-right">
         <Button> Accessories</Button>
         <Button> Mine</Button>
         <Button>Collect Wallet</Button>
         </div>
    </div>
   );
}