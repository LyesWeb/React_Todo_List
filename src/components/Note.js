import React, {Component} from 'react';
import '../css/App.css';
import * as MdIcon from 'react-icons/lib/md'

class Note extends Component {
    handleScrollTopButtonClick() {
        this.context.scrollArea.scrollTop();
    }
    render() {
        // var styleSelected = this.props.isSelected===true? "selected":null;
        let styleSelected = this.props.isSelected===true? {boxShadow: "2px 2px 5px #dce0ef",backgroundColor: "rgba(226, 232, 247, 0.58)",borderLeft: "2px solid #b2bfd8"}:null;;
        let Checked = this.props.isSelected===true? true:false;
        return (
            <div 
                style={styleSelected}
                className="NoteItem"
            >
                <span className="check cntr" >
                    <input checked={Checked} type="checkbox" id={this.props.text} className="cbx2 styled-checkbox" onClick={this.props.selecteMethod} />
                    <label className="cbx" htmlFor={this.props.text}></label>
                </span>
                <label htmlFor={this.props.text}>{this.props.text}</label>
                <span className="delete" onClick={this.props.deleteMethod}>
                    <MdIcon.MdClose size={24} />
                </span>
            </div>
        );
  }

}

export default Note;
