import React from 'react';
import { capitalize } from 'lodash';

import './UserIcon.css';
import Icon from './Icon';

export default function UserIcon({ user }) {
  return (
    <div className="UserIcon">
      <Icon icon="fa-user" />
    </div>
  );
}
