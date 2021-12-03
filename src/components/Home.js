import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRequest,
  setAToZ,
  setLastRequest,
  setPageNumber,
  setSelected,
  setSelectedData,
} from "../store/actions/countriesActions";
import { Input, Slider, InputNumber } from "antd";
import axios from "axios";
import { setListOfCountries } from "../store/actions/countriesActions";
import SingleCountryPage from "./SingleCountryPage";
import { Button } from "../styled";

const Home = () => {
  const {
    requests,
    lastRequest,
    selected,
    listOfCountries,
    aToZ,
    pageNumber,
    selectedData,
  } = useSelector((state) => state.countries);
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState("united");
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    if (requests.length === 0) await handleSearch();
  }, []);

  useEffect(() => {
    if (requests.length > 0 && lastRequest !== "") {
      let countries = requests.find(
        (e) => e[0].toLowerCase() === lastRequest.toLowerCase()
      )[1];
      if (aToZ) {
        countries = countries.sort((a, b) =>
          a.name.official.localeCompare(b.name.official)
        );
      } else {
        countries = countries.sort((a, b) =>
          b.name.official.localeCompare(a.name.official)
        );
      }
      dispatch(setPageNumber(0));
      dispatch(setListOfCountries(countries));
    }
  }, [lastRequest]);

  const handleSearch = async () => {
    if (inputSearch.toLowerCase() !== lastRequest) {
      if (requests.find((e) => e[0] === inputSearch.toLowerCase())) {
        console.log("nie pobralo"); //nie usuwam by dało się zobaczyć
        dispatch(setLastRequest(inputSearch.toLowerCase()));
      } else {
        setLoading(true);
        const data = await axios({
          method: "get",
          url: `https://restcountries.com/v3.1/name/${inputSearch}`,
          timeout: 1000 * 5, // Wait for 5 seconds
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response)
          .catch((error) => error.response);
        if (data.status === 200) {
          dispatch(addRequest([inputSearch.toLowerCase(), data.data]));
          dispatch(setLastRequest(inputSearch.toLowerCase()));
        } else if (data.status === 404) {
          dispatch(addRequest([inputSearch.toLowerCase(), []]));
          dispatch(setLastRequest(inputSearch.toLowerCase()));
        }
        setLoading(false);
        console.log("pobrało"); //nie usuwam by dało się zobaczyć
      }
    }
  };

  return (
    <>
      {selected === false ? (
        <>
          <p style={{ marginBottom: 3 }}>Wyszukaj kraj:</p>
          <div
            style={{
              display: "flex",
              width: "100%",
              margin: "0 auto 5px auto",
              maxWidth: 500,
            }}
          >
            <IconHolder
              disabled={inputSearch.toLowerCase() === lastRequest}
              onClick={() => handleSearch()}
            >
              <i className="fas fa-search" style={{ padding: 9 }} />
            </IconHolder>
            <Input
              style={{
                width: "100%",
                margin: "0 auto 5px auto",
                maxWidth: 500,
              }}
              format={"HH:mm"}
              size={"large"}
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
            />
          </div>
          {requests.length > 0 ? (
            <>
              {loading ? (
                <p>Wczytywanie danych...</p>
              ) : (
                <>
                  <p>Wyniki wyszukiwania dla "{lastRequest}":</p>
                  {listOfCountries.length > 20 && (
                    <PageNumber>
                      <p>Strona:</p>
                      <InputNumber
                        min={0}
                        max={Math.floor(listOfCountries.length / 20)}
                        style={{ margin: "0 16px" }}
                        value={pageNumber}
                        onChange={(e) => dispatch(setPageNumber(e))}
                      />
                      <Slider
                        style={{ width: "100%" }}
                        min={0}
                        max={Math.floor(listOfCountries.length / 20)}
                        value={pageNumber}
                        onChange={(e) => dispatch(setPageNumber(e))}
                      />
                    </PageNumber>
                  )}
                  {listOfCountries.length > 0 ? (
                    <>
                      <SortingButton
                        onClick={() => {
                          let countries = requests.filter(
                            (e) =>
                              e[0].toLowerCase() === lastRequest.toLowerCase()
                          )[0][1];
                          if (!aToZ) {
                            countries = countries.sort((a, b) =>
                              a.name.official.localeCompare(b.name.official)
                            );
                          } else {
                            countries = countries.sort((a, b) =>
                              b.name.official.localeCompare(a.name.official)
                            );
                          }
                          dispatch(setListOfCountries(countries));
                          dispatch(setAToZ(!aToZ));
                        }}
                      >
                        Sortowanie od {aToZ ? "A do Z" : "Z do A"}
                      </SortingButton>
                      {listOfCountries.map((country, index) => {
                        if (
                          index < 20 * (pageNumber + 1) &&
                          index >= 20 * pageNumber
                        ) {
                          return (
                            <Button
                              onClick={() => {
                                dispatch(setSelectedData(country));
                                dispatch(setSelected(true));
                              }}
                            >
                              {country.name.official
                                .toLowerCase()
                                .includes(lastRequest) ? (
                                country.name.official
                              ) : (
                                <>
                                  {country.altSpellings.find((e) =>
                                    e.toLowerCase().includes(lastRequest)
                                  )
                                    ? `${
                                        country.name.official
                                      } (${country.altSpellings.find((e) =>
                                        e.toLowerCase().includes(lastRequest)
                                      )})`
                                    : country.name.official}
                                </>
                              )}
                            </Button>
                          );
                        }
                      })}
                    </>
                  ) : (
                    <p>brak wyników</p>
                  )}
                </>
              )}
            </>
          ) : (
            <p>Wczytywanie danych...</p>
          )}
        </>
      ) : (
        <SingleCountryPage key={selectedData.name.official} />
      )}
    </>
  );
};

export default Home;

const IconHolder = styled.div`
  background: ${({ disabled }) =>
    (disabled === true && "rgb(237, 237, 237)") || "white"};
  border: ${({ disabled }) =>
    (disabled === true && "solid 1px rgb(169, 169, 169)") ||
    "solid 1px rgb(217, 217, 217)"};
  border-radius: 2px;
  margin: 0 auto 5px auto;
  margin-right: 7px;
  transition: 0.2s;
  //background: rgb(169, 169, 169);
  cursor: ${({ disabled }) =>
    (disabled === true && "not-allowed") || "pointer"};

  :hover {
    border-color: ${({ disabled }) =>
      (disabled === true && "rgb(169, 169, 169)") || "rgb(54, 86, 236)"};
    transition: 0.2s;
  }

  color: ${({ disabled }) =>
    (disabled === true && "rgb(169, 169, 169)") || "rgb(54, 86, 236)"};
`;

const PageNumber = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  margin: 0 auto 10px auto;
`;

const SortingButton = styled.div`
  background: rgb(243, 221, 224);
  border: solid 1px rgb(238, 132, 136);
  max-width: 800px;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;

  :hover {
    -webkit-box-shadow: 0px 0px 5px 0px rgb(241, 148, 148);
    -moz-box-shadow: 0px 0px 5px 0px rgb(241, 148, 148);
    box-shadow: 0px 0px 5px 0px rgb(241, 148, 148);
  }

  margin: 0 auto 10px auto;
`;
