import React, { Component } from 'react';
import Titles from "./components/Logo/Titles"
import Ads1 from "./components/Ads/Ads1"
import Ads2 from "./components/Ads/Ads2"
import MainPage from "./components/Main/MainPage"
import Logo from "./components/Logo/Logo"
import Follow from "./components/Social/Follow"


class App extends Component {

  render() {
      return (
          <div>
            <div className = "wrapper">
                <div className = "main">
                        <div className = "leftCol1">
                            <div className="leftCol1_1"><Logo /></div>
                            <div className="leftCol1_2 title-container"><Titles /></div>
                            <div className="leftCol1_3">
                            <div className="bottom_middleCol2_1"> <h6>Follow us: </h6></div>
                            <div className="bottom_middleCol2_2"><Follow /> </div>
                            </div>
                        </div>
                        <MainPage />
                        <div className = "rightCol3">
                            <div className="rightCol3_1"><Ads1 /></div>
                            <div className="rightCol3_2"><Ads2 /></div>
                            <div className="rightCol3_3"><Ads1 /></div>
                        </div>
                </div>
            </div>
          </div>


      );
  }
}

export default App;
