import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const Container = styled.div`
  padding: 20px 16px 24px 16px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
`;

const Top = styled.div`
  margin-bottom: 20px;
`;

const TopLocation = styled(Top)`
  font-size: 24px;
  line-height: 1.2;
`;

const TopTime = styled(Top)`
  font-size: 16px;
  line-height: 2;
`;

const TopStatus = styled(Top)`
  font-size: 13px;
  line-height: 1.4;
`;

const LeftInformation = styled.div`
  color: #212121;

  > img {
    float: left;
    height: 64px;
    width: 64px;
  }
`;

const Temperature = styled(LeftInformation)`
  float: left;
  margin-top: -3px;
  padding-left: 10px;
  font-size: 64px;
`;

const Unit = styled(LeftInformation)`
  float: left;
  margin-top: 6px;
  font-size: 20px;
`;

const RightInfromation = styled.div`
  float: right;
  padding-left: 5px;
  line-height: 22px;
  padding-top: 2px;
  min-width: 43%;
  font-weight: lighter;
`;

const ForeCast = styled.div`
  padding-top: 10px;
  clear: both;

  > ul {
    padding: 0;
    margin: 15px 0 5px 0;
    > li {
      display: inline-block;
      height: 90px;
      width: 73px;
      text-align: center;
      line-height: 1;
    }
  }
`;

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      status: "",
      time: "",
      temperature: "0",
      humidity: "0",
      wind: "0",
      pressure: "0",
      forecast: [],
      error: false
    };
  }
  componentDidMount() {
    this._fetchWeather(this.props.location);
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.props.location !== nextProps.location) {
      this._fetchWeather(nextProps.location);
    }
  }
  _fetchWeather(location) {
    fetch(
      `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20%3D%20${location}%20and%20u%20%3D%20'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`
    )
      .then(response => response.json())
      .then(data => {
        const channel = data.query.results.channel;
        if (channel) {
          const { location, item, atmosphere, wind } = channel;
          const { condition, pubDate, forecast } = item;
          const { text, temp } = condition;
          const { humidity, pressure } = atmosphere;
          this.setState({
            location: location,
            status: text,
            time: pubDate,
            temperature: temp,
            humidity: humidity,
            pressure: pressure,
            wind: wind.speed,
            forecast: forecast
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  _fetchDate(time) {
    return time.slice(0, 16);
  }
  _fetchLocation(location) {
    const { city = "", country = "" } = location;
    return `${city}, ${country}`;
  }
  _fetThumbnail(status, size) {
    switch (status.toLowerCase()) {
      case "hot":
        return "https://ssl.gstatic.com/onebox/weather/" + size + "/hot.png";
      case "sunny":
      case "mostly sunny":
        return "https://ssl.gstatic.com/onebox/weather/" + size + "/sunny.png";
      case "thunderstorms":
      case "severe thunderstorms":
        return (
          "https://ssl.gstatic.com/onebox/weather/" +
          size +
          "/thunderstorms.png"
        );
      case "scattered thunderstorms":
        return (
          "https://ssl.gstatic.com/onebox/weather/" +
          size +
          "/rain_s_cloudy.png"
        );
      case "partly cloudy":
      case "mostly cloudy":
        return (
          "https://ssl.gstatic.com/onebox/weather/" +
          size +
          "/partly_cloudy.png"
        );
      case "cloudy":
        return "https://ssl.gstatic.com/onebox/weather/" + size + "/cloudy.png";
      case "showers":
      case "scattered showers":
        return (
          "https://ssl.gstatic.com/onebox/weather/" + size + "/rain_light.png"
        );
      case "rain":
        return "https://ssl.gstatic.com/onebox/weather/" + size + "/rain.png";
      case "snow":
      case "heavy snow":
      case "snow flurries":
      case "blowing snow":
        return "https://ssl.gstatic.com/onebox/weather/" + size + "/snow.png";
      case "sleet":
        return "https://ssl.gstatic.com/onebox/weather/" + size + "/sleet.png";
      case "windy":
        return "https://ssl.gstatic.com/onebox/weather/" + size + "/windy.png";
      default:
        return "https://ssl.gstatic.com/onebox/weather/" + size + "/cloudy.png";
    }
  }
  render() {
    return (
      <Container>
        <Top>
          <TopLocation>{this._fetchLocation(this.state.location)}</TopLocation>
          <TopTime>{this._fetchDate(this.state.time)}</TopTime>
          <TopStatus>{this.state.status}</TopStatus>
        </Top>

        <LeftInformation>
          <img
            src={this._fetThumbnail(this.state.status, 64)}
            alt={this.state.status}
          />
          <Temperature>{this.state.temperature}</Temperature>
          <Unit>°C</Unit>
        </LeftInformation>

        <RightInfromation>
          <span>Humidity: {this.state.humidity}%</span>
          <br />
          <span>
            Pressure: {this.state.pressure}
            mb
          </span>
          <br />
          <span>
            Wind speed: {this.state.wind}
            km/h
          </span>
        </RightInfromation>

        <ForeCast>
          <ul>
            {this.state.forecast.map((item, index) => {
              return (
                <li key={index}>
                  <div>{item.day}</div>
                  <img
                    src={this._fetThumbnail(item.text, 48)}
                    alt={item.text}
                  />
                  <b>{item.high}°</b>
                  {item.low}°
                </li>
              );
            })}
          </ul>
        </ForeCast>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  location: state
});

export default connect(mapStateToProps)(Weather);
