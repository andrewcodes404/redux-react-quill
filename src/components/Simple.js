import React from 'react';
import ReactQuill from 'react-quill';


const Quill = ReactQuill.Quill
var Font = Quill.import('formats/font');
Font.whitelist = ['Comfortaa', 'Montserrat', 'Slabo'];
Quill.register(Font, true);

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }, { 'font': ['Comfortaa', 'Montserrat', 'Slabo'] }],
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

class Simple extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: '' }
    }

    handleChange = (value) => {
        this.setState({ text: value })
    }

    render() {
        return (
            <ReactQuill
                value={this.state.text}
                onChange={this.handleChange}
                modules={modules}
                formats={formats}
            />
        )
    }
}

export default Simple