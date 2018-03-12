/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { ifCondition, PanelColor, withContext } from '@wordpress/components';
import { compose } from '@wordpress/element';

export default compose(
	withContext( 'editor' )(
		( settings, props ) => ( {
			colors: props.colors || settings.colors,
			disableCustomColors: props.disableCustomColors !== undefined ?
				props.disableCustomColors :
				settings.disableCustomColors,
		} )
	),
	ifCondition(
		( { colors, disableCustomColors } ) => ! ( isEmpty( colors ) && disableCustomColors )
	)
)( PanelColor );
