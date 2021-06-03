import React from 'react';
import { useDispatch } from 'react-redux';

import { IconButton, Tooltip } from '@material-ui/core/';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    // This button shows up in multiple locations and is styled differently
    // because it's styled differently depending on where it is used, the className
    // is passed to it from it's parents through React props
    <Tooltip title="Log Out">
      <IconButton
        color="inherit"
        aria-label="Log Out"
        className={props.className}
        onClick={() => dispatch({ type: 'LOGOUT' })}
      >
        <ExitToAppIcon style={{ fontSize: 36, color: 'white' }} />
      </IconButton>
    </Tooltip>
  );
}

export default LogOutButton;
