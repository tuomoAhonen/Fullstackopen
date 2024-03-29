import React from 'react';
import {SvgXml} from 'react-native-svg';
//import {Image} from 'react-native';
import CustomText from './CustomText';
const svgImage = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"/></svg>`;

const SvgAnglesLeft = ({style, fill}) => {
	//console.log(window.navigator);
	return window.navigator && window.navigator.product && window.navigator.product === 'ReactNative' ? (
		<SvgXml xml={svgImage} style={style} fill={fill} />
	) : (
		<CustomText defaultStyle={'textWhite'}>&#171;</CustomText>
	);
};

export default SvgAnglesLeft;
