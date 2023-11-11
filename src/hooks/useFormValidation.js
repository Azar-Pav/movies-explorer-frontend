import { useState, useCallback } from 'react';

const useFormValidation = (values = {}) => {

  const [inputValues, setInputValues] = useState(values);
  
  const [errMessage, setErrMessage] = useState({});
  
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputValues({ ...inputValues, [name]: value });
    setErrMessage({
      ...errMessage,
      [name]: e.target.validationMessage,
    });
    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = useCallback(() => {
    setInputValues({});
    setErrMessage({});
    setIsValid(false)
  }, [])

  return {
    inputValues,
    errMessage,
    isValid,
    handleChange,
    resetForm,
    setInputValues,
    setIsValid
  };
}

export default useFormValidation;
