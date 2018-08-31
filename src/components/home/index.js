import React, {Component} from 'react'
import M from 'materialize-css'
import RegModal from './regModal'
import OrgModal from './orgModal'
var backStyle={
    position: 'absolute',
    top: 0,
    bottom:0,
    left:0,
    right:0,
    overflowY:'auto',
}
export default class extends Component{
    componentDidMount(){
        // console.log(document.getElementsByClassName('tabs'))
        document.title = "FreeSlots | Home"
        M.Tabs.init(document.getElementsByClassName('tabs'))
        M.Modal.init(document.querySelectorAll('.modal'))
    }
    render(){
        return(
            <div style={backStyle} className="homeBack">
            <div><img src="ico.png" alt="icon" style={{ position: 'absolute', top: 20, left: 20, width: 50}}/></div>
            <div style={{position: 'absolute',top: '29vh', width: '100%', textAlign:'center', color:'black'}}>
                <h1 className="titleHome" style={{fontWeight:900, marginBottom:0}}>FreeSlots</h1>
                <div className="despHome" style={{fontSize:15}} >A simple application to manage your team.</div>
            </div>

            <div className="row" style={{fontSize:20, position: 'absolute',top: '52vh', width: '100%', textAlign:'center'}}>
                <div style={{fontSize:20, color:'black',fontWeight:300}}>Continue as</div>

                <a href="#memReg" className="hvr-grow waves-effect waves-ligh hoverable modal-trigger homebtn col offset-l3 offset-s1 offset-m2 m3 l2 s4 btn-large"
                     style={{overflow:'hidden', color:'#004ec3', fontWeight:700}}>
                    <i className="hide-on-small-only material-icons left">person</i>Member
                </a>
                <div className="col l2 s1 m2" style={{margin: '0 auto'}}></div>
                <a  href="#orgReg" className="hvr-grow waves-effect waves-ligh hoverable modal-trigger homebtn col m3 l2 s5 btn-large" 
                    style={{overflow:'hidden', color:'#004ec3',fontWeight:700}} >
                    <i className="hide-on-small-only material-icons right">people</i>Organisation
                </a>
            </div>
            <RegModal/>
            <OrgModal/>
                
            </div>
        )
    }
}