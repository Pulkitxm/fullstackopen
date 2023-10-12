const Country = ({ country }) => {

  if (!country) {
    return <></>
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div><b>Capital</b>: {country.data.capital[0]} </div>
      <div><b>Population</b>: {country.data.population}</div>
      <br/>
      <img
        src={country.data.flags.png}
        height="100"
        alt={`flag of ${country.data.name.common}`}
      />
    </div>
  );
};

export default Country