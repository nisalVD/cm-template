import React from 'react';
import './App.scss';
import EditForm from './EditForm';
import base64 from 'base-64';

export default class App extends React.Component {
	constructor() {
		super();

		this.saveItem = this.saveItem.bind( this );
		this.toggleVisible = this.toggleVisible.bind( this );
		this.getOptions = this.getOptions.bind( this );
		this.handleChange = this.handleChange.bind( this );
		this.getOptions = this.getOptions.bind( this );

		// initial state
		this.state = {
			options: {},
			visible: {},
			saved: {},
			ajaxBase: window.wpApiSettings.wprb_ajax_base
		};
	}

	getOptions() {
		const myHeaders = new Headers({
			'Authorization': 'Basic ' + base64.encode('admin:1111')
		});

		fetch( this.state.ajaxBase + '/records',{
			headers: myHeaders,

		} ).then( function( response ) {
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

	toggleVisible( e, key ) {
		e.preventDefault();
		const visible = this.state.visible;

		visible[ key ] = true !== visible[ key ];

		this.setState( { visible } );
	}

	handleChange( key, value ) {
		let opts = this.state.options;
		opts[ key ] = value;

		this.setState( { opts } );
	}

	async saveItem( key ) {

		const val = this.state.options[ key ];
		const post_data = {
			key: key,
			value: val
		};
		/**
		 * @todo implement authentication
		 const myHeaders = new Headers( {
			'Authorization': 'Basic ' + base64.encode( config.basicAuth )
		} );
		 */

		const response = await fetch( this.state.ajaxBase + `/record/${key}`, {
			method: 'post',
			// headers: myHeaders,

			body: JSON.stringify( post_data ),
		} );

		const json = await response.json();

		if ( true === json ) {
			const saved = this.state.saved;
			saved[ key ] = true;
			this.setState( { saved } );

			//HACK to hide 'saved' checkmark
			setTimeout( () => {
				saved[ key ] = false;
				this.setState( { saved } );
			}, 1200 );
		}
	}

	render() {

		const items = Object.keys( this.state.options ).map( key =>
			<tr key={key}>
				<td>{key}</td>
				<td>
					<p>
						<span className="edit-me">{this.state.options[ key ]} | <a href="#" onClick={( e ) => this.toggleVisible( e, key )}>Edit ✏️</a></span>
						<span className={this.state.saved[ key ] ? 'saved check' : 'check'}>✅</span>
					</p>

					<EditForm
						handleSubmit={this.saveItem}
						handleChange={this.handleChange}
						key={key} id={key}
						value={this.state.options[ key ]}
						visible={this.state.visible[ key ]}
						hideItem={this.toggleVisible} />
				</td>
			</tr>
		);

		return (
			<div className="wp-react-boilerplate">
				<h1>WP React Boilerplate</h1>
				<h4>Options Editor</h4>
				<table>
					<tbody>
					{items}
					</tbody>
				</table>
			</div>
		);
	}
}