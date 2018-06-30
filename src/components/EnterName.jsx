import React, {PureComponent} from 'react';
import styled from 'styled-components';

const EnterNameStyle = styled.div`
  border: 1px solid ${({highlight}) => highlight ? 'firebrick' : 'transparent'};
  position: fixed;
  z-index: 100;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .Enter-Name__Content {
    width: 350px;
    max-width: 100%;
    padding: .5rem;
    background: #ffffff;
    box-shadow: 0px 1px 3px 1px rgba(51, 51, 51, 0.38);
    h2 {
      margin-bottom: .5rem;
    }
    form {
      margin-bottom: 0;
    }
    .Enter-Name__Content__Name {
      margin-bottom: 15px;
  }
`;

class EnterName extends PureComponent {
  constructor({name}){
    super();
    this.onChange = this.onChange.bind(this);
    this.saveName = this.saveName.bind(this);
    this.editMode = this.editMode.bind(this);
    this.state = {
      value: name || '',
      edit: !name ? true : false,
    };
  }
  onChange({target: {value}}) {
    this.setState({value});
  }
  saveName(e) {
    e.preventDefault();
    this.props.updateName(this.state.value);
    this.setState({edit: false})
  }
  editMode() {
    this.setState({edit: true})
  }
  render() {
    const {highlight} = this.props;
    return (
      <EnterNameStyle highlight={highlight}>
        <div className="Enter-Name__Content">
          <h2>User Name</h2>
          {this.state.edit && (
            <form onSubmit={this.saveName}>
              <input type="text" value={this.state.value} onChange={this.onChange} />
              <button>Save Name</button>
            </form>
          )}
          {!this.state.edit && (
            <div>
              <div className="Enter-Name__Content__Name">{this.state.value}</div>
              <button onClick={this.editMode}>Edit Name</button>
            </div>
          )}
        </div>
      </EnterNameStyle>
    )
  }
}

export default EnterName;
