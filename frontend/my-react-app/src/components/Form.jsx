import React, { useEffect, useState } from "react";
import styles from "./form.module.css";
import { IoIosArrowBack } from "react-icons/io";
import CategoryHook from "../hooks/CategoryHook";
import SubCategoryHook from "../hooks/SubCategoryHook";
import { FiImage } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import ProductHook from "../hooks/ProductHook";
import toast from "react-hot-toast";

const Form = ({
  title,
  fields,
  initialData = {},
  onSubmit,
  onCancel,
  submitButtonText,
  cancelButtonText = "Cancel",
  mode,
  getSubCategorybyCat,
}) => {
  const hookMap = React.useMemo(
    () => ({
      Category: CategoryHook,
      SubCategory: SubCategoryHook,
      Product: ProductHook,
    }),
    []
  );

  const FormHook = hookMap[title];

  if (!FormHook) {
    throw new Error(`No form hook registered for title: ${title}`);
  }

  const { formData, setFormData, errors, setErrors } = FormHook(initialData);

  const [preview, setPreview] = useState(initialData.image || null);

  const navigate = useNavigate();

  useEffect(() => {
    if (initialData?.image) {
      setPreview(initialData.image);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setPreview(reader.result);
        };

        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    fields.forEach((field) => {
      const value = formData[field.name];

      if (field.type === "file") {
        const newFileSelected = value && typeof value !== "string";
        const oldImageExists = preview !== null;

        if (field.required) {
          if (mode === "add" && !newFileSelected) {
            newErrors[field.name] = `${field.label} is required`;
            toast.error(`${field.label} is required`);
            return false;
          }

          if (mode === "edit" && !newFileSelected && !oldImageExists) {
            newErrors[field.name] = `${field.label} is required`;
            toast.error(`${field.label} is required`);
            return false;
          }
        }

        if (value && typeof value !== "string") {
          if (value instanceof FileList && value.length > 1) {
            newErrors[field.name] = `Only one image can be uploaded`;
            toast.error(`Only one image can be uploaded`);
            return false;
          }
        }

        if (newFileSelected && value.size > 10_000_000) {
          newErrors[field.name] = `${field.label} must be less than 10MB`;
          toast.error(`${field.label} must be less than 10MB`);
          return false;
        }
      }

      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
        toast.error(`${field.label} is required`);
        return false;
      }

      if (field.type === "select" && !value) {
        newErrors[field.name] = `Please select ${field.label}`;
        toast.error(`Please select ${field.label}`);
        return false;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = new FormData();

    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      const oldImage = initialData[key];

      if (key === "image") {
        if (value && typeof value !== "string") {
          payload.append(key, value);
        } else if (typeof value === "string") {
          payload.append(key, oldImage);
        }
      } else if (key === "category" || key === "subcategory") {
        payload.append(key, value?._id ?? value);
      } else {
        payload.append(key, value);
      }
    });

    console.log("Submitting form with payload:");
    for (let pair of payload.entries()) {
      console.log(pair[0], pair[1]);
    }
    onSubmit(payload);
  };

  const renderField = (field) => {
    const isFile = field.type === "file";

    const fieldProps = {
      id: field.name,
      name: field.name,
      onChange: handleChange,
      className: styles.inputField,
      placeholder: field.placeholder,
      ...(isFile
        ? {}
        : { value: formData[field.name] || "", required: field.required }),
    };

    switch (field.type) {
      case "select":
        return (
          <div className={styles.formGroup}>

            <label htmlFor={field.name} className={styles.formLabel}>
              {field.label}{" "}
              {field.required && <span className={styles.required}>*</span>}
            </label>

            <div className={styles.statusDropdownContainer}>

              <Select
                value={field.options.find((opt) => {
                  return (
                    (field.name === "status"
                      ? opt.value === formData[field.name]
                      : opt.value === formData[field.name]?._id) || null
                  );
                })}

                onChange={(selected) => {
                  setFormData((prev) => ({
                    ...prev,
                    [field.name]: selected ? selected.value : "",
                  }));

                  if (title === "Product" && field.name === "category") {
                    getSubCategorybyCat(selected.value);
                  }
                }}

                options={field.options}
                className={styles.customSelectWrapper} // wrapper class for CSS Modules
                classNamePrefix="custom"
              />
            </div>

            {errors[field.name] && (
              <span className={styles.error}>{errors[field.name]}</span>
            )}
          </div>
        );

      case "file":
        return (
          <div className={styles.formGroup}>

            <label htmlFor={field.name} className={styles.formLabel}>
              {field.label}{" "}
              {field.required && <span className={styles.required}>*</span>}
            </label>

            <div className={styles.imageDisplayContainer}>
              {preview && (
                <div className={styles.currentImage}>
                  <img
                    src={
                      preview.startsWith("data:")
                        ? preview
                        : `${import.meta.env.VITE_BASE_URL}${preview}`
                    }
                    alt="preview"
                    className={styles.imagePreview}
                  />
                </div>
              )}

              <div className={styles.uploadContainer}>
                <label htmlFor={field.name} className={styles.uploadBox}>
                  <div className={styles.iconWrapper}>
                    {/* Placeholder for the image icon with the upload arrow */}
                    <FiImage className={styles.imageIcon} />
                    <span className={styles.uploadArrow}>↑</span>
                  </div>
                  <p className={styles.maxSizeText}>
                    Upload Maximum allowed <br />
                    file size is 10MB
                  </p>
                </label>

                <input
                  type="file"
                  {...fieldProps}
                  accept={field.accept}
                  className={styles.hiddenFileInput}
                />
                {errors[field.name] && (
                  <span className={styles.error}>{errors[field.name]}</span>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className={styles.formGroup}>

            <label htmlFor={field.name} className={styles.formLabel}>
              {field.label}{" "}
              {field.required && <span className={styles.required}>*</span>}
            </label>

            <input type={field.type || "text"} {...fieldProps} />
            {errors[field.name] && (
              <span className={styles.error}>{errors[field.name]}</span>
            )}
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <IoIosArrowBack
          className={styles.backIcon}
          onClick={() => navigate(-1)}
        />

        <h2>{mode === "edit" ? `Edit ${title}` : `Add ${title}`}</h2>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          
          {fields?.map((field) => (

            <div key={field?.name} className={styles.fieldWrapper}>
              {renderField(field)}
            </div>
          ))}
        </div>

        <div className={styles.statusButtonsContainer}>
          <button
            type="button"
            onClick={onCancel}
            className={styles.statusButtonC}
          >
            {cancelButtonText}
          </button>
          <button type="submit" className={styles.statusButtonS}>
            {submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
