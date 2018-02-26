/**
 * External dependencies
 */
import { find, kebabCase } from 'lodash';

/**
 * Internal dependencies
 */
import './style.scss';

const ALLOWED_COLOR_CONTEXTS = [
	'background',
	'text',
];

export const getColorFromAttribute = ( colors ) => ( colorAttribute ) => {
	if ( ! colorAttribute || colorAttribute[ 0 ] !== '%' ) {
		return colorAttribute;
	}
	const colorObj = find( colors, { name: colorAttribute.slice( 1 ) } );
	if ( ! colorObj ) {
		return null;
	}
	return colorObj.color;
};
export const getAttributeFromColor = ( colors ) => ( color ) => {
	const colorObj = find( colors, { color } );
	if ( colorObj ) {
		return '%' + colorObj.name;
	}
	return color;
};

export function getClassFromAttribute( colorContext, colorAttribute ) {
	if ( ! colorContext || find( ALLOWED_COLOR_CONTEXTS, colorContext ) ) {
		if ( window ) {
			window.console.error( 'An invalid color context was passed.' );
		}
		return null;
	}

	if ( ! colorAttribute || colorAttribute[ 0 ] !== '%' ) {
		return null;
	}

	return `has-${ kebabCase( colorAttribute.slice( 1 ) ) }-${ colorContext }-color`;
}

