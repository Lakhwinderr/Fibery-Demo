import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import './Form.css'
export default function Form({dataHandler}) {
  const [isClicked, setIsClicked] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);

  // Function to handle button click
  const handleClick2 = () => {
    
    setIsClicked(true); // Set isClicked to true when button is clicked

    // Reset isClicked to false after 1 second (1000 milliseconds)
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  const handleClick = () => {
    // alert("this will work for the first buton");
    setIsClicked2(true); // Set isClicked to true when button is clicked

    // Reset isClicked to false after 1 second (1000 milliseconds)
    setTimeout(() => {
      setIsClicked2(false);
    }, 200);
  };
  const errors = {};
  const validate = (values) => {
    if (!values.name) {
      errors.name = "Required";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.workFor) {
      errors.workFor = "Required";
    }

    if(!Object.keys(values.about).some(key => values.about[key] === true)){
      errors.about = "Required"
    }
    return errors;
  };

  // const valid = () => {
  //   if (formik.values.name && formik.values.email && formik.values.workFor && Object.keys(formik.values.about).some(key => formik.values.about[key] === true)) {
  //     return true;
  //   }
  //   return false;
  // };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      workFor: "",
      about: {
        leadership: false,
        consulting: false,
        productManagement: false,
        design: false,
        engineering: false,
        sales: false,
        marketing: false,
        hr: false,
        education: false,
        else: false,
      },
      description: "",
      workspace: "",
    },
    validate,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      // console.log(formik.values)
      dataHandler({
        type: "formData",
        value: formik.values
      })
      formik.resetForm()
    },
  });

  return (
    <div className="overflow-auto scrollbar-hidden max-h-full p-8">
      <h1 className="text-xl font-bold">Enter Details</h1>
      <form
        className="flex flex-col items-start"
        onSubmit={formik.handleSubmit}
      >
        <label htmlFor="name" className="my-1">
          Name*{" "}
        </label>
        <input
          className="pl-2 rounded-lg border-2 w-10/12 h-10 border-[#dddddd] focus:outline-none"
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name && formik.touched.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
        <label htmlFor="email" className="my-1">
          Email*
        </label>
        <input
          className="pl-2 rounded-lg border-2 w-10/12 h-10 border-[#dddddd] focus:outline-none"
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <button
          type="button"
          className={
            "rounded-full my-6 border-2 border-[#0269fe] text-[#0269fe] px-5 py-1 " +
            (isClicked2 ? "-scale-30 shadow-lg  border-2 border-[#0269fe]" : "")
          }
          onClick={handleClick}
        >
          Add Guests
        </button>
        <div className="emojis flex flex-col items-start my-1">
        <p>I want Fibery to work for*</p>
          <label>
            <input
            //  className={checkBox}
              type="radio"
              name="workFor"
              value="myself" // Unique value for this radio button
              checked={formik.values.workFor === "myself"} // Check if this radio button is selected
              onChange={() => formik.setFieldValue("workFor", "myself")} // Update Formik state
            />
            <span className="ml-1">🥕 Myself</span>
          </label>
          <label>
            <input
              type="radio"
              name="workFor"
              value="lessThan10" // Unique value for this radio button
              checked={formik.values.workFor === "lessThan10"} // Check if this radio button is selected
              onChange={() => formik.setFieldValue("workFor", "lessThan10")} // Update Formik state
            />
            <span className="ml-1">
              &#x26F9;&#xFE0F;&#x200D;&#x2642;&#xFE0F; &lt; 10 people
            </span>
          </label>
          <label>
            <input
              type="radio"
              name="workFor"
              value="10to50" // Unique value for this radio button
              checked={formik.values.workFor === "10to50"} // Check if this radio button is selected
              onChange={() => formik.setFieldValue("workFor", "10to50")} // Update Formik state
            />
            <span className="ml-1">🦄 10-50 people</span>
          </label>
          <label>
            <input
              type="radio"
              name="workFor"
              value="50plus" // Unique value for this radio button
              checked={formik.values.workFor === "50plus"} // Check if this radio button is selected
              onChange={() => formik.setFieldValue("workFor", "50plus")} // Update Formik state
            />
            <span className="ml-1">🦅 50+ people</span>
          </label>
        </div>
        {formik.errors.workFor && formik.touched.workFor ? (
          <div>{formik.errors.workFor}</div>
        ) : null}
        
        <div className="emojis flex flex-col items-start my-1">
          <p>You are more about*</p>
          <label>
            <input
              type="checkbox"
              name="about.leadership"
              value={formik.values.about.leadership}
              onChange={formik.handleChange}
            />
            <span className="ml-1">🗻 Leadership</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="about.consulting"
              value={formik.values.about.consulting}
              onChange={formik.handleChange}
            />
            <span className="ml-1">🦉 Consulting</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="about.productManagement"
              value={formik.values.about.productManagement}
              onChange={formik.handleChange}
            />
            <span className="ml-1">🌝 Product Management</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="about.design"
              value={formik.values.about.design}
              onChange={formik.handleChange}
            />
            <span className="ml-1">🎨 Design</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="about.engineering"
              value={formik.values.about.engineering}
              onChange={formik.handleChange}
            />
            <span className="ml-1">💻 Engineering</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="about.sales"
              value={formik.values.about.sales}
              onChange={formik.handleChange}
            />
            <span className="ml-1">🎣 Sales</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="about.marketing"
              value={formik.values.about.marketing}
              onChange={formik.handleChange}
            />
            <span className="ml-1">💣 Marketing</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="about.hr"
              value={formik.values.about.hr}
              onChange={formik.handleChange}
            />
            <span className="ml-1">💎 Human Resources</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="about.education"
              value={formik.values.about.education}
              onChange={formik.handleChange}
            />
            <span className="ml-1">📚 Education</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="about.else"
              value={formik.values.about.else}
              onChange={formik.handleChange}
            />
            <span className="ml-1">❓ Something else</span>
          </label>
        </div>
        {formik.errors.about && formik.touched.about ? (
          <div>{formik.errors.about}</div>
        ) : null}
        <div className="my-4" >

        <label htmlFor="description">
          Please, share anything that will help prepare for our meeting
        </label>
        <br />
        <textarea
        className="mt-1 rounded-lg border-[#dddddd] border-2 focus:outline-none  w-10/12"
          name="description"
          id="description"
    
          rows="5"
          {...formik.getFieldProps("description")}
        ></textarea>
        </div>
        <div className="my-4">
        <label htmlFor="workspace">
          Please, share with us the name of your Fibery workspace(if any)
        </label>
        <textarea
          className="mt-1 rounded-lg border-[#dddddd] border-2 focus:outline-none w-10/12"
          name="workspace"
          id="workspace"
       
          rows="2"
          {...formik.getFieldProps("workspace")}
        ></textarea>
        </div>
        <button
        
          type="submit"
          className={
            "rounded-full  my-2 mb-4 bg-[#0269fe] text-lg  text-white px-5 py-2 disabled:bg-gray-400  " +
            (isClicked ? "-scale-20 bg-[#4d78b4] shadow-lg" : null)
          }
          onClick={handleClick2}
        >
          Schedule Event
        </button>
      </form>
    </div>
  );
}
