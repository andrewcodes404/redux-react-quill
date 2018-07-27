import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { createPost } from '../actions'

class PostsNew extends React.Component {


    renderField = (field) => {
        const { meta: { touched, error } } = field
        const classErrorInput = `${touched && error ? 'error-input' : ""}`;
        return (
            <div className={classErrorInput}>
                <label>{field.label}</label>
                <input {...field.input} type="text" className="form-control" />
                <div className="error-message">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    onSubmit = (values) => {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <Field
                    label="Title"
                    anyNameProp="sucker"
                    name="title"
                    component={this.renderField}
                ></Field>
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                ></Field>
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                ></Field>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="">BACK </Link>
            </form>
        );
    }
}


function validate(values) {
    //define our object 
    const errors = {}

    // ---> validate the inputs from 'values' an erros appended to the error{obj}
    if (!values.title) {
        errors.title = "enter a title!"
    }
    if (values.title && values.title.length <= 3) {
        errors.title = "enter a longer title!"
    }
    if (!values.categories) {
        errors.categories = "enter a categories!"
    }
    if (!values.content) {
        errors.content = "enter a content!"
    }

    //if errors is empty the form is fine to submit
    //if errors has any values, redux assumes form invalid
    return errors
}


export default reduxForm({
    validate: validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
)
