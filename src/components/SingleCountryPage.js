import { Button } from "../styled";
import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../store/actions/countriesActions";

const SingleCountryPage = () => {
  const { lastRequest, selectedData } = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  return (
    <div>
      <Button onClick={() => dispatch(setSelected(false))}>Wróć</Button>
      <p>
        {selectedData.name.toLowerCase().includes(lastRequest)
          ? selectedData.name
          : selectedData.altSpellings.filter((name) =>
              name.toLowerCase().includes(lastRequest.toLowerCase())
            ).length > 0
          ? selectedData.name +
            " (" +
            selectedData.altSpellings.filter((name) =>
              name.toLowerCase().includes(lastRequest.toLowerCase())
            ) +
            ")"
          : selectedData.name}
        <br />
        Region: {selectedData.region}
        <br />
        {selectedData.topLevelDomain.length > 0 && (
          <>
            Domen{selectedData.topLevelDomain.length > 1 ? "y" : "a"}{" "}
            najwyższego poziomu: {selectedData.topLevelDomain.join(", ")}
          </>
        )}
        <br />
        {selectedData.callingCodes.length > 0 && (
          <>
            Telefoniczn{selectedData.callingCodes.length > 1 ? "e" : "y"} kod
            kraju: {selectedData.callingCodes.map((e) => `+${e}`).join(", ")}
          </>
        )}
        <br />
        {selectedData.altSpellings.length > 0 && (
          <>
            Znany również jako:
            <br />
            {selectedData.altSpellings.join(", ")}
          </>
        )}
      </p>
    </div>
  );
};

export default SingleCountryPage;
