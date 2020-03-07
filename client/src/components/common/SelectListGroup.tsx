import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { ISelectListOption } from "../../constants/interfaces";

interface IProps {
  name: string;
  placeholder: string;
  value: string;
  error?: String;
  info?: string;
  onChange: any;
  options: ISelectListOption[];
}

const SelectListGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  options
}: IProps) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error} </div>}
    </div>
  );
};

(SelectListGroup as any).propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
