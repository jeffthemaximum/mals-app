import React from 'react';
import PropTypes from 'prop-types';
import Svg, { G, Path } from 'react-native-svg';

import Wrapper from '../../common/wrapper/Wrapper';
import { darken } from '../../utils/colors';

const Standing24 = ({
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
        id="humaaans/standing-24"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <G id="humaaan-11" transform="translate(34.000000, 10.000000)">
          <G
            id="Head/Front/Wavy"
            transform="translate(128.159246, 70.924000) rotate(-15.000000) translate(-128.159246, -70.924000) translate(57.306980, 16.688000)"
          >
            <G
              id="Head"
              stroke-width="1"
              transform="translate(56.316359, 32.329762)"
              fill={skinColor}
            >
              <Path d="M8.61668863,35.9695996 C3.8111203,30.3288374 0.558611141,23.4160055 1.10210733,15.6699789 C2.66807119,-6.64848056 33.7361385,-1.73870383 39.7795208,9.52573796 C45.8229031,20.7901798 45.1047922,49.3633705 37.294259,51.3766405 C34.1794292,52.1795298 27.5439155,50.2127726 20.7905107,46.1421897 L25.0294931,76.1313749 L0,76.1313749 L8.61668863,35.9695996 Z" />
            </G>
            <Path
              d="M98.4588258,46.9132303 C98.2108966,45.4531246 97.6049729,43.8316931 97.1160642,42.450296 C96.4857355,40.669493 95.5318382,39.0638743 94.4820985,37.5506448 C92.5057758,34.7016799 90.134932,32.1289944 87.5172902,29.9937364 C82.7358434,26.0934883 76.6492929,23.8438098 70.6639184,24.5743957 C67.6418965,24.943242 64.7082824,26.0959757 62.2113728,28.0146519 C59.9554427,29.7481942 57.7854959,32.3000922 54.8643267,32.4834493 C51.6858541,32.6827969 48.7722811,29.8773615 46.2231674,28.1447075 C43.3490304,26.1913854 40.2914516,24.7680578 36.9322848,24.2147883 C31.3049045,23.2882306 26.0183866,25.1894949 22.1400876,29.8064705 C18.0130512,34.7196247 15.01301,41.9247433 17.7232616,48.4346326 C18.2270397,49.6447543 18.8751468,50.6649449 19.8052856,51.5104843 C20.6583304,52.2858434 21.9611712,53.1107729 22.3070439,54.3496773 C22.6744123,55.6665796 21.576994,57.3654759 21.1514413,58.5537439 C20.5418004,60.2561937 20.0412548,62.0432152 20.2192014,63.8936655 C20.511577,66.9325614 22.4213111,69.8335842 24.4378779,71.8309689 C26.4900018,73.8635326 29.0156802,75.0290586 31.7133252,75.5663377 C33.5146105,75.9250568 35.3554934,76.122983 37.1861941,75.9883079 C38.0949987,75.9215033 38.8969707,75.6690319 39.7774913,75.468263 C40.6337685,75.2730018 41.1123334,75.5004215 41.8388276,75.9700077 C45.2136718,78.1518156 48.8424254,78.9959336 52.7393111,78.6715052 C56.028172,78.3975355 59.8188715,77.6005005 62.5018088,75.3470909 C65.4813239,72.844408 65.4220083,69.3933138 64.7208889,65.706094 C65.463707,66.0742297 67.51874,66.3021824 66.2907305,64.8347922 C65.8042461,64.2536282 64.8850976,64.0171473 64.2609106,63.675307 C63.5340932,63.2773225 62.7961238,62.7629631 62.2317373,62.1137508 C59.9528568,59.4923833 62.2545261,54.1576142 65.1188041,53.2784949 C69.3743306,51.9724306 70.3270966,57.9907025 73.3649574,59.5474615 C75.1116143,60.4425713 76.9387593,59.2191243 78.2474185,57.9699149 C80.0003786,56.2964256 81.1950939,54.0794387 82.2265701,51.8233641 C83.0762208,49.9654516 83.8668792,48.0814214 84.7328538,46.2327478 C85.1372339,45.3694413 86.53721,42.9289434 85.8341511,41.9528154 C88.8821942,41.3450007 92.2770796,42.6116219 94.902156,44.2726742 C95.9871294,44.9593751 96.8143145,45.716434 97.3930855,46.9286877 C97.5170502,47.1884437 97.7869601,47.9606047 98.125883,47.9922302 C98.7568581,48.0512172 98.5210506,47.2801222 98.4588258,46.9132303"
              id="hair"
              fill={hairColor}
            />
          </G>
          <G
            id="Bottom/Standing/Skirt"
            transform="translate(0.000000, 210.685999)"
          >
            <Path
              d="M101.586187,102.295616 C126.604571,109.293289 148.189677,112.792125 166.341504,112.792125 C184.493332,112.792125 201.353588,107.403979 216.922274,96.6276864 C192.439509,89.4452121 172.276862,85.853975 156.434332,85.853975 C140.591802,85.853975 122.309087,91.3345218 101.586187,102.295616 Z"
              id="Skirt-Shadow"
              fill={darken(pantColor)}
            />
            <Path
              d="M187.99948,122.878466 C187.758243,122.515807 187.554518,122.121307 187.392927,121.693971 C184.048784,112.85015 130.483842,17.4429845 125.147466,0 L185.454034,0 C189.511357,13.2621474 207.77297,96.4884452 210.34298,113.093318 C218.451834,139.285707 235.147155,224.113293 237.278451,229.989889 C239.520537,236.171968 226.905062,242.612097 223.543335,235.011997 C218.194259,222.918955 205.449013,189.457725 199.774083,169.026532 C194.453849,149.872332 190.121757,132.64015 187.99948,122.878466 Z"
              id="Leg"
              fill={darken(skinColor)}
            />
            <Path
              d="M138.660328,134.526846 C114.171317,140.716304 24.5956785,151.90575 18.4486059,153.660786 C12.125186,155.466171 6.58075674,142.432186 14.3968452,139.608804 C26.8335617,135.116326 61.1023448,124.736264 81.8796319,120.500366 C98.5916235,117.093266 113.841521,114.313077 124.0799,112.685029 C123.212529,83.9253924 119.247551,14.906675 121.846375,1.42108547e-14 L175.206452,1.42108547e-14 C172.714354,14.294499 151.647559,118.595697 147.731994,129.035952 C146.489386,132.763194 142.781702,134.410359 138.660328,134.526846 Z"
              id="Leg"
              fill={skinColor}
            />
            <G
              id="Accessories/Shoe/Flat-Sneaker"
              transform="translate(25.550941, 163.734601) rotate(80.000000) translate(-25.550941, -163.734601) translate(-6.257373, 142.876690)"
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
            <Path
              d="M122.018779,4.4408921e-15 C145.532777,-6.72744704 167.781216,-6.72744704 188.764094,4.4408921e-15 C196.064363,33.3074433 213.80291,46.5271934 216.922274,97.5930449 C181.463825,115.211512 137.662212,85.0277506 101.160868,102.209302 C90.7319125,78.1766049 105.33245,20.2994592 122.018779,4.4408921e-15 Z"
              id="Skirt"
              fill={pantColor}
            />
          </G>
          <G
            id="Body/Pointing-Forward"
            transform="translate(155.249818, 199.734499) rotate(-10.000000) translate(-155.249818, -199.734499) translate(21.880847, 102.214000)"
          >
            <Path
              d="M165.442905,44.5318824 L201.641581,24.7060096 C207.6612,17.5576911 213.5922,12.0060203 219.434584,8.05099706 C221.219828,7.3056868 224.341768,6.85457179 221.422161,12.0365862 C218.502554,17.2186007 215.664619,22.8006078 217.152044,24.3970743 C218.639469,25.9935408 222.348496,23.7633475 224.122972,26.4158901 C225.305955,28.1842519 218.969376,30.9777657 205.113232,34.7964314 L178.810482,58.8794236 L165.442905,44.5318824 Z M222.136751,61.2595172 L238.037282,52.5246066 C240.268352,44.0351284 242.935323,39.7637848 246.038198,39.710576 C248.42185,38.6014863 244.270736,49.3287349 248.789387,48.3984698 C253.308038,47.4682047 264.336775,39.2657356 266.237082,40.9311468 C269.048462,43.3950152 266.541662,50.9605193 263.588057,54.7239524 C258.067772,61.7578043 253.497213,64.1631694 242.200369,67.3130095 C236.293796,68.9599085 229.907746,72.2609757 223.042218,77.2162112 L222.136751,61.2595172 Z"
              id="Skin"
              fill={skinColor}
            />
            <Path
              d="M148.985958,36.2409357 C161.529917,38.0920896 178.648308,38.0920896 198.258161,29.6037893 L202.784205,46.3173975 C188.561573,56.568277 169.692364,63.8528608 154.648576,61.0351451 C142.793241,58.8146299 138.988488,43.446554 148.985958,36.2409357 Z"
              id="Sleeve"
              fill={darken(coatColor)}
              transform="translate(173.014579, 45.624657) rotate(-9.000000) translate(-173.014579, -45.624657) "
            />
            <Path
              d="M164.886236,65.4534116 C178.34667,68.8103574 200.918985,64.8515908 232.603182,53.5771118 C240.462171,69.8359556 244.095185,81.4272642 243.502224,88.3510378 C216.321851,102.549013 193.025925,108.879165 173.833195,109.297052 C174.443114,120.685301 173.056959,131.521483 168.400445,141.422858 C158.827444,161.778405 102.772202,142.926899 83.9247117,146.637336 C72.1218592,108.306079 94.9430317,92.7284115 94.9613939,68.2018393 C94.9815025,41.3426291 116.548177,-1.42108547e-13 119.721281,-1.42108547e-13 L148.658242,1.26202713e-13 C150.254863,20.5127326 158.291104,43.1195412 164.886236,65.4534116 Z"
              id="Clothes"
              fill={coatColor}
            />
          </G>
        </G>
      </G>
    </Svg>
  </Wrapper>
);

Standing24.propTypes = {
  height: PropTypes.number,
  skinColor: PropTypes.string,
  hairColor: PropTypes.string,
  shoeColor: PropTypes.string,
  coatColor: PropTypes.string,
  pantColor: PropTypes.string
};

Standing24.defaultProps = {
  height: 480,
  skinColor: '#57331F',
  hairColor: '#191847',
  shoeColor: '#E4E4E4',
  coatColor: '#89C5CC',
  pantColor: '#2F3676'
};

export default Standing24;
