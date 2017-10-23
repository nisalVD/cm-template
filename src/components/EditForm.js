import React from 'react';

class EditForm extends React.Component {

	constructor() {
		super();
		this.state = { value: '' };

		this.handleChange = this.handleChange.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
	}

	handleChange( event ) {
		console.log( "Change" );

		this.props.handleChange( this.props.id, event.target.value );
	}

	handleSubmit( event ) {
		event.preventDefault();

		this.props.handleSubmit( this.props.id );
	}

	render() {
		return (
			<form onSubmit={( e ) => this.handleSubmit( e )} className={this.props.visible ? 'visible' : 'hidden'}>

				<label>
					Name:
					<input type="text" value={this.props.value} onChange={this.handleChange} />
				</label>

				<input type="submit" value="Submit" />
			</form>
		)
	}
}

export default EditForm;