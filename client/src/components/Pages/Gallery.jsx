import React, { useEffect, useState } from "react";
import { useTable, usePagination } from "react-table";
import BannerSectionStyle3 from "../Section/BannerSection/BannerSectionStyle3";
import BannerSectionStyle9 from "../Section/BannerSection/BannerSectionStyle9";
import Section from "../Section";
import { pageTitle } from "../../helpers/PageTitle";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";
import { toast } from "react-toastify";
import Spacing from "../Spacing";
import News from "../Post/news";
import { newsData, statsData } from "../data";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import GallerySection from "../Section/GallerySection";
import Banner from "../Section/BannerSection";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Covid() {
  const mapContainerStyle = {
    width: "1600px",
    height: "800px",
    margin: "0 auto",
  };

  const defaultCenter = {
    lat: 22.983611,
    lng: 88.482612,
  };
  const galleryData = [
    {
      imgUrl:
        "https://www.emro.who.int/images/stories/coronavirus/photo-essay/gaza-beds-for-moderately-ill-covid-19-patients.jpg",
    },
    {
      imgUrl:
        "https://images.livemint.com/img/2020/07/14/1600x900/03f74f82-c50e-11ea-9ddf-03e7e83efe44_1594692625136_1594692687942.jpg",
    },
    {
      imgUrl:
        "https://static1.straitstimes.com.sg/s3fs-public/styles/large30x20/public/articles/2021/05/02/_msiahospital_0205.jpg?VersionId=XyvWzobto.cH8GXU79N17xXYwU1KftHE",
    },
    {
      imgUrl:
        "https://bsmedia.business-standard.com/_media/bs/img/misc/2020-09/06/full/20200831005L.jpg?im=FeatureCrop,size=(826,465)",
    },
    {
      imgUrl:
        "https://images.livemint.com/img/2021/04/25/600x338/c573a45e-93b6-11eb-b10b-5920a68d5cf2_1619350292873_1619358343341.jpg",
    },
  ];

  const [selected, setSelected] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [center, setCenter] = useState(defaultCenter);
  const [randomNews, setRandomNews] = useState([]);
  const dates = statsData.stats.history.map((entry) => entry.date);
  const confirmed = statsData.stats.history.map((entry) => entry.confirmed);
  const deaths = statsData.stats.history.map((entry) => entry.deaths);
  const recovered = statsData.stats.history.map((entry) => entry.recovered);
  const columns = React.useMemo(
    () => [
      {
        Header: "Country",
        accessor: "location.countryOrRegion",
      },
      {
        Header: "Total Confirmed Cases",
        accessor: "totalConfirmedCases",
      },
      {
        Header: "Newly Confirmed Cases",
        accessor: "newlyConfirmedCases",
      },
      {
        Header: "Total Deaths",
        accessor: "totalDeaths",
      },
      {
        Header: "New Deaths",
        accessor: "newDeaths",
      },
      {
        Header: "Total Recovered Cases",
        accessor: "totalRecoveredCases",
      },
      {
        Header: "Newly Recovered Cases",
        accessor: "newlyRecoveredCases",
      },
    ],
    []
  );
  const data = statsData.stats.breakdowns;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }, // Page size and initial page
    },
    usePagination
  );

  const globalData = {
    labels: dates,
    datasets: [
      {
        label: "Confirmed Cases",
        data: confirmed,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
      },
      {
        label: "Deaths",
        data: deaths,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
      },
      {
        label: "Recovered Cases",
        data: recovered,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "COVID-19 Statistics by Country",
      },
    },
  };

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    aadharNumber: "",
    gender: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address,
            key: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
          },
        }
      );

      const { lat, lng } = response.data.results[0].geometry.location;
      setCenter({ lat, lng });
      setUserLocation({ lat, lng });
      setAddress("");
    } catch (error) {
      console.error("Error geocoding address:", error);
    }
  };

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setUserLocation({ lat, lng });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!userLocation) {
      alert("Please select a location on the map.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/v1/vaccine/create-booking`,
        {
          ...formData,
          lat: userLocation.lat,
          lng: userLocation.lng,
        }
      );
      toast.success(response.data);
      setFormData({
        name: "",
        age: "",
        aadharNumber: "",
        gender: "",
        phoneNumber: "",
      });
      setUserLocation(null);
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert(error.response.data);
    }
  };

  // useEffect(() => {
  //   const fetchGlobalNews = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:4000/api/v1/vaccine/global-news"
  //       );
  //       setGlobalNews(response.data.news);
  //     } catch (error) {
  //       console.error("Error fetching global news:", error);
  //     }
  //   };

  //   fetchGlobalNews();
  // }, []);

  useEffect(() => {
    const shuffledNews = shuffleArray(newsData);
    const selectedNews = shuffledNews.slice(0, 5);
    setRandomNews(selectedNews);
  }, [newsData]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  pageTitle("Gallery");
  return (
    <>
      <BannerSectionStyle3
        bgUrl="/images/about/banner_bg.svg"
        imgUrl="https://images.pexels.com/photos/8923176/pexels-photo-8923176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="Welcome to <br>SEEVA COVID Centre"
        subTitle="Get Covid related assistance and Worldwide news"
      />
      <Section
        topMd={170}
        topLg={150}
        topXl={110}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <GallerySection
          sectionTitle="COVID-19"
          sectionTitleUp="We fight together against"
          data={galleryData}
        />
        <Spacing md="110" lg="70" />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            paddingTop: "20px",
            paddingBottom: "20px",
            boxSizing: "border-box",
          }}
        >
          <div style={{ width: "80%", marginBottom: "20px" }}>
            <Line data={globalData} />
          </div>
          <Spacing md="110" lg="70" />

          <div style={{ width: "80%" }}>
            <table
              {...getTableProps()}
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        style={{ border: "solid 1px black", padding: "10px" }}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          style={{ border: "solid 1px black", padding: "10px" }}
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {"<<"}
              </button>{" "}
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {"<"}
              </button>{" "}
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                {">"}
              </button>{" "}
              <button
                onClick={() => gotoPage(pageOptions.length - 1)}
                disabled={!canNextPage}
              >
                {">>"}
              </button>{" "}
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span>
              <select
                value={pageOptions.pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <Spacing md="110" lg="70" />

        <div className="container">
          <div
            className="cs_funfact_1_wrap cs_radius_30 cs_bg_filed"
            style={{
              backgroundImage: `url(images/about/fun_fact_bg.jpeg)`,
            }}
          >
            <div className="cs_funfact cs_style_1 text-center">
              <h2 className="cs_funfact_number cs_fs_72">
                {statsData.stats.totalConfirmedCases}
              </h2>
              <p className="cs_funfact_title m-0 cs_heading_color">
                Total Confirmed Cases
              </p>
            </div>
            <div
              className="cs_funfact cs_style_1 text-center"
              style={{ marginLeft: "150px" }}
            >
              <h2 className="cs_funfact_number cs_fs_72">
                {statsData.stats.totalDeaths}
              </h2>
              <p className="cs_funfact_title m-0 cs_heading_color">
                Total Deaths
              </p>
            </div>
            <div
              className="cs_funfact cs_style_1 text-center"
              style={{ marginLeft: "150px" }}
            >
              <h2 className="cs_funfact_number cs_fs_72">
                {statsData.stats.totalRecoveredCases}
              </h2>
              <p className="cs_funfact_title m-0 cs_heading_color">
                Total Recovered Cases
              </p>
            </div>
          </div>
        </div>
        <Spacing md="110" lg="70" />
        <Spacing md="110" lg="70" />

        <Banner
          bgUrl="images/home_1/cta_bg.svg"
          imgUrl="https://images.pexels.com/photos/5994806/pexels-photo-5994806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          title="Register for your first doze!!"
          subTitle="Our hospital is providing COVID vaccination at your own home"
        />
        <Spacing md="110" lg="70" />

        <form className="row" onSubmit={handleBooking}>
          <div className="col-lg-6">
            <label className="cs_input_label cs_heading_color">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="cs_form_field"
            />
            <div className="cs_height_42 cs_height_xl_25" />
          </div>
          <div className="col-lg-6">
            <label className="cs_input_label cs_heading_color">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Age"
              className="cs_form_field"
            />
            <div className="cs_height_42 cs_height_xl_25" />
          </div>
          <div className="col-lg-6">
            <label className="cs_input_label cs_heading_color">
              Aadhar Number
            </label>
            <input
              type="text"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleInputChange}
              placeholder="Aadhar Number"
              className="cs_form_field"
            />
            <div className="cs_height_42 cs_height_xl_25" />
          </div>
          <div className="col-lg-6">
            <label className="cs_input_label cs_heading_color">Gender</label>
            <div className="cs_radio_group">
              <div className="cs_radio_wrap">
                <input
                  className="cs_radio_input"
                  type="radio"
                  name="gender"
                  id="maleGender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                />
                <label className="cs_radio_label" htmlFor="maleGender">
                  Male
                </label>
              </div>
              <div className="cs_radio_wrap">
                <input
                  className="cs_radio_input"
                  type="radio"
                  name="gender"
                  id="femaleGender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                />
                <label className="cs_radio_label" htmlFor="femaleGender">
                  Female
                </label>
              </div>
            </div>
            <div className="cs_height_42 cs_height_xl_25" />
          </div>
          <div className="col-lg-6">
            <label className="cs_input_label cs_heading_color">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="cs_form_field"
            />
            <div className="cs_height_42 cs_height_xl_25" />
          </div>
          <div className="col-lg-6">
            <button type="submit" className="cs_btn cs_style_1">
              <span>Confirm Booking</span>
            </button>
            <div className="cs_height_42 cs_height_xl_25" />
          </div>
          <div style={{ marginBottom: "20px", position: "relative" }}>
            <LoadScript
              googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
            >
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={12}
                onClick={handleMapClick}
              >
                {userLocation && (
                  <Marker
                    position={{
                      lat: userLocation.lat,
                      lng: userLocation.lng,
                    }}
                  />
                )}
                {selected && (
                  <InfoWindow
                    position={{
                      lat: selected.geometry.location.lat,
                      lng: selected.geometry.location.lng,
                    }}
                    onCloseClick={() => setSelected(null)}
                  >
                    <div>
                      <h2>{selected.name}</h2>
                      <p>{selected.vicinity}</p>
                    </div>
                  </InfoWindow>
                )}
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 10,
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "5px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                  }}
                >
                  <input
                    type="text"
                    value={address}
                    onChange={handleAddressChange}
                    placeholder="Enter address"
                    className="cs_form_field"
                    style={{ padding: "10px", marginRight: "10px" }}
                  />
                  <button onClick={handleSearch} style={{ padding: "10px" }}>
                    Search
                  </button>
                </div>
              </GoogleMap>
            </LoadScript>
          </div>
        </form>

        <Spacing md="110" lg="70" />

        <div className="row cs_row_gap_50">
          {randomNews.map((item, index) => (
            <div className="col-xl-4 col-md-6" key={index}>
              <News {...item} />
            </div>
          ))}
        </div>
      </Section>

      <Section className="cs_footer_margin_0">
        <BannerSectionStyle9
          title="Together we win against<br />Covid"
          subTitle="Get Covid assistance from <br />SEEVA"
          imgUrl="https://images.pexels.com/photos/8923176/pexels-photo-8923176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </Section>
    </>
  );
}
