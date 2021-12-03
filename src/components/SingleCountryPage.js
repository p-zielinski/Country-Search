import { Button } from "../styled";
import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../store/actions/countriesActions";
import parse from "html-react-parser";

const SingleCountryPage = () => {
  const { lastRequest, selectedData } = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  return (
    <div>
      <Button onClick={() => dispatch(setSelected(false))}>Wróć</Button>
      <p style={{ marginBottom: 10 }}>
        Nazwa Państwa:
        <br />
        {selectedData.name.official.toLowerCase().includes(lastRequest) ? (
          selectedData.name.official
        ) : (
          <>
            {selectedData.altSpellings.find((e) =>
              e.toLowerCase().includes(lastRequest)
            )
              ? `${
                  selectedData.name.official
                } (${selectedData.altSpellings.find((e) =>
                  e.toLowerCase().includes(lastRequest)
                )})`
              : selectedData.name.official}
          </>
        )}
      </p>
      {selectedData.capital && (
        <p style={{ marginBottom: 10 }}>
          Stolic{selectedData.capital.length > 1 ? "e" : "a"}:
          <br />
          {selectedData.capital.join(", ")}
        </p>
      )}
      {selectedData.currencies && (
        <>
          {Object.entries(selectedData.currencies).length > 0 && (
            <p style={{ marginBottom: 10 }}>
              Walut
              {Object.entries(selectedData.currencies).length === 1
                ? "a"
                : "y"}{" "}
              (Kod - Nazwa - Symbol) :
              <br />
              {Object.entries(selectedData.currencies).map((currency) =>
                parse(`${currency[0]}
              -
              ${currency[1].name}
              -
              ${currency[1].symbol}
              <br />`)
              )}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default SingleCountryPage;
