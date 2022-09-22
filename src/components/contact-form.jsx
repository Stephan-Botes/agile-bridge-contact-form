import React from 'react';
import { object,func } from 'prop-types';

export class ContactForm extends React.Component{

    static defaultProps = {
        data:{
            name:'',
            email:'',
            option:'',
            select: '',
            message:'',
            terms:false
        }
    }

    static propTypes = {
        onChange: func.isRequired,
        onSubmit: func.isRequired,
        data: object.isRequired
    }

    constructor(props){
        super(props);

    }

    componentDidMount() {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                this.handleSubmit(event);
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }

    /**
     * When form is submitted forward contact data to parent
     * @param {event} DOMEvent
     */
    handleSubmit(event){
        event.preventDefault();
        this.props.onSubmit(this.props.data);
    }

    fieldChange(event){
        let target = event.target;
        let value = target.type ==='checkbox' ? target.checked : target.value;
        let newContact = this.props.data;

        if (target.name === 'name') {
            newContact.name = value;
        }
        if (target.name === 'email') {
            newContact.email = value;
        }
        if (target.name === 'option') {
            newContact.option = value;
        }
        if (target.name === 'select') {
            newContact.select = value;
        }
        if (target.name === 'message') {
            newContact.message = value;
        }
        if (target.name === 'terms') {
            newContact.terms = value;
        }

        this.props.onChange(newContact);
    }

    isSelected(key, option){
        return this.props.data[key] == option
    }

    options = [
        {id:1, label:'I have question about my membership'},
        {id:2, label:'I have technical question'},
        {id:3, label:'I would like to change membership'},
        {id:4, label:'Other question'},
    ]

    render(){
        let data = this.props.data;

        return <form onSubmit={(e) => this.handleSubmit(e)}>

        <h3>Contact Form</h3>

        <div className="form-group">
            <label className="form-label">Your Name:</label>
            <input name="name" className="form-control" onChange={(e) => this.fieldChange(e)}/>
        </div>

        <div className="form-group">
            <label className="form-label">Your Best Email:</label>
            <input name="email" className="form-control" onChange={(e) => this.fieldChange(e)}/>
        </div>

        <label className="form-label">Select your membership option:</label>
        <div className="form-group row">
            <label className="form-label col-xs-4">
            <input type="radio" name="option" value="A" onChange={(e) => this.fieldChange(e)}/> Option A</label>
            <label className="form-label col-xs-4">
            <input type="radio" name="option" value="B" onChange={(e) => this.fieldChange(e)}/> Option B</label>
            <label className="form-label col-xs-4">
            <input type="radio" name="option" value="C" onChange={(e) => this.fieldChange(e)}/> Option C</label>
        </div>

        <hr/>

        <div class="form-group">
            <label className="form-label">What can we help you with:</label>
            <select  className="form-control" name="select" onChange={(e) => this.fieldChange(e)}>
                <option value="1">I have question about my membership</option>
                <option value="2">I have question about services</option>
                <option value="3">I have question about processing</option>
            </select>
        </div>

        <div className="form-group">
            <label className="form-label">Message:</label>
            <textarea name="message" rows="10" placeholder="Please type your question here"  className="form-control" onChange={(e) => this.fieldChange(e)}/>
        </div>

        <div className="form-group">
            <label className="form-label"> <input type="checkbox" name="terms" onChange={(e) => this.fieldChange(e)}/> I agree to terms and conditions </label>
        </div>

            <input type="submit" value="Send" className="contactform-submit" />
        </form>
    }
}
