import React, { Component } from "react";
import styled from "styled-components";
import fetchWeather from "../actions";
import { connect } from "react-redux";

const Container = styled.div`
  margin: 20px 0;
`;

const Select = styled.select`
  padding: 5px 10px;
  width: 150px;
  height: 25px;
  font-size: 13px;
  color: #555;
  border: 1px solid #ccc;
`;

const Text = styled.p`
  font-weight: bold;
`;

class Location extends Component {
  constructor(props) {
    super(props);
    this._changeLocation = this._changeLocation.bind(this);
  }
  _changeLocation(event) {
    this.props.changeLocation(event.target.value)
  }
  render() {
    return (
      <Container>
        <Text>Choose Location:</Text>
        <Select onChange={this._changeLocation} value={this.props.location}>
          <option value="91888417">Ha Noi</option>
          <option value="1252431">Ho Chi Minh City</option>
          <option value="2347707">Hai Phong</option>
          <option value="1252351">Can Tho</option>
          <option value="1252376">Da Nang</option>
        </Select>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  location: state
});

const mapDispatchToProps = dispatch => ({
  changeLocation: location => dispatch(fetchWeather(location))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location);
