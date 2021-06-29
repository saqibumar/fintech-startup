import React from 'react';
import { connect } from 'react-redux';

 class Success extends React.Component {

  render() {

    return (
      <div>
        <h2>Successfully Registered!</h2>
        <p>Hi <b>{this.props.form.name}</b>, We will send you an email and text to keep you updated about your application status.</p>
      </div>
    )
  }

}
function mapStateToProps(state) {
  return {
    form: {
      name: state.form.name,       
    }
  }
}
export default connect(mapStateToProps)(Success)
