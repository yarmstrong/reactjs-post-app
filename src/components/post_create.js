import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import { createPost } from '../actions'

const FIELDS = {
   title: {
      type: 'input',
      label: 'Title for Post'
   },
   categories: {
      type: 'input',
      label: 'Add Category'
   },
   content: {
      type: 'textarea',
      label: 'Post Contents'
   }
}

class CreatePost extends Component {
   renderReduxFormField(fieldConfig, fieldName) {
      return (
         <Field
            name={fieldName}
            component={this.renderField}
         />
      )
   }

   renderField(field) { 
      // input, meta(touched/error) and input.name = fieldName from redux-form <Field />
      const fieldConfig = FIELDS[field.input.name]
      const { meta: { touched, error } } = field
      const className = `form-group ${touched && error ? 'has-danger' : ''}`

      return (
         <div className={className}>
            <label>{fieldConfig.label}</label>
            <fieldConfig.type className="form-control" type="text" {...field.input} />
            <div className="text-help">
               {touched ? error : ''}
            </div>
         </div>
      )
   }

   onSubmit(values) {
      this.props.createPost(values, () => {
         this.props.history.push('/')
      })
   }

   render() {
      const { handleSubmit } = this.props

      return (
         <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <h3>Create New Post</h3>
            {_.map(FIELDS, this.renderReduxFormField.bind(this))}
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to="/" className="btn btn-danger">Cancel</Link>
         </form>
      )
   }
}

const validate = (values) => {
   const errors = {}

   _.each(FIELDS, (fieldConfig, fieldName) => {
      if (!values[fieldName]) {
         errors[fieldName] = `Enter some ${fieldName}`
      }
   })

   return errors
}

export default reduxForm({
   form: 'PostCreateForm',
   validate
})(connect(null, { createPost })(CreatePost))