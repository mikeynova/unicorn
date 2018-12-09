import React from 'react'
import { Button, View } from 'react-native'
import { Formik } from 'formik'

import MaterialTextInput from './MaterialTextInput'

const Form = props => (
  <Formik
    onSubmit={values => props._handleSubmit(values)}
    initialValues={props.initialValues}
    validationSchema={props.validationSchema}
    validateOnChange={true}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      isValid
    }) => {
      const b = <Button onPress={handleSubmit} title={props.buttonName} />
      const button = isValid ? b : null
      return (
        <View>
          {props.inputs.map((input, i) => (
            <MaterialTextInput
              key={i}
              touched={touched}
              handleBlur={handleBlur}
              error={errors, errors}
              handleChange={handleChange}
              label={input}
              name={input}
              type={input}
            />
          ))}
          {button}
        </View>
      )}}
  </Formik>
)

export default Form
