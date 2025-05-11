
import { InputGroup, Form } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

function SearchBar({ search, setSearch, includeSynopsis, setIncludeSynopsis }) {
  return (
    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start gap-2 w-100">
      <InputGroup>
        <InputGroup.Text>
          <i className="bi bi-search" />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search by title or synopsis..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
      <div className="form-check mt-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="includeSynopsis"
          checked={includeSynopsis}
          onChange={(e) => setIncludeSynopsis(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="includeSynopsis">
          Include synopsis in the search
        </label>
      </div>
    </div>
  );
}

export default SearchBar;
