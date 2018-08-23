import React from 'react';
import ReactQuill from 'react-quill';
import { uploadDataAC } from '../actions'


const Quill = ReactQuill.Quill
var Font = Quill.import('formats/font');
Font.whitelist = ['Ubuntu', 'Raleway', 'Roboto'];
Quill.register(Font, true);

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }, { 'font': ['Ubuntu', 'Raleway', 'Roboto'] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'font'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ]
}

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

class Create extends React.Component {

    constructor(props) {
        super(props)
        this.state = { text: '', title: "" } // You can also pass a Quill Delta here
    }

    handleChange = (value) => {
        this.setState({ text: value })
    }

    handleChangeTitle(title) {
        this.setState({ title });
    }

    submit = () => {
        const values = {}
        values.text = this.state.text
        values.title = this.state.title
        uploadDataAC(values, (id) => {
            this.setState({ text: "", title: "" })
            this.props.history.push('/single/' + id);
        })
    }


    render() {
        return (
            <div className="form-cont">

                <label htmlFor="title">title</label>
                <input
                    name="title"
                    type="text"
                    value={this.state.title}
                    onChange={event => this.handleChangeTitle(event.target.value)}
                />


                <ReactQuill
                    value={this.state.text}
                    onChange={this.handleChange}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                />

                <button onClick={this.submit}>submit</button>
            </div>
        )
    }
}

export default Create