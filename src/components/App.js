import React from 'react';
import './App.scss';
import EditForm from './EditForm';

export default class App extends React.Component {

	constructor() {
		super();
		// initial state

		this.saveItem = this.saveItem.bind( this );
		this.getOptions = this.getOptions.bind( this );
		this.handleChange = this.handleChange.bind( this );
		this.getOptions = this.getOptions.bind( this );

		this.state = {
			options: {},
			ajaxBase: 'http://plugins.dev/wp-json/wprb/v1'
		};
	}

	getOptions() {
		fetch( this.state.ajaxBase + '/options' ).then( function( response ) {
			if ( response.ok ) {
				return response.json();
			}
			throw new Error( 'Network response was not ok.' );
		} ).then( json => {
			this.setState( { options: json } );
		} ).catch( function( error ) {
			console.log( 'There has been a problem with your fetch operation: ' + error.message );
		} );
	}

	componentDidMount() {
		this.getOptions();
	}

	editItem( key ) {

	}

	handleChange( key, value ) {
		let opts = this.state.options;
		opts[ key ] = value;

		this.setState( { opts } );
	}

	saveItem( key ) {

		const val = this.state.options[ key ];

		console.log( val );

		const post_data = {
			key: key,
			value: val
		};

		console.log( post_data );

		fetch( this.state.ajaxBase + `/option/${key}`, {
			method: 'post',
			body: JSON.stringify( post_data ),
			mode: 'no-cors'
		} ).then( function( response ) {
			console.log( response );

			return response.json();
		} ).then( function( data ) {
			//Update state
		} );
	}

	render() {
		return (
			<div>
				<h1>WP React Boilerplate</h1>

				<p>Options Editor</p>

				<table>
					<tbody>
					{
						Object.keys( this.state.options ).map( key =>
							<tr key={key}>
								<td>{key}</td>
								<td>
									{this.state.options[ key ]}
									&nbsp;<a href="#" onClick={this.editItem( key )}>Edit ✏️</a>
									<EditForm handleSubmit={this.saveItem} handleChange={this.handleChange} key={key} id={key} value={this.state.options[ key ]} />
								</td>
							</tr>
						)
					}
					</tbody>
				</table>
			</div>
		);
	}
}