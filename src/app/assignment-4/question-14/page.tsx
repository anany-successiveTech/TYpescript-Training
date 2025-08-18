"use client";
import React from "react";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";

interface FormValues {
  email: string;
  password: string;
  phone: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password should not be long")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[@$!%*?&#]/, "Must contain at least one special character"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/, "Phone number must be valid (10 digits, optional country code)"),
});

interface FormikTextFieldProps {
  name: keyof FormValues;
  label: string;
  type?: string;
}

const FormikTextField: React.FC<FormikTextFieldProps> = ({ name, label, type = "text" }) => (
  <Field name={name}>
    {({ field, form }: FieldProps<FormValues>) => (
      <TextField
        {...field}
        type={type}
        label={label}
        fullWidth
        margin="normal"
        error={Boolean(form.touched[name] && form.errors[name])}
        // helperText={form.touched[name] && form.errors[name] ? form.errors[name] : undefined}
        onChange={(e) => {
          form.handleChange(e);
          form.validateField(name);
        }}
        onBlur={form.handleBlur}
      />
    )}
  </Field>
);

const ComplexForm: React.FC = () => {
  const initialValues: FormValues = { email: "", password: "", phone: "" };

  const handleSubmit = (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    resetForm();
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h5" mb={3}>
        Register
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} noValidate>
            <FormikTextField name="email" label="Email" />
            <FormikTextField name="password" label="Password" type="password" />
            <FormikTextField name="phone" label="Phone Number" />

            <Button type="submit" variant="contained" fullWidth disabled={isSubmitting} sx={{ mt: 3 }}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ComplexForm;
