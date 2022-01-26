import { FC } from 'react';

const Layout: FC = (props) => {
  return <div className="App">
    {props.children}
  </div>
}

export default Layout
