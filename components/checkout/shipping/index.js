import styles from "./styles.module.scss";

import { useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { changeActiveAddress } from "../../../requests/user";

import ShippingInput from "@/components/inputs/shippingInput";
import SingularSelect from "@/components/selects/SingularSelect";

import { countries } from "@/data/countries";

import { saveAddress } from "@/requests/user";

import { FaIdCard, FaMapMarkerAlt } from "react-icons/fa";
import { GiPhone } from "react-icons/gi";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";

const initialValue = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  state: "",
  city: "",
  zipCode: "",
  address1: "",
  address2: "",
  country: "",
};

export default function Shipping({ user, addresses, setAddresses }) {
  const [shipping, setShipping] = useState(initialValue);
  const [visible, setVisible] = useState(user?.address.length ? false : true);
  const {
    firstName,
    lastName,
    phoneNumber,
    state,
    city,
    zipCode,
    address1,
    address2,
    country,
  } = shipping;
  const validate = yup.object({
    firstName: yup
      .string()
      .required("First name is required")
      .min(3, "First name must be atleast 3 characters long.")
      .max(20, "First name must be less than 20 characters long."),
    lastName: yup
      .string()
      .required("Last name is required")
      .min(3, "Last name must be atleast 3 characters long.")
      .max(30, "Last name must be less than 30 characters long."),
    phoneNumber: yup
      .string()
      .required("required")
      .min(10, "too short")
      .max(13, "too long"),
    state: yup
      .string()
      .required("State name is required")
      .min(2, "State name should containe 2-60 characters.")
      .max(60, "State name should containe 2-60 characters."),
    city: yup
      .string()
      .required("City name is required")
      .min(2, "City name should containe 2-60 characters.")
      .max(60, "City name should containe 2-60 characters."),
    zipCode: yup
      .string()
      .required("ZipCode is required")
      .min(2, "ZipCode should containe 2-30 characters.")
      .max(30, "ZipCode should containe 2-30 characters."),
    address1: yup
      .string()
      .required("Address Line 1 is required")
      .min(5, "Address Line 1 should containe 5-100 characters.")
      .max(100, "Address Line 1 should containe 5-100 characters."),
    address2: yup
      .string()
      .min(5, "Address Line 2 should containe 5-100 characters.")
      .max(100, "Address Line 2 should containe 5-100 characters."),
    country: yup.string().required("Country name is required"),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };
  const saveShippingHandler = async () => {
    const res = await saveAddress(shipping);
    setAddresses(res.addresses);
  };
  const changeActiveHandler = async (id) => {
    const res = await changeActiveAddress(id);
    setAddresses(res.addresses);
  };
  console.log("addresses", addresses);
  return (
    <div className={styles.shipping}>
      <div className={styles.addresses}>
        {addresses.map((address) => (
          <div
            className={`${styles.address} ${address.active && styles.active}`}
            key={address._id}
            onClick={() => changeActiveHandler(address._id)}
          >
            <div className={styles.address__side}>
              <img src={user.image} alt="img" />
            </div>
            <div className={styles.address__col}>
              <span>
                <FaIdCard />
                {address.firstName.toUpperCase()}{" "}
                {address.lastName.toUpperCase()}
              </span>
              <span>
                <GiPhone />
                {address.phoneNumber}
              </span>
            </div>
            <div className={styles.address__col}>
              <span>
                <FaMapMarkerAlt /> {address.address1}
              </span>
              <span>{address.address2}</span>
              <span>
                {address.city}, {address.state}, {address.country}
              </span>
              <span>{address.zipCode}</span>
            </div>
            <span
              className={styles.active__text}
              style={{
                display: `${address.active ? "" : "none"}`,
              }}
            >
              Active
            </span>
          </div>
        ))}
      </div>
      <button className={styles.hide_show} onClick={() => setVisible(!visible)}>
        {visible ? (
          <span>
            <IoMdArrowDropupCircle style={{ fontSize: "2rem", fill: "#222" }} />
          </span>
        ) : (
          <span>
            ADD NEW ADDRESS <AiOutlinePlus />
          </span>
        )}
      </button>
      {visible && (
        <Formik
          enableReinitialize
          initialValues={{
            firstName,
            lastName,
            phoneNumber,
            state,
            city,
            zipCode,
            address1,
            address2,
            country,
          }}
          validationSchema={validate}
          onSubmit={() => {
            saveShippingHandler();
          }}
        >
          {(formik) => (
            <Form>
              <SingularSelect
                name="country"
                value={country}
                placeholder="Country"
                handleChange={handleChange}
                data={countries}
              />
              <div className={styles.col}>
                <ShippingInput
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                />
                <ShippingInput
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.col}>
                <ShippingInput
                  name="state"
                  placeholder="Oblast"
                  onChange={handleChange}
                />
                <ShippingInput
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                />
              </div>
              <ShippingInput
                name="phoneNumber"
                placeholder="Phone number"
                onChange={handleChange}
              />
              <ShippingInput
                name="zipCode"
                placeholder="Zip Code"
                onChange={handleChange}
              />
              <ShippingInput
                name="address1"
                placeholder="Address 1"
                onChange={handleChange}
              />
              <ShippingInput
                name="address2"
                placeholder="Address 2"
                onChange={handleChange}
              />
              <button type="submit">Save address</button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
