import React from 'react';
import PropTypes from 'prop-types';
import Svg, { G, Path, Polygon } from 'react-native-svg';

import Wrapper from '../../common/wrapper/Wrapper';
import { darken } from '../../utils/colors';

const Standing5 = ({
  className,
  height,
  skinColor,
  hairColor,
  shoeColor,
  pantColor,
  coatColor
}) => (
  <Wrapper className={className}>
    <Svg width={0.8 * height} height={height} viewBox={`0 0 380 480`}>
      <G
        id="humaaans/standing-5"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <G id="humaaan-10" transform="translate(34.000000, 14.000000)">
          <G id="Head/Front/Short-1" transform="translate(84.439497, 0.000000)">
            <G
              id="Head"
              stroke-width="1"
              transform="translate(56.316359, 32.329762)"
              fill={skinColor}
            >
              <Path d="M8.61668863,35.9695996 C3.8111203,30.3288374 0.558611141,23.4160055 1.10210733,15.6699789 C2.66807119,-6.64848056 33.7361385,-1.73870383 39.7795208,9.52573796 C45.8229031,20.7901798 45.1047922,49.3633705 37.294259,51.3766405 C34.1794292,52.1795298 27.5439155,50.2127726 20.7905107,46.1421897 L25.0294931,76.1313749 L0,76.1313749 L8.61668863,35.9695996 Z" />
            </G>
            <Path
              d="M85.0571945,43.4891714 C81.6606189,45.389131 79.2433849,48.9493034 76.333621,53.6191918 C75.6249348,53.3406447 74.8531236,53.1876728 74.0455838,53.1876728 C70.5897319,53.1876728 67.7882105,55.9891943 67.7882105,59.4450461 C67.7882105,61.1994241 68.5101986,62.7851726 69.6732598,63.9213769 C68.2253885,65.9650374 66.6027401,68.0999144 64.7433583,70.30283 C57.8046112,66.139864 52.6437397,54.0067682 59.2689119,42.2938446 C64.9691547,18.8320097 97.2691503,33.3945151 103.483401,29.4375805 C104.841717,37.9514752 100.460508,44.816412 85.0571945,43.4891714 Z"
              id="Hair"
              fill={hairColor}
            />
          </G>
          <G
            id="Bottom/Standing/Baggy-Pants"
            transform="translate(0.000000, 199.000000)"
          >
            <Polygon
              id="Leg"
              fill={darken(skinColor)}
              points="139.748003 0 190.935026 129.55569 225.266375 239.084106 238.82308 239.084106 186.337993 5.30873359e-13"
            />
            <Path
              d="M129.440679,0 C128.89561,45.5267591 120.946508,106.821151 119.676509,109.659057 C118.829844,111.550995 89.6015778,135.610279 31.9917121,181.836909 L41.328982,191.828889 C109.303286,152.195353 144.863197,129.735517 148.008713,124.44938 C152.726988,116.520175 168.088064,43.5545895 180.420929,0 L129.440679,0 Z"
              id="Leg"
              fill={skinColor}
            />
            <G
              id="Accessories/Shoe/Flat-Sneaker"
              transform="translate(53.709121, 197.107258) rotate(50.000000) translate(-53.709121, -197.107258) translate(21.900806, 176.249347)"
              fill={shoeColor}
            >
              <Path
                d="M2.79301173,26.4915537 C1.62626761,29.6061473 1.04289555,31.9365831 1.04289555,33.4828611 C1.04289555,35.3635003 1.35619618,38.1078205 1.98279745,41.7158218 C4.16447086,41.7158218 23.7715371,41.7158218 60.8039962,41.7158218 C62.3325506,36.662479 61.4501804,33.9343419 58.1568854,33.5314103 C54.8635904,33.1284788 52.1277943,32.7646639 49.9494971,32.4399656 L22.6099678,20.2518671 C22.0839009,20.0173438 21.4673207,20.2536867 21.2327974,20.7797536 C21.2287854,20.7887531 21.2249011,20.7978091 21.2211457,20.8069187 L19.4637818,25.069848 C16.415052,26.4923128 13.9376425,27.2035452 12.0315534,27.2035452 C10.4829012,27.2035452 8.34419941,26.5780944 5.61544804,25.3271928 L5.61545374,25.3271803 C4.56828164,24.8471405 3.33023177,25.3068921 2.85019196,26.3540642 C2.82950154,26.3991988 2.81042931,26.4450579 2.79301173,26.4915537 Z"
                id="shoe"
              />
            </G>
            <G
              id="Accessories/Shoe/Flat-Sneaker"
              transform="translate(216.922274, 207.536214)"
              fill={shoeColor}
            >
              <Path
                d="M2.79301173,26.4915537 C1.62626761,29.6061473 1.04289555,31.9365831 1.04289555,33.4828611 C1.04289555,35.3635003 1.35619618,38.1078205 1.98279745,41.7158218 C4.16447086,41.7158218 23.7715371,41.7158218 60.8039962,41.7158218 C62.3325506,36.662479 61.4501804,33.9343419 58.1568854,33.5314103 C54.8635904,33.1284788 52.1277943,32.7646639 49.9494971,32.4399656 L22.6099678,20.2518671 C22.0839009,20.0173438 21.4673207,20.2536867 21.2327974,20.7797536 C21.2287854,20.7887531 21.2249011,20.7978091 21.2211457,20.8069187 L19.4637818,25.069848 C16.415052,26.4923128 13.9376425,27.2035452 12.0315534,27.2035452 C10.4829012,27.2035452 8.34419941,26.5780944 5.61544804,25.3271928 L5.61545374,25.3271803 C4.56828164,24.8471405 3.33023177,25.3068921 2.85019196,26.3540642 C2.82950154,26.3991988 2.81042931,26.4450579 2.79301173,26.4915537 Z"
                id="shoe"
              />
            </G>
            <Polygon
              id="Pant"
              fill={darken(pantColor)}
              points="174.163556 227.802687 238.619157 220.807401 190.849885 2.84217094e-14 133.119435 2.84217094e-14"
            />
            <Path
              d="M45.3241967,165.716602 L87.6032259,215.760447 C132.134816,167.123971 158.09685,135.388661 165.489326,120.554518 C172.881803,105.720376 179.527263,65.5355363 185.425707,0 L120.431644,0 C117.209615,57.6553062 115.037743,87.824451 113.916028,90.5074345 C112.794313,93.1904181 89.9303694,118.260141 45.3241967,165.716602 Z"
              id="Pant"
              fill={pantColor}
            />
          </G>
          <G id="Body/Turtle-Neck" transform="translate(18.000000, 87.000000)">
            <Path
              d="M215.842643,99.3934393 L246.49217,129.100665 C255.410052,132.880107 262.716986,137.053375 268.412972,141.620468 C269.693914,143.155624 271.088428,146.097061 265.06166,144.78081 C259.034891,143.464559 252.636055,142.34936 251.503335,144.296682 C250.370615,146.244004 253.708267,149.227994 251.61486,151.776537 C250.219255,153.475566 245.525726,148.071288 237.534274,135.563701 L205.66282,116.894141 L215.842643,99.3934393 Z M65.9665898,72.5073736 L89.6585889,72.5957155 C71.6140077,130.681228 62.0353652,161.093881 60.9226614,163.833676 C58.419078,169.998214 63.7169972,179.386698 65.9825978,184.432 C58.6036123,187.712603 59.3898511,175.56319 50.0814594,179.865884 C41.5851911,183.793184 35.122101,190.909188 25.3058907,184.891307 C24.0990453,184.151444 22.7765394,181.365726 25.9718809,179.188835 C33.9326418,173.765405 45.4045806,164.273426 46.9546202,161.149067 C49.0683761,156.888446 55.4056993,127.341215 65.9665898,72.5073736 Z"
              id="Skin"
              fill={skinColor}
            />
            <Path
              d="M132.865055,10.4717854 L142.046294,8.06805779 C161.23983,58.3490777 239.751407,86.8983751 246.068828,105.769722 C248.385593,112.690344 243.577552,116.711882 246.411036,118.633679 L235.067467,128.504669 C232.807937,126.30605 228.810689,131.039162 219.40216,128.796115 C209.993631,126.553069 138.206933,71.5297375 132.865055,10.4717854 Z"
              id="Clothes-Back"
              fill={darken(coatColor)}
              transform="translate(189.793847, 68.742070) rotate(5.000000) translate(-189.793847, -68.742070) "
            />
            <Path
              d="M153.898715,12.5739694 C152.804096,81.1364235 192.693437,98.6187072 183.810425,126.115312 C176.476389,148.817189 106.277582,173.221612 94.1301115,150.968414 C89.2129705,141.960603 86.9820435,131.066293 86.7289172,119.221825 C83.6242781,128.321491 81.1688535,136.155214 79.3626408,142.723 C76.2466712,154.05335 64.1667224,155.85436 64.1667224,160.219217 L48.2515603,155.85436 C49.3310483,149.92452 41.8282563,147.037041 43.8399505,133.789261 C52.8535717,74.4310965 77.0716324,31.4043191 116.494133,4.70892863 L116.914084,-1.21337093 C117.075731,-3.51012551 119.067603,-5.24162891 121.364502,-5.08204887 L121.364762,-5.08579408 L150.818111,-3.04324434 C153.116472,-2.88356274 154.850214,-0.890925613 154.690533,1.40743524 C154.690446,1.40868309 154.690359,1.40993089 154.690271,1.41117865 L153.898715,12.5739694 Z"
              id="Clothes-Front"
              fill={coatColor}
            />
          </G>
        </G>
      </G>
    </Svg>
  </Wrapper>
);

Standing5.propTypes = {
  height: PropTypes.number,
  skinColor: PropTypes.string,
  hairColor: PropTypes.string,
  shoeColor: PropTypes.string,
  coatColor: PropTypes.string,
  pantColor: PropTypes.string
};

Standing5.defaultProps = {
  height: 480,
  skinColor: '#57331F',
  hairColor: '#191847',
  shoeColor: '#E4E4E4',
  coatColor: '#89C5CC',
  pantColor: '#2F3676'
};

export default Standing5;
