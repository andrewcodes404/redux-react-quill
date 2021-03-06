import React from 'react';
import { connect } from 'react-redux'
import { fetchDataAC } from '../actions';
import { Link } from 'react-router-dom'
class Read extends React.Component {


    componentDidMount() {
        this.props.fetchDataAC()
    }


    renderTitle(el, key) {
        return (
            <Link to={`/single/${el.id}`} key={key}>
                <p >{el.title}</p>
            </Link>
        )
    }


    render() {
        console.log("this.props : ", this.props);
        return (
            <div>
                
                {this.props.data.map(this.renderTitle)}
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.data
    }
}

export default connect(mapStateToProps, { fetchDataAC })(Read)