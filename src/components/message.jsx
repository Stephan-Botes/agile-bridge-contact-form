import React from 'react';

export const Message = props => <div className="text-center">
    {props.header && <h3 className="message-header">{props.header}</h3> }
    <div class="message-body"> {props.text} </div>
</div>
