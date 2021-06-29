import React from 'react';
import { connect } from 'react-redux';

class SurveyFields extends React.Component {

  constructor(props) {

    super(props)

    this.onChange = this.onChange.bind(this);
  }


  onChange(e) {
    this.props.saveValues(e.target.name, e.target.value);
  }


  render() {



    return (
      <div style={{textAlign:'left'}}>
        <h2>Survey Question</h2>
        <ul className="form-fields">
          <li className="radio">
            <span className="label">Age</span>
            <input name="age" placeholder="Age" value={this.props.form.age} onChange={this.onChange} />
          </li>
          <li className="checkbox">
            <span className="label">Favorite Colors</span>

          </li>
          <li className="form-footer">
            <button className="btn -default pull-left" onClick={this.props.previousStep} >Back</button>
            <button className="btn -primary pull-right" onClick={this.props.nextStep}>Save &amp; Continue</button>
          </li>
        </ul>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    form: {
      age: state.form.age,

    }
  }
}
export default connect(mapStateToProps)(SurveyFields)
