import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

function Transition({children}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        {open?"Hide Details":"Show Details"}
      </Button>
      
      <Collapse  in={open} className='my-2'>
        
        {children}
        
      </Collapse>
    </>
  );
}

export default Transition;