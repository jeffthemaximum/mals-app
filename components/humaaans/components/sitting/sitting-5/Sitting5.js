import React from 'react';
import PropTypes from 'prop-types';
import Svg, { G, Path, Polygon } from 'react-native-svg';

import Wrapper from '../../common/wrapper/Wrapper';
import { darken } from '../../utils/colors';

const Sitting5 = ({
  className,
  height,
  skinColor,
  hairColor,
  hatColor,
  shoeColor,
  pantColor,
  coatColor,
  objectColor
}) => (
  <Wrapper className={className}>
    <Svg width={0.95 * height} height={height} viewBox="0 0 380 400">
      <G
        id="humaaans/sitting-5"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <G
          id="A-Human/Sitting"
          transform="translate(190.000000, 200.500000) scale(-1, 1) translate(-190.000000, -200.500000) translate(40.000000, 24.000000)"
        >
          <G
            id="Head/Front/Hijab-1"
            transform="translate(82.000000, 0.000000)"
            stroke-width="1"
          >
            <G
              id="Head"
              transform="translate(54.000000, 31.000000)"
              fill={skinColor}
            >
              <Path d="M8.26227388,34.4901268 C3.65436435,29.0813759 0.535634794,22.4528771 1.05677633,15.0254539 C2.55833022,-6.37502057 32.3485306,-1.66718886 38.1433414,9.13393292 C43.9381521,19.9350547 43.249578,47.3329958 35.7603014,49.2634576 C32.7735882,50.033323 26.4110012,48.1474609 19.935372,44.244306 L24,73 L0,73 L8.26227388,34.4901268 Z" />
            </G>
            <G id="Hijab" transform="translate(36.000000, 28.000000)">
              <Path
                d="M50.7350002,5.01147183 C50.1852708,4.68336774 49.0351409,3.99129844 48.4524743,3.74047035 C48.3145899,3.68011316 47.3491609,2.99135428 47.3231986,3.00008224 C46.5922497,3.24668063 44.475629,4.157139 44.2939574,4.94386372 C44.2657992,5.00348239 44.2381578,5.05940846 44.2112267,5.10828502 C43.9113039,5.65351385 43.6361163,6.21230459 43.373587,6.77787628 C42.7975078,8.01939475 42.3002198,9.31697358 41.8252774,10.6043474 C40.9001924,13.1115541 40.0965233,15.677171 39.3576307,18.2486288 C38.6053695,20.8663449 37.9669033,23.5146088 37.2521648,26.1431341 C36.2236827,29.9254283 34.9073547,33.6149377 33.8859767,37.3956877 C33.2337544,39.8097738 32.8709924,42.2521922 33.0422662,44.7368405 C33.0439454,44.7667169 33.0449141,44.7961906 33.0476266,44.826537 C33.0486599,44.8389576 33.0502099,44.8512438 33.0513078,44.8636644 C33.0804347,45.2456133 33.1219615,45.6285021 33.177309,46.0125322 C33.2257461,46.3409049 33.2743124,46.670486 33.3261079,47 C34.2590719,45.1396022 34.9713564,43.0896733 35.7272342,41.1440101 C35.8011816,40.9535392 35.8717061,40.7616583 35.940616,40.5691733 C36.1843517,40.1746025 36.4328666,39.7828514 36.6841585,39.3925774 C38.2688928,36.9315618 39.8598917,34.4796098 41.3795265,31.9740815 C44.1128024,27.4677025 46.8205682,22.8660544 50.061078,18.727928 C51.0179377,17.5059467 51.9970785,16.302697 52.9419258,15.0707121 C53.4795781,14.3696557 54.0032806,13.6568501 54.5099977,12.9313553 C54.872243,12.4125789 56.4471311,10.6043474 55.8768295,9.51791803 C55.585039,8.96205474 52.1610544,5.8627163 50.7350002,5.01147183 Z"
                id="Front"
                fill={hairColor}
              />
              <Path
                d="M48.6260171,3.83116599 C49.1606177,4.01081921 48.9005286,2.8983607 48.3827244,2.5068843 C45.9838484,0.693257683 36.8126531,0.035129961 28.8316831,1.69188377 C23.4851811,2.80175357 17.2670643,5.56416284 12.9966544,9.11545816 C9.14699464,12.3169592 6.49948445,17.4491331 5.13642247,22.407675 C3.70525344,27.6142408 3.48849539,33.0422873 4.28584125,38.381368 C4.46101123,39.5541291 4.83740954,40.6717368 5.04712657,41.8196221 C5.28329677,43.1122936 5.40444175,44.3568809 5.8254551,45.6145396 C6.08327479,46.3844871 6.52139715,47.1392958 6.74137959,47.9136449 C6.99248728,48.7972339 6.8394274,49.6146653 6.65629515,50.5133931 C6.35787446,51.9781941 5.98785913,53.4399939 5.46202016,54.8389709 C4.67237336,56.9397371 3.71413697,58.9072548 3.11334736,61.0872499 C2.31396158,63.9879079 -1.02991389,73.427136 1.41378875,76 L47.9323913,76 C46.761016,72.8047679 43.2449088,69.0442856 42.533108,65.623838 C42.1138713,63.608903 41.9144197,59.2085647 41.8705285,59.0486397 C40.8222264,51.8223372 38.7753261,48.3714635 37.4933414,47.1190983 C36.2113566,45.8667332 34.5038477,45.4816245 34.4158679,44.3952949 C34.0522355,39.9023228 35.8388772,35.5973526 37.1489671,31.4041565 C38.710362,26.4065336 39.854626,21.2849322 41.464321,16.3042488 C42.1771089,14.098711 45.8502346,2.8983607 48.6260171,3.83116599 Z"
                id="Turban"
                fill={hatColor}
              />
              <Path
                d="M32.3160356,9 C30.5618427,14.565951 30.1845546,17.5370354 30.5618427,25.1421085 L29.7013199,25.1421085 C28.0937737,17.9652054 29.5245027,11.2089071 31.2344582,9 L32.3160356,9 Z M8.78209035,23.3643083 C12.0510625,31.2963757 13.5415304,35.9803784 22.6701438,42.3991504 L21.9652448,42.892726 C12.9031248,37.7568562 10.2641419,31.6306096 8.09450288,23.6947526 L8.78209035,23.3643083 Z M22.2134556,15.2923054 C23.6982144,26.5510679 24.1316878,32.9820818 31.8664459,45.2976376 L31.0435239,45.5492301 C23.0831253,34.8261446 21.8212801,26.0740972 21.4451908,15.3541394 L22.2134556,15.2923054 Z M13.6694535,48.7363176 L14.373523,47.8804331 C23.9808594,50.889665 22.9106953,57.1023672 35.0112076,63.394114 L34,64.0068145 C23.4044272,59.6340646 20.9275677,50.2553327 13.6694535,48.7363176 Z"
                id="Shade"
                fill-opacity="0.2"
                fill="#000000"
              />
            </G>
          </G>
          <G
            id="Bottom/Sitting/Skinny-Jeans-1"
            transform="translate(0.000000, 187.000000)"
          >
            <G
              id="Objects/Seat/Cube"
              transform="translate(10.000000, 42.000000)"
              stroke-width="1"
            >
              <G id="Seat" transform="translate(55.000000, 0.000000)">
                <Polygon
                  id="Seat-Stuff"
                  fill={objectColor}
                  points="27.6226415 0 104.877193 0 115 124 0 124"
                />
                <Polygon
                  id="Seat-Stuff"
                  fill-opacity="0.1"
                  fill="#000000"
                  points="27.6226415 0 51.3828011 0 65.6037736 124 0 124"
                />
              </G>
            </G>
            <Path
              d="M257.953294,20.7561262 C266.190093,15.8101469 280.009488,22.164715 280,29.2384154 C279.971611,50.4029106 260.656682,150.1511 259.648224,156.456711 C258.639766,162.762321 247.83665,164.42787 247.20755,156.477375 C246.206544,143.826795 244.3468,100.033121 246.20755,79.7626522 C246.975628,71.3954284 247.802807,63.4267637 248.617148,56.3175946 C238.481902,74.6206031 222.807229,100.825998 201.593128,134.933778 L190.076573,129.672175 C199.120166,99.8760987 206.535776,78.8408618 212.323403,66.5664641 C222.233227,45.5497154 231.525307,27.551672 235.436043,21.2120072 C241.587634,11.2397104 252.295462,14.7191925 257.953294,20.7561262 Z"
              id="Skin"
              fill={skinColor}
            />
            <Path
              d="M208.819223,123.340112 L213.936922,21.8299349 C217.625361,4.27739957 248.84365,12.4235349 248.830812,21.8299349 C248.801666,43.1853748 235.973522,116.956762 235.964839,123.319261 L208.819223,123.340112 Z"
              id="LegLower"
              fill={darken(pantColor)}
              transform="translate(228.825019, 67.419630) rotate(20.000000) translate(-228.825019, -67.419630) "
            />
            <G
              id="Accessories/Shoe/Flat-Sneaker"
              transform="translate(215.500000, 133.000000) rotate(30.000000) translate(-215.500000, -133.000000) translate(185.000000, 113.000000)"
              fill={shoeColor}
            >
              <Path
                d="M2.67813181,25.4019242 C1.55937727,28.3884109 1,30.6229931 1,32.1056708 C1,33.908957 1.3004142,36.5404001 1.90124261,40 C3.99318117,40 22.7937852,40 58.3030548,40 C59.768738,35.1545073 58.9226607,32.5385816 55.7648228,32.1522232 C52.606985,31.7658647 49.9837155,31.4170139 47.8950143,31.1056708 L21.6799926,19.4188835 C21.1755635,19.1940064 20.584344,19.4206282 20.359467,19.9250573 C20.35562,19.9336867 20.3518954,19.9423702 20.3482945,19.9511052 L18.6632131,24.038695 C15.7398812,25.4026522 13.3643706,26.0846307 11.5366811,26.0846307 C10.0517269,26.0846307 8.00099246,25.4849054 5.38447792,24.2854549 L5.38448339,24.285443 C4.38038273,23.8251478 3.19325534,24.2659892 2.73296014,25.2700899 C2.71312074,25.3133681 2.69483298,25.3573409 2.67813181,25.4019242 Z"
                id="shoe"
              />
            </G>
            <G
              id="Accessories/Shoe/Flat-Sneaker"
              transform="translate(242.000000, 126.000000)"
              fill={shoeColor}
            >
              <Path
                d="M2.67813181,25.4019242 C1.55937727,28.3884109 1,30.6229931 1,32.1056708 C1,33.908957 1.3004142,36.5404001 1.90124261,40 C3.99318117,40 22.7937852,40 58.3030548,40 C59.768738,35.1545073 58.9226607,32.5385816 55.7648228,32.1522232 C52.606985,31.7658647 49.9837155,31.4170139 47.8950143,31.1056708 L21.6799926,19.4188835 C21.1755635,19.1940064 20.584344,19.4206282 20.359467,19.9250573 C20.35562,19.9336867 20.3518954,19.9423702 20.3482945,19.9511052 L18.6632131,24.038695 C15.7398812,25.4026522 13.3643706,26.0846307 11.5366811,26.0846307 C10.0517269,26.0846307 8.00099246,25.4849054 5.38447792,24.2854549 L5.38448339,24.285443 C4.38038273,23.8251478 3.19325534,24.2659892 2.73296014,25.2700899 C2.71312074,25.3133681 2.69483298,25.3573409 2.67813181,25.4019242 Z"
                id="shoe"
              />
            </G>
            <Path
              d="M282.770373,36.4330278 C282.770373,63 270.1536,124.970293 270.145616,130.820112 L243,130.840963 C246.973277,75.5454811 248.382172,47.5998928 247.226683,47.0041979 C245.49345,46.1106556 176.175838,53.9250306 155.386358,53.9250306 C125.407825,53.9250306 113.006307,35.0203971 112,-4.40536496e-13 L171.386358,-4.40536496e-13 C183.477954,1.29386693 246.548825,14.0152568 269.972097,18.3884129 C280,20.2606358 282.770373,29.1145109 282.770373,36.4330278 Z"
              id="Leg-and-Butt"
              fill={pantColor}
            />
          </G>
          <G id="Body/Turtle-Neck" transform="translate(22.000000, 82.000000)">
            <Path
              d="M199.493124,92.4603344 L227.821028,120.095357 C236.063404,123.611168 242.816857,127.493333 248.081387,131.741853 C249.265301,133.169925 250.554184,135.906184 244.983927,134.681747 C239.413671,133.45731 233.49953,132.419902 232.45261,134.23139 C231.405691,136.042878 234.490525,138.818722 232.555688,141.189494 C231.265796,142.770009 226.92779,137.742701 219.54167,126.10757 L190.084396,108.74029 L199.493124,92.4603344 Z M60.9697919,67.4496834 L82.8671837,67.5318631 C66.1894326,121.56567 57.3363474,149.856914 56.3079281,152.405597 C53.9939846,158.140133 58.8906002,166.873732 60.9845874,171.567103 C54.1645409,174.61887 54.8912241,163.316929 46.2879189,167.319492 C38.4352209,170.972846 32.4616931,177.59248 23.3890352,171.994371 C22.2736052,171.306117 21.0512757,168.714714 24.0045784,166.68967 C31.3623323,161.644547 41.9653015,152.814672 43.3979297,149.908251 C45.3515741,145.944826 51.2088615,118.458637 60.9697919,67.4496834 Z"
              id="Skin"
              fill={skinColor}
            />
            <Path
              d="M122.768272,9.7139848 L131.253224,7.48281413 C149.019938,54.2642227 221.602897,80.8616426 227.451896,98.4190631 C229.596879,104.857833 225.154909,108.596168 227.774893,110.385298 L217.29519,119.561394 C215.205566,117.515062 211.513381,121.915723 202.815928,119.824345 C194.118475,117.732967 127.737533,66.5128914 122.768272,9.7139848 Z"
              id="Clothes-Back"
              fill={darken(coatColor)}
              transform="translate(175.413267, 63.943241) rotate(5.000000) translate(-175.413267, -63.943241) "
            />
            <Path
              d="M142.240708,11.7336597 C141.243756,75.4830742 178.095832,91.7445602 169.887262,117.318245 C163.108761,138.436573 98.2273311,161.138686 87,140.43774 C82.4553197,132.058262 80.3933796,121.923875 80.1594269,110.905608 C77.2899563,119.370535 75.0205237,126.657823 73.3511268,132.767479 C70.4711839,143.30749 59.3062598,144.982871 59.3062598,149.043262 L44.5966299,144.982871 C45.5943495,139.466662 38.6598745,136.780597 40.5191881,124.456905 C48.8500046,69.239525 71.2334081,29.2141817 107.669398,4.38087468 L108.046347,-1.0097438 C108.200449,-3.21350145 110.111872,-4.87507585 112.315629,-4.72097411 L139.249859,-2.83754931 C141.453616,-2.68344757 143.115191,-0.772024866 142.961089,1.43173278 L142.240708,11.7336597 Z"
              id="Clothes-Front"
              fill={coatColor}
            />
          </G>
        </G>
      </G>
    </Svg>
  </Wrapper>
);

Sitting5.propTypes = {
  height: PropTypes.number,
  skinColor: PropTypes.string,
  hairColor: PropTypes.string,
  hatColor: PropTypes.string,
  shoeColor: PropTypes.string,
  coatColor: PropTypes.string,
  pantColor: PropTypes.string,
  objectColor: PropTypes.string
};

Sitting5.defaultProps = {
  height: 400,
  skinColor: '#57331F',
  hairColor: '#191847',
  hatColor: '#2C2C2C',
  shoeColor: '#E4E4E4',
  coatColor: '#FF4133',
  pantColor: '#2F3676',
  objectColor: '#C5CFD6'
};

export default Sitting5;
