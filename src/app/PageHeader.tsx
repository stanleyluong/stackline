import { FC } from 'react';
import logo from '../../src/stackline_logo.svg';

const PageHeader: FC = () => {
  return (
    <div className="page-header">
      <img src={logo} alt="Logo" className="logo" />
    </div>
  );
};

export default PageHeader;
