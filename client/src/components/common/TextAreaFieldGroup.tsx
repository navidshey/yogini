import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

interface IProps {
  name: string;
  placeholder: string;
  value: string;
  error?: String;
  info?: string;
  onChange: any;
}

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange
}: IProps) => {
  return (
    <div className="form-group">
      <textarea
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error} </div>}
    </div>
  );
};

(TextAreaFieldGroup as any).propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
