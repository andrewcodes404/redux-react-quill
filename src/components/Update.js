import React from 'react';
import ReactQuill from 'react-quill';
import { updateAC, fetchForUpdateAC, deleteAC } from '../actions'
import { connect } from 'react-redux'

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

class Update extends React.Component {

    constructor(props) {
        super(props)
        this.state = { text: '', title: "" } // You can also pass a Quill Delta here
    }


// DONT USE THE STATE FROM PROPS FOR QUILL... 
// ASSIGN IT TO THE LOCAL STATE FIRST OR YOU WIL NOT BE ABLE TO  
// USE YOUR ONCHANGE HANDLER FUNCTION
    componentDidMount() {
        // grab the post id from the url
        const { id } = this.props.match.params

        //Use the id in the AC and wait for the callback
        this.props.fetchForUpdateAC(id, ()=>{

            //once the callback is recieved set the local statewith the data
            this.setState({
                title: this.props.single.title,
                text: this.props.single.text 
            })
        })
    }

    handleChange= (text) => {
        this.setState({ text: text })
        console.log("text-value : ", text);
        console.log("this.state.text : is it empty?===>", this.state.text);
    }


    // handleChange(value) {
    //     this.setState({ text: value })
    // }

    handleChangeTitle(title) {
        this.setState({ title: title });
        console.log("title-value : ", title);
    }

    submit = () => {
        const id = this.props.single.id
    
        const values = {}
        values.text = this.state.text
        values.title = this.state.title
        values.id = this.props.single.id

        updateAC(id, values, (id) => {
            this.props.history.push('/single/' + id);
        })
    }

    // areYouSure = () => {
    //     confirm("are you sure")
    // }


    delete = () => {
        console.log("delete clicked");
        const id = this.props.single.id
        deleteAC(id, ()=>{
            this.props.history.push('/');
        })
    }

    render() {
        
        return (
            <div className="form-cont">

                <label htmlFor="title">title</label>
                <input
                    name="title"
                    type="text"
                    defaultValue={this.state.title}
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
                <button onClick={ () =>  window.confirm('Are you sure you wish to delete this item?') ? this.delete() : null } > delete!!</button>

                </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        single: state.single
    }
}
export default connect(mapStateToProps, { updateAC, fetchForUpdateAC, deleteAC})(Update)