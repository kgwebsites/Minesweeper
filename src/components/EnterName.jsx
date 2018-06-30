import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const EnterNameStyle = styled.div`
  position: fixed;
  z-index: 100;
  top: 12rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  .Enter-Name__Content {
    width: 350px;
    max-width: 100%;
    padding: 0.5rem;
    background: #333333;
    box-shadow: 0px 1px 3px 1px rgba(51, 51, 51, 0.38);
    h2 {
      margin-bottom: 0.5rem;
    }
    form {
      margin-bottom: 0;
      input {
        color: #eeeeee;
      }
    }
    .Enter-Name__Content__Name {
      margin-bottom: 15px;
    }
  }
`;

class EnterName extends PureComponent {
  constructor({name}) {
    super();
    this.onChange = this.onChange.bind(this);
    this.saveName = this.saveName.bind(this);
    this.editMode = this.editMode.bind(this);
    this.state = {
      value: name || '',
      edit: !name,
    };
  }
  onChange({target: {value}}) {
    this.setState({value});
  }
  saveName(e) {
    e.preventDefault();
    this.props.updateName(this.state.value);
    this.setState({edit: false});
  }
  editMode() {
    this.setState({edit: true});
  }
  render() {
    return (
      <EnterNameStyle>
        <div className="Enter-Name__Content">
          <h2>User Name</h2>
          {this.state.edit && (
            <form onSubmit={this.saveName}>
              <input
                type="text"
                value={this.state.value}
                onChange={this.onChange}
              />
              <button>Save Name</button>
            </form>
          )}
          {!this.state.edit && (
            <div>
              <div className="Enter-Name__Content__Name">
                {this.state.value}
              </div>
              <button onClick={this.editMode}>Edit Name</button>
            </div>
          )}
        </div>
      </EnterNameStyle>
    );
  }
}

EnterName.propTypes = {
  updateName: PropTypes.func.isRequired,
};

export default EnterName;
