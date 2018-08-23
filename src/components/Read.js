import React from 'react';
import { connect } from 'react-redux'
import { fetchDataAC } from '../actions';

class Read extends React.Component {


    componentDidMount() {
        this.props.fetchDataAC()
    }

    renderPosts = (el, key) => {

        function createMarkup() {
            return { __html: el };
        }



       return (
           <div key={key} >
               <div dangerouslySetInnerHTML={createMarkup()}></div>
           <br/>
           </div>
       ) 
     }


    render() {
        console.log("this.props : ", this.props);
        return (
            <div>
                <p>Read</p>

                {this.props.data.map(this.renderPosts)}
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