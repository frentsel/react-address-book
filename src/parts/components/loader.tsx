
import React from 'react';
import { connect } from 'react-redux';
import { ReactComponent as Spinner } from '../../styles/spinner.svg';

function Loader({ state }: { state: { loader: boolean } }) {
  return (
    <div className={state.loader ? 'spinner active' : 'spinner'}>
      <Spinner />
    </div>
  );
}

export default connect(
  (state: { app: object }) => ({ state: state.app })
)(Loader as React.ComponentType<never>);
