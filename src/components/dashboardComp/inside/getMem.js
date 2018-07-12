import React, {Component} from 'react'
import Collapsi from './collapsi'
import Sort_filter from './filter-sort'

function RenderCard(props){
    if(props.show)
    return(
        <div className="card s12">
            <div className="card-content row">
                <span className="card-title" >Available Members</span>
                <div className="container" style={{marginTop:40}}>
                    <Sort_filter data={props.members} type="MEMBERS"/>
                    <Collapsi data={props.members} view={props.view}/>
                </div>
            </div>
        </div>
    )
    else return <div></div> 
}

export default class extends Component{
    constructor(props){
        super(props)
        this.timePickerFrom=React.createRef()
        this.timePickerTill=React.createRef()
        this.dayPicker=React.createRef()
        this.submit=this.submit.bind(this)
        this.state={show:null}
        this.viewMem=this.viewMem.bind(this)
    }
    
    componentWillUnmount(){
        document.getElementById('dashGetMem').classList.remove('active')
    }
    componentDidMount(){
        document.getElementById('dashGetMem').classList.add('active')
        M.Timepicker.init(this.timePickerTill.current)
        M.Timepicker.init(this.timePickerFrom.current)
        $('select').formSelect();
    }
    viewMem(reg){
        this.props.updateData(reg,'UPDATE_MODAL_SELECTED')
        this.props.selected.instance.open()
    }
    submit(){
        if(this.dayPicker.current.value!=="default" && this.timePickerFrom.current.value && this.timePickerTill.current.value){
            var start=parseInt(this.timePickerFrom.current.value.slice(0,2))
            var end=parseInt(this.timePickerTill.current.value.slice(0,2))
            var point=parseInt(this.dayPicker.current.value)
            if(this.timePickerTill.current.value.slice(-2)=="PM") end+=12
            if(this.timePickerFrom.current.value.slice(-2)=="PM") start+=12
            if(this.timePickerTill.current.value.slice(-5,-3)=="00") end-=1

            end-=8
            start-=8
            if(start>end) return alert('choose')
            console.log(start, end, point)

            this.props.members.map(function(mem){
                var okay=true
                console.log(mem.slots[point])
                for(var i=start; i<=end; i++){
                    if(mem.slots[point].indexOf(i)>-1){
                        okay=false
                        break
                    }
                }
                if(!okay)
                 mem.visible=null
                else mem.visible=true

            })
            this.forceUpdate()
            this.setState({show:true})
            
        }
        else{
            alert("Select Day/Time")
        }
    }

    render(){
        
        return(
            <div className="row">
                <div className="card s12">
                    <div className="card-content row">
                        <span className="card-title" >Get A Member</span>

                        <div style={{fontSize:17, margin:'36px 30px 10px 10px'}}>Choose a Day</div>
                        <div className="input-field col s12">
                        <select defaultValue="default" className="validate valid" ref={this.dayPicker}>
                            <option value="default" disabled >Days</option>
                            <option value="0">Monday</option>
                            <option value="1">Tuesday</option>
                            <option value="2">Wednesday</option>
                            <option value="3">Thursday</option>
                            <option value="4">Friday</option>
                            <option value="5">Saturday</option>
                            <option value="6">Sunday</option>
                        </select>
                            </div>


                        <div style={{fontSize:17, margin:'120px 30px 10px 10px'}}>Choose a Time</div>
                        <div className="input-field col s6">
                            <input type="text" class="timepicker" ref={this.timePickerFrom} />
                            <label htmlFor='mem_reg'>From</label>
                        </div>
                        <div className="input-field col s6">
                            <input ref={this.timePickerTill} type="text" class="timepicker"/>
                            <label htmlFor='mem_reg'>Till</label>
                        </div>
                        <div>
                        <center><a style={{marginTop:30}} className="waves-effect waves-light btn" onClick={this.submit}><i className="material-icons left">send</i>Submit</a></center>
                        </div>

                    </div>
                </div>

                <RenderCard 
                    show={this.state.show} 
                    members={this.props.members}
                    data={this.props.members}
                    view={this.viewMem}
                />
            </div>
        )
    }
}