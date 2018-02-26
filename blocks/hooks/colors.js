/**
 * WordPress dependencies
 */
import { getWrapperDisplayName } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { withContext } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { getAttributeFromColor, getColorFromAttribute } from '../color-mechanism';

/**
 * Override the default edit UI to include a new block inspector control for
 * assigning the custom class name, if block supports custom class name.
 *
 * @param {function|Component} BlockEdit Original component.
 *
 * @return {string} Wrapped component.
 */
export function withColorMechanism( BlockEdit ) {
	const BlockEditWithColorContext = withContext( 'editor' )(
		( settings, props ) => ( settings ? {
			getAttributeFromColor: getAttributeFromColor( settings.colors ),
			getColorFromAttribute: getColorFromAttribute( settings.colors ),
			setColorAttributeByColor: ( attribute ) => ( color ) => {
				const attributeValue = getAttributeFromColor( settings.colors )( color );
				props.setAttributes( { [ attribute ]: attributeValue || color } );
			},
		} : {} )
	)( BlockEdit );

	const WrappedBlockEdit = ( props ) => {
		return <BlockEditWithColorContext { ...props } />;
	};
	WrappedBlockEdit.displayName = getWrapperDisplayName( BlockEdit, 'colorMechanism' );

	return WrappedBlockEdit;
}

addFilter( 'blocks.BlockEdit', 'core/color-mechanism', withColorMechanism );
