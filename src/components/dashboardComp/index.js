import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateDashboardData, del, verify} from '../../actions/dashboard_action'
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './inside/home'
import Members from './inside/members'
import MembersReq from './inside/membersReq'
import GetMem from './inside/getMem'
import Chart from '../chart'
import {updateData} from '../../actions'
import M from 'materialize-css'

import FixedComp from './fixedComp'

function Modal(props){
    console.log('DashModal',props)
    var data
    if(props.data)
    props.data.map(function(mem){
        if(props.selected==mem.reg){
            console.log(mem)
            data= <Chart data={mem} />
        }
    })
    if(data) return data
    return <h5>Member Not Found</h5>
}

function Loader(props){
    if(!props.loggedIn)
    return(
        <div style={{position: 'fixed', top:0, bottom:0,left:0, right:0, zIndex:2000, background: 'rgba(0,0,0, 0.7)' }}>
        <div class="preloader-wrapper big active" style={{height:200, width:200, position: 'absolute', top:'50%', left:'50%', margin: -100}}>
            <div class="spinner-layer spinner-green-only">
            <div class="circle-clipper  left">
                <div class="circle"></div>
            </div><div class="gap-patch">
                <div class="circle"></div>
            </div><div class="circle-clipper right">
                <div class="circle"></div>
            </div>
            </div>
        </div>
       </div>
    )
    return <div/>
}

export class dashboard extends Component{
    constructor(props){
        super(props)
        this.sideNav=React.createRef();
        this.Modal=React.createRef();
    }
    componentDidMount(){
        console.log('Mounted Dashboard')
        var elems = document.querySelectorAll('.sidenav');
        window.sideInstance = M.Sidenav.init(elems[0]);
        this.props.updateDashboardData()
        console.log('home',Home)
        // window.filter=this.props.filter
        // window.members=this.props.members
        var instance = M.Modal.init(this.Modal.current);
        this.props.updateData(instance,'UPDATE_MODAL_INSTANCE')

    }
    render(){
        return(
        <div>
            <BrowserRouter>
            <Switch>
                <Route exact path='/dashboard/'>
                    <FixedComp/>
                </Route>

                <Route path='/dashboard/home'>
                <FixedComp>
                        <Home members={this.props.dashMembers} requests={this.props.dashRequests} details={this.props.dashDetails}/>
                </FixedComp>
                </Route>

                <Route path='/dashboard/members'>
                <FixedComp>
                    <Members selected={this.props.dashModal} updateData={this.props.updateData} members={this.props.dashMembers} del={this.props.del}/>
                </FixedComp>
                </Route>

                <Route path='/dashboard/requests'>
                <FixedComp>
                    <MembersReq selected={this.props.dashModal} updateData={this.props.updateData} requests={this.props.dashRequests} del={this.props.del} verify={this.props.verify}/>
                </FixedComp>
                </Route>

                <Route path='/dashboard/find'>
                <FixedComp>
                    <GetMem  selected={this.props.dashModal} updateData={this.props.updateData} members={this.props.dashMembers} del={this.props.del} />
                </FixedComp>
                </Route>
            </Switch>
            </BrowserRouter>
            <Loader loggedIn={this.props.isLoggedIn}/>

              <div id="dashModalMem" ref={this.Modal} className="modal modal-fixed-footer">
                    <div className="modal-content">
                        <Modal data={this.props.dashRequests?[...this.props.dashRequests, ...this.props.dashMembers] : null} selected={this.props.dashModal.selected}/>
                    </div>
                    <div className="modal-footer" ref={this.modalFooter}>
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat"><b>Close</b></a>
                    </div>
                </div>

</div>


        )
    }
}

function mapStateToProps(state){
    return state
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({updateData,updateDashboardData,del, verify,updateData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(dashboard)