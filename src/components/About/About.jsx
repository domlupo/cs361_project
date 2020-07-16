import React from 'react';
import { Button } from 'react-bootstrap';
import UserManagement from '../Users/UserManagement';

function About() {
  return (
    <div>
      <Button
        className="dataBase"
        size="lg"
        style={{
          background: 'maroon',
          width: '30%',
          padding: '20px',
          margin: '20px',
        }}
        block
      >
        UserManagement
      </Button>
      <Button
        className="dataBase"
        size="lg"
        style={{
          background: 'grey',
          width: '30%',
          padding: '20px',
          margin: '20px',
        }}
        block
      >
        Product Management
      </Button>
      <Button
        className="dataBase"
        size="lg"
        style={{
          background: 'purple',
          width: '30%',
          padding: '20px',
          margin: '20px',
        }}
        block
      >
        Shelf Management
      </Button>
      <Button
        className="dataBase"
        size="lg"
        style={{
          background: 'navy',
          width: '30%',
          padding: '20px',
          margin: '20px',
        }}
        block
      >
        Dashboard
      </Button>
    </div>
  );
}

export default About;
