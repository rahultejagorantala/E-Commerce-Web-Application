import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { post_product_cat } from '../../../actions/products'
import FileInput from '../../FileInput'
import Sidebar from '../Sidebar'

class ProductCatForm extends Component {

    // Function to render input fields
    renderInput({ input, label, type, meta }) {
        console.log('&^&^&^&^&', meta)
        return (
            <div>
                <label>{label}</label>
                <input
                    className="form-control" {...input}
                    autoComplete='off'
                />
                <div className="error_text">{meta.error}</div>
            </div>
        )
    }

    // Function to handle file input change
    onChange(e) {
        const { input: { onChange } } = this.props
        onChange(e.target.files[0])
    }

    // Function to handle form submission
    onSubmitForm = (formValues) => {
        this.props.post_product_cat(formValues)
    }

    // Function to render the form
    renderForm(props){
        return (
            <div className="container-fluid h-100 login_form">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
                        <form onSubmit={props.handleSubmit(this.onSubmitForm)} >
                            <div className="form-group">
                                <Field type='name' name="cat_name" component={this.renderInput} label="Enter Category Name" />
                                <Field type='file' name="cat_image" component={FileInput} label="Select Category Image" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <Sidebar compnt={this.renderForm(this.props)}/>
            </div>
        )
    }
}

// Function to validate form inputs
const validate = (formInputs) => {
    const errors = {}
    if (!formInputs.cat_name) {
        errors.cat_name = "Enter Category"
    }
    return errors
}

// Connect redux form and redux store to the component
const formaWrapped = reduxForm({
    form: 'add_product_cat',
    validate: validate
})(ProductCatForm)

// Connect redux actions to the component
export default connect(null, { post_product_cat })(formaWrapped)
