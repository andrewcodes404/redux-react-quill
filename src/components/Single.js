import React from 'react';
import { connect } from 'react-redux'
import { fetchSingleAC } from '../actions';
import { Link } from 'react-router-dom'

class Single extends React.Component {

    componentDidMount() {
        const { id } = this.props.match.params
        console.log("id : ", id);
        this.props.fetchSingleAC(id)
     
    }

    renderPost = (el) => {
        function createMarkup() {
            return { __html: el };
        }

        return (
            <div>
                <div dangerouslySetInnerHTML={createMarkup()}></div>
                <br />
            </div>
        )
    }

    render() {
      
        return (
            <div className="single-cont">
                <h2>{this.props.single.title}</h2>
                <Link to={`/single/update/${this.props.single.id}`}>EDIT</Link>
                {this.renderPost(this.props.single.text)}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        single: state.single
    }
}

export default connect(mapStateToProps, { fetchSingleAC })(Single)