import React from 'react'
import { ContactForm } from './contact-form'
import { Message } from './message'
import { UserPanel } from './user-panel'


export class App extends React.Component{

    CONTACT_FORM_DEFAULTS = {
        name: '',
        email: '',
        option:'A',
        select: 1,
        message:'',
        terms: false
    }
    constructor (props) {
        super(props)
        this.state = {
            contact: {...this.CONTACT_FORM_DEFAULTS},
            sent: false,
            currentUser: null
        }
    }

    contactChanged =(contact) => {
        this.setState({
            contact
        })
    }

    sendContact = (contact) => {
        console.log(contact)
        this.setState({
            sent:true,
            contact
        });
    }

    logIn = () => {
        this.setState({
            currentUser:{
                name:'Test User',
                email:'user@example.com'
            },
            contact: {
                name: 'Test User',
                email: 'user@example.com'
            }
            // TODO: add default values to form fields after its updated
        })
    }


    render(){
        const { sent, currentUser } = this.state;
        return <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="pull-right">
                        {!!currentUser ? <UserPanel user={currentUser}/>
                            :
                            <button className="btn btn-default" onClick={this.logIn}>
                                <i className="glyphicon glyphicon-user">Log In</i>
                            </button>
                        }
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <h2>Contact us</h2>
                    <p>Please fill in form on the right to get fast reply</p>
                    {/*<img style={{width:'100%'}} src="http://via.placeholder.com/300x200"/>*/}
                </div>
                <div className="col-md-8">
                    {sent ?
                        <Message header={'Thank you!'} Text={'We will reply to your message in next 24h. Have a nice day! ;-)'}/>
                        :
                        <ContactForm data={this.state.contact} onChange={this.contactChanged} onSubmit={this.sendContact}/>
                    }
                </div>
            </div>
        </div>
    }
}
