import Header from "./components/Header";
export default function Found() {
  return (
    <div className="parent">
      <>
        <Header />
      </>
      <div className="home">
        <form>
          <label htmlFor="name"> Name :-</label>
          <input id="name" type="name" placeholder="name" required />
          <div>Sex</div>
          <div className="select" id="u_4_n_Yf">
            <input
              type="radio"
              className="select"
              name="sex"
              value="1"
              id="female_radio"
            />
            <label className="select" htmlFor="female_radio">
              Female
            </label>
            <input
              type="radio"
              className="select"
              name="sex"
              value="2"
              id="male_radio"
            />
            <label className="select" htmlFor="male_radio">
              Male
            </label>
          </div>
          <div id="birthday_wrapper">
            <div>Date of birth</div>
            <div>
              <span
                className="select1"
                data-type="selectors"
                data-name="birthday_wrapper"
                id="u_4_l_Ya"
                aria-describedby="js_9i"
                aria-invalid="true"
              >
                <span>
                  <select
                    aria-label="Day"
                    name="birthday_day"
                    id="day"
                    title="Day"
                    className="select1"
                    aria-describedby="js_9g"
                  >
                    <option value="1" selected="1">
                      1
                    </option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>
                  <select
                    aria-label="Month"
                    name="birthday_month"
                    id="month"
                    title="Month"
                    className="select1"
                  >
                    <option value="1">Jan</option>
                    <option value="2">Feb</option>
                    <option value="3">Mar</option>
                    <option value="4">Apr</option>
                    <option value="5" selected="1">
                      May
                    </option>
                    <option value="6">Jun</option>
                    <option value="7">Jul</option>
                    <option value="8">Aug</option>
                    <option value="9">Sep</option>
                    <option value="10">Oct</option>
                    <option value="11">Nov</option>
                    <option value="12">Dec</option>
                  </select>
                  <select
                    aria-label="Year"
                    name="birthday_year"
                    id="year"
                    title="Year"
                    className="select1"
                  >
                    <option value="2024" selected="1">
                      2024
                    </option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                  </select>
                </span>
              </span>
              <i className="select1"></i>
              <i className="select1"></i>
              <div className="select1"></div>
            </div>
          </div>

          <div className="photo-upload">
            <label htmlFor="photo">Upload a photo or take a new one:</label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              capture="camera"
            />
          </div>

          <div className="btn">
            <button type="submit">Share</button>
          </div>
        </form>
      </div>
    </div>
  );
}
