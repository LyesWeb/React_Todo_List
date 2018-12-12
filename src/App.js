import React, {Component} from 'react';
import Note from './components/Note';
import './css/App.css';
import * as MdIcon from 'react-icons/lib/md'
import ScrollArea from 'react-scrollbar';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import emptyImg from'./images/empty.png';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            noteText: '',
            isSelectAll: true,
            notes:[]
        }
    }

    updateNoteText(noteText){
        this.setState({ noteText: noteText.target.value });
        // console.log(noteText.target.value);
    }
    addNote(){
        if(this.state.noteText.trim() === ''){this.textInput.focus(); return}
        let notesArr = this.state.notes;
        notesArr.push([false,this.state.noteText]);
        this.setState({noteText: ''});
        this.textInput.focus();
    }
    deleteNote(index){
        let notesArr = this.state.notes;
        notesArr.splice(index, 1);
        this.setState({notes: notesArr});
    }
    selecteNote(index){
        let notesArr = this.state.notes;
        notesArr[index][0] = notesArr[index][0]===true?false:true;
        this.setState({notes: notesArr});
    }
    keyPress = (event) => {
        if(event.key === 'Enter'){
            this.addNote()
        }
    }
    selectAll(){
        this.state.isSelectAll === true?this.setState({isSelectAll: false}):this.setState({isSelectAll: true});
        // console.log(this.state.isSelectAll);
        let notesArr = this.state.notes;

        notesArr.map((val, key) => {
                // console.log(key);
                val[0] = this.state.isSelectAll;
        })
        this.setState({notes: notesArr});
    }
    trash(){
        let notesArr = this.state.notes;
        for (var i = notesArr.length -1; i >= 0; i--)
            notesArr[i][0] === true ? notesArr.splice(i,1): null;
        // let notesArr = this.state.notes;
        // notesArr.map((val, key) => {
        //     val[0] === true ? notesArr.splice(key,1); console.log(notesArr); : null;
        // })
        this.setState({notes: notesArr});
    }
    render() {

        let notes = this.state.notes.map((val, key, isSelected) => {
            return <Note key={key} isSelected={isSelected[key][0]} text={val[1]}
                deleteMethod={ () => this.deleteNote(key) }
                selecteMethod={ () => this.selecteNote(key) }
                />
        })
        let scrollbarStyles = {borderRadius: 5,width:5};
        let divStyle = {
            boxShadow: notes.length===0? "none":null,
        };
        let Checked = this.state.isSelectAll===false? true:false;
        return (
            <div className="container">
                <div className="header">
                    <input type="text"
                        ref={((input) => {this.textInput = input})}
                        className="textInput"
                        value={this.state.noteText}
                        onKeyPress={this.keyPress.bind(this)}
                        onChange={noteText => this.updateNoteText(noteText)}
                    />
                    <button className="add" onClick={this.addNote.bind(this)}>
                        <MdIcon.MdAdd size={24}/>
                    </button>
                    {
                        <h3 className="count">Tasks to do : <b>{notes.length}</b></h3>
                    }
                    {
                        
                        notes.length !== 0?
                    <div className="checkAll cntr" >
                        <input checked={Checked} type="checkbox" id="cc" className="cbx2 styled-checkbox" />
                        <label className="cbx" htmlFor="cc" onClick={this.selectAll.bind(this)}></label>
                        <label htmlFor="cc" onClick={this.selectAll.bind(this)}>Sellect all</label>
                    </div>:null
                    }
                </div>
                {notes.length!==0?
                <ScrollArea 
                    style={divStyle}
                    speed={0.5}
                    className="area"
                    horizontal={false}
                    smoothScrolling={true}
                    verticalScrollbarStyle={scrollbarStyles}
                    verticalContainerStyle={scrollbarStyles}
                >
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={100}
                    transitionLeaveTimeout={100}
                >
                    {notes}
                    
                </ReactCSSTransitionGroup>
                    {/* <Note text="noteText" />
                    <Note text="noteText" />
                    <Note text="noteText" />
                    <Note text="noteText" />
                    <Note text="noteText" />
                    <Note text="noteText" />
                    <Note text="noteText" />
                    <Note text="noteText" />
                    <Note text="noteText" />
                    <Note text="noteText" />
                    <Note text="noteText" />
                    <Note text="noteText" />
                    <Note text="noteText" />
                    <Note text="noteText" />
                    <Note text="noteText" />
                    <Note text="noteText" /> */}
                    
                </ScrollArea>:null
                }
                {
                    notes.length===0?<h3 className="empty"><br/><img src={emptyImg} alt='empty'/></h3>:null
                }
                {notes.length!==0?
                <div className="trach" onClick={this.trash.bind(this)} >
                    <MdIcon.MdDelete size={23} />Move to trash
                    {
                        <span className="countSelected">({this.state.notes.filter(note => note[0] === true).length})</span>
                    }
                </div>:null
                }
            </div>
        );
  }
}
export default App;
