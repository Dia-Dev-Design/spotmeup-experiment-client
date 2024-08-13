import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SpotMeUpIcon from "./SpotMeUpIcon";
import { AuthContext } from "../../context/auth.context";

const NavBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav className="navbar-container">
      <div className="navbar-subcontainer">
        <div className="home-icon-container">
          <Link to="/">
            <svg
              width="28"
              height="32"
              viewBox="0 0 28 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="home-icon"
            >
              <path
                d="M2 30H9.384V18.232H18.616V30H26V12L14 2.92401L2 12V30ZM0 32V11L14 0.424011L28 11V32H16.616V20.232H11.384V32H0Z"
                fill="black"
              />
            </svg>
          </Link>

          <Link to="/" className="navlink">
            Home
          </Link>
        </div>

        <div className="promoters-link promoters-icon-container">
          <Link to="/myevents">
            <svg
              width="27"
              height="24"
              viewBox="0 0 27 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="promoters-icon"
            >
              <path
                d="M16.6502 4.70502e-05C16.5214 0.00109791 16.3906 0.0185935 16.2607 0.0533719C15.4295 0.275957 14.93 1.14076 15.1528 1.97181C15.3757 2.80288 16.2408 3.30231 17.0721 3.07973C17.9033 2.85715 18.4028 1.99235 18.18 1.16129C17.992 0.460081 17.3466 -0.00538552 16.6502 4.70502e-05ZM12.0626 0.552791C12.0004 0.554592 11.9393 0.57042 11.8841 0.599095C11.8288 0.62777 11.7807 0.668553 11.7434 0.718402C11.678 0.805707 11.6497 0.915316 11.6647 1.02338C11.6797 1.13144 11.7367 1.2292 11.8234 1.2954C12.4777 1.78927 12.8801 2.75495 12.9289 4.00173C12.9777 5.24852 12.6712 6.74882 11.9883 8.21923C11.5291 9.20796 10.9336 10.1047 10.2719 10.8254C9.76704 10.4041 9.28806 10.0419 8.85525 9.7522C8.39491 9.44402 7.98856 9.2147 7.63017 9.08471C7.45098 9.01972 7.28248 8.97787 7.10491 8.9748C6.92739 8.97183 6.71452 9.02023 6.55862 9.17602C6.55237 9.18274 6.54611 9.19009 6.53923 9.19703C6.53818 9.19812 6.53714 9.19922 6.5361 9.20032C6.44728 9.30018 6.39755 9.41817 6.37444 9.53564L4.00266 15.1738C4.00103 15.1777 3.99947 15.1817 3.99797 15.1857L1.98174 19.9793C1.97432 19.9945 1.96785 20.0102 1.96235 20.0262L0.531992 23.4267C0.500293 23.5025 0.491911 23.5861 0.507916 23.6668C0.52392 23.7474 0.563585 23.8215 0.62185 23.8795C0.680115 23.9375 0.754339 23.9768 0.835053 23.9924C0.915767 24.0081 0.999312 23.9993 1.07503 23.9673L6.33016 21.7596C6.34054 21.7556 6.35077 21.7513 6.36081 21.7466L12.479 19.176C12.4795 19.1757 12.4808 19.1755 12.4813 19.1752L14.9703 18.1295C15.0988 18.105 15.2291 18.05 15.3339 17.9452C15.4898 17.7894 15.5382 17.5764 15.5351 17.3989C15.532 17.2214 15.4903 17.0535 15.4252 16.8745C15.2951 16.5163 15.0653 16.1102 14.7569 15.6502C14.5504 15.3421 14.3064 15.0102 14.0312 14.6627C14.7587 13.9854 15.6706 13.3753 16.6794 12.9075C18.1508 12.225 19.6523 11.918 20.9001 11.9668C22.1479 12.0157 23.1123 12.4186 23.6064 13.0723C23.6393 13.1157 23.6804 13.1521 23.7274 13.1795C23.7743 13.207 23.8262 13.2249 23.8801 13.2322C23.934 13.2396 23.9888 13.2362 24.0414 13.2224C24.094 13.2085 24.1434 13.1845 24.1867 13.1515C24.2302 13.1189 24.267 13.078 24.2947 13.0311C24.3224 12.9843 24.3406 12.9324 24.3483 12.8785C24.356 12.8246 24.3529 12.7697 24.3393 12.717C24.3257 12.6643 24.3018 12.6148 24.2691 12.5713C23.568 11.6438 22.3409 11.1944 20.934 11.1393C19.5272 11.0843 17.9107 11.4233 16.3311 12.1559C15.2631 12.6513 14.2938 13.2904 13.5019 14.021C13.0696 13.5162 12.5824 12.9889 12.0505 12.4574C11.6622 12.0693 11.2758 11.7048 10.899 11.368C11.6194 10.5813 12.2493 9.62159 12.739 8.56715C13.4722 6.98852 13.8115 5.37349 13.7564 3.96742C13.7014 2.56134 13.2518 1.33621 12.3237 0.635603C12.2486 0.579027 12.1566 0.550088 12.0626 0.552791ZM16.6607 0.826729C16.9917 0.822038 17.2905 1.0389 17.3808 1.37544C17.4877 1.77429 17.2574 2.17354 16.8579 2.28051C16.4584 2.38749 16.059 2.15653 15.952 1.75767C15.8451 1.35882 16.0754 0.959568 16.4749 0.8526C16.5373 0.835931 16.5995 0.827605 16.6607 0.826729ZM9.31508 2.29425C9.26047 2.29403 9.20636 2.30463 9.15587 2.32542C9.10537 2.34622 9.0595 2.37681 9.02088 2.41542C8.98227 2.45404 8.95168 2.49991 8.93088 2.5504C8.91008 2.6009 8.89948 2.65501 8.89969 2.70962C8.89969 3.66774 8.13361 4.43492 7.17439 4.43492C7.11979 4.43471 7.06568 4.44531 7.01519 4.4661C6.9647 4.4869 6.91883 4.51749 6.88021 4.55611C6.8416 4.59472 6.81102 4.64059 6.79022 4.69108C6.76942 4.74157 6.75882 4.79568 6.75904 4.85029C6.75914 4.90469 6.76998 4.95853 6.79092 5.00874C6.81186 5.05895 6.8425 5.10454 6.88108 5.1429C6.91966 5.18125 6.96542 5.21162 7.01575 5.23227C7.06608 5.25292 7.11999 5.26344 7.17439 5.26322C8.13363 5.26324 8.89971 6.03042 8.89969 6.98853C8.89948 7.04314 8.91008 7.09725 8.93088 7.14774C8.95168 7.19823 8.98227 7.24411 9.02088 7.28272C9.0595 7.32133 9.10537 7.35192 9.15587 7.37272C9.20636 7.39352 9.26047 7.40411 9.31508 7.40389C9.36948 7.40382 9.42334 7.39302 9.47356 7.37211C9.52378 7.35119 9.56938 7.32058 9.60776 7.28203C9.64614 7.24347 9.67654 7.19772 9.69721 7.1474C9.71789 7.09708 9.72844 7.04318 9.72826 6.98878C9.72826 6.03066 10.4976 5.26347 11.4568 5.26347C11.5661 5.26305 11.6708 5.21938 11.748 5.14201C11.8253 5.06463 11.8687 4.95985 11.8689 4.85053C11.8691 4.7962 11.8587 4.74235 11.8381 4.69207C11.8175 4.64179 11.7872 4.59606 11.7489 4.55749C11.7106 4.51892 11.6651 4.48826 11.615 4.46727C11.5649 4.44628 11.5112 4.43537 11.4568 4.43515C10.4976 4.43514 9.72826 3.66796 9.72828 2.70985C9.7282 2.70344 9.72798 2.69702 9.7276 2.69062C9.72303 2.58427 9.67764 2.48378 9.60088 2.41004C9.52413 2.3363 9.42152 2.29456 9.31508 2.29425ZM9.31508 4.09956C9.51041 4.39831 9.7659 4.65443 10.065 4.84948C9.76582 5.04454 9.51046 5.30062 9.31508 5.5994C9.12011 5.30047 8.86395 5.04462 8.56514 4.84948C8.8639 4.65438 9.12009 4.39837 9.31508 4.09956ZM17.7299 4.10847C17.6205 4.10387 17.5138 4.14279 17.4331 4.2167C17.3523 4.29062 17.3042 4.39351 17.2992 4.50284C17.2992 4.50284 17.2454 5.74555 16.441 7.05888C15.6237 8.39313 14.5629 9.20925 14.5629 9.20925C14.4762 9.27544 14.4191 9.3732 14.4041 9.48126C14.3891 9.58932 14.4174 9.69893 14.4829 9.78623C14.5157 9.82957 14.5568 9.86599 14.6038 9.89343C14.6507 9.92087 14.7026 9.93877 14.7565 9.94613C14.8104 9.95348 14.8652 9.95014 14.9178 9.93629C14.9704 9.92245 15.0198 9.89836 15.0631 9.86542C15.0631 9.86542 16.2402 8.96903 17.1464 7.4896C18.0654 5.98921 18.1266 4.53921 18.1266 4.53921C18.1289 4.48486 18.1204 4.4306 18.1017 4.37953C18.083 4.32846 18.0544 4.28159 18.0175 4.24158C17.9807 4.20158 17.9363 4.16923 17.8869 4.1464C17.8376 4.12356 17.7842 4.11065 17.7299 4.10847ZM20.955 5.14688C20.9353 5.14683 20.9156 5.14818 20.896 5.15094C20.8766 5.15365 20.8575 5.15772 20.8386 5.16314C20.7527 5.18796 20.6771 5.23997 20.6232 5.31137C20.5693 5.38276 20.54 5.4697 20.5397 5.55916C20.5397 6.51728 19.7736 7.28528 18.8144 7.28527C18.7598 7.28505 18.7057 7.29565 18.6552 7.31645C18.6047 7.33725 18.5588 7.36784 18.5202 7.40645C18.4816 7.44507 18.451 7.49094 18.4302 7.54143C18.4094 7.59192 18.3988 7.64603 18.399 7.70063C18.3992 7.75497 18.4101 7.80873 18.4311 7.85885C18.4521 7.90897 18.4828 7.95447 18.5213 7.99274C18.5599 8.03101 18.6056 8.06132 18.6559 8.08192C18.7062 8.10252 18.76 8.11302 18.8143 8.11281C19.7736 8.11281 20.5396 8.87999 20.5396 9.83811C20.5394 9.89272 20.55 9.94683 20.5708 9.99732C20.5916 10.0478 20.6222 10.0937 20.6608 10.1323C20.6994 10.1709 20.7453 10.2015 20.7958 10.2223C20.8463 10.2431 20.9004 10.2537 20.955 10.2535C20.9617 10.2536 20.9684 10.2536 20.975 10.2534C20.9815 10.2529 20.988 10.2524 20.9944 10.2516C21.0011 10.2511 21.0077 10.2505 21.0143 10.2496C21.0207 10.2486 21.027 10.2474 21.0334 10.246C21.1079 10.2314 21.177 10.1965 21.233 10.1452C21.289 10.0939 21.3299 10.0281 21.351 9.95514C21.3532 9.9488 21.3553 9.94242 21.3572 9.93598C21.3648 9.90393 21.3684 9.8711 21.3682 9.83818C21.3682 8.88006 22.1383 8.11287 23.0972 8.11256C23.1515 8.11272 23.2054 8.10218 23.2556 8.08154C23.3059 8.0609 23.3516 8.03056 23.3901 7.99225C23.4287 7.95395 23.4593 7.90843 23.4802 7.85829C23.5012 7.80816 23.512 7.75438 23.5122 7.70005C23.5124 7.64544 23.5018 7.59133 23.481 7.54084C23.4602 7.49035 23.4296 7.44448 23.391 7.40586C23.3524 7.36725 23.3065 7.33666 23.256 7.31587C23.2055 7.29507 23.1514 7.28447 23.0968 7.28468C22.1376 7.28468 21.3675 6.51668 21.3675 5.55858C21.3671 5.4494 21.3235 5.34481 21.2463 5.26761C21.1691 5.19041 21.0642 5.1473 20.955 5.14688ZM20.9542 6.94895C21.1495 7.2477 21.4058 7.50384 21.7049 7.69888C21.4058 7.89394 21.1496 8.14998 20.9542 8.4488C20.7593 8.14993 20.5039 7.89399 20.2051 7.69888C20.5038 7.50381 20.7593 7.24781 20.9542 6.94895ZM25.3972 7.12512C25.2683 7.12617 25.1375 7.14287 25.0077 7.17765C24.1764 7.40024 23.6769 8.26503 23.8997 9.09609C24.1226 9.92715 24.9877 10.4274 25.819 10.2048C26.6502 9.98223 27.1497 9.11663 26.9269 8.28556C26.7389 7.58436 26.0935 7.1197 25.3972 7.12512ZM25.4081 7.95101C25.739 7.94631 26.0371 8.16318 26.1273 8.49971C26.2343 8.89855 26.0047 9.2978 25.6053 9.40478C25.2058 9.51174 24.8064 9.2816 24.6994 8.88274C24.5924 8.48389 24.8228 8.08464 25.2223 7.97767C25.2848 7.961 25.3467 7.95177 25.4081 7.95101ZM7.21607 9.83227C7.26079 9.84197 7.2844 9.83868 7.34946 9.86217C7.5991 9.95271 7.96563 10.1533 8.3927 10.4392C8.77755 10.6968 9.21337 11.0253 9.6776 11.4097C9.57282 11.501 9.46781 11.5884 9.36159 11.6707C9.27494 11.7379 9.21853 11.8368 9.20475 11.9456C9.19097 12.0544 9.22095 12.1642 9.28809 12.2509C9.32138 12.2939 9.36283 12.3299 9.41006 12.3569C9.4573 12.3839 9.50939 12.4013 9.56335 12.4081C9.61732 12.415 9.6721 12.4111 9.72457 12.3967C9.77703 12.3823 9.82615 12.3578 9.86911 12.3244C10.0189 12.208 10.1663 12.0842 10.3111 11.9535C10.6877 12.2885 11.0754 12.6533 11.4651 13.0428C12.0007 13.578 12.4906 14.1095 12.9189 14.6129C12.7977 14.7472 12.6828 14.885 12.5746 15.0242C12.5074 15.1109 12.4774 15.2207 12.4912 15.3295C12.505 15.4383 12.5614 15.5372 12.6481 15.6044C12.7344 15.6719 12.8439 15.7024 12.9527 15.6892C13.0615 15.6761 13.1606 15.6203 13.2283 15.5341C13.299 15.4435 13.3731 15.3529 13.4505 15.2634C13.6868 15.5652 13.8948 15.8509 14.0703 16.1127C14.3564 16.5395 14.5567 16.9057 14.6473 17.1552C14.6708 17.2195 14.6675 17.2448 14.6772 17.2893C14.6328 17.2796 14.6093 17.2801 14.5455 17.2569C14.2958 17.1664 13.9277 16.9683 13.5006 16.6824C12.6465 16.1106 11.5456 15.1905 10.4306 14.0762C9.31561 12.962 8.39505 11.8622 7.82288 11.0087C7.53678 10.5819 7.33893 10.2133 7.2483 9.96378C7.22484 9.89921 7.22576 9.87684 7.21607 9.83227ZM6.73525 10.8141C6.84769 11.019 6.98252 11.2372 7.13767 11.4687C7.75444 12.3888 8.69855 13.516 9.84483 14.6615C10.9911 15.807 12.1194 16.7507 13.0401 17.367C13.2711 17.5217 13.4885 17.6556 13.693 17.7679L12.3645 18.3263C10.8354 17.3216 9.08139 16.4508 7.22658 15.7791C6.47304 15.5062 5.71012 15.2704 4.94529 15.0704L6.73525 10.8141ZM19.5445 13.6441C19.4902 13.6439 19.4364 13.6545 19.3861 13.6751C19.3358 13.6958 19.2901 13.7261 19.2516 13.7644C19.2131 13.8027 19.1824 13.8482 19.1615 13.8984C19.1406 13.9485 19.1297 14.0023 19.1295 14.0566C19.1295 15.0147 18.3634 15.7819 17.4042 15.7819C17.3496 15.7817 17.2955 15.7923 17.245 15.8131C17.1945 15.8339 17.1486 15.8645 17.11 15.9031C17.0714 15.9417 17.0408 15.9876 17.02 16.0381C16.9992 16.0886 16.9886 16.1427 16.9888 16.1973C16.9889 16.2517 16.9998 16.3055 17.0207 16.3557C17.0417 16.406 17.0723 16.4515 17.1109 16.4899C17.1495 16.5283 17.1952 16.5586 17.2456 16.5793C17.2959 16.5999 17.3498 16.6104 17.4042 16.6102C18.3634 16.6102 19.1295 17.3806 19.1295 18.3388C19.1297 18.3931 19.1406 18.4469 19.1616 18.497C19.1826 18.5471 19.2132 18.5926 19.2518 18.6309C19.2904 18.6691 19.3361 18.6994 19.3864 18.72C19.4367 18.7406 19.4905 18.7511 19.5448 18.7509C19.654 18.7505 19.7586 18.7069 19.8358 18.6298C19.913 18.5526 19.9565 18.448 19.957 18.3388C19.957 17.3807 20.7271 16.6103 21.6863 16.6103C21.7407 16.6105 21.7946 16.6 21.845 16.5793C21.8953 16.5587 21.9411 16.5283 21.9796 16.4899C22.0182 16.4516 22.0489 16.406 22.0698 16.3558C22.0908 16.3056 22.1016 16.2517 22.1017 16.1973C22.1019 16.1143 22.0771 16.0331 22.0305 15.9644C21.984 15.8957 21.9178 15.8425 21.8407 15.8119C21.8345 15.8093 21.8283 15.8068 21.8221 15.8045C21.7971 15.7959 21.7714 15.7897 21.7453 15.7859C21.7385 15.7852 21.7317 15.7846 21.7249 15.7842C21.7121 15.7828 21.6991 15.7821 21.6862 15.7819C20.7269 15.7819 19.9568 15.0147 19.9568 14.0566C19.9564 13.9474 19.9128 13.8428 19.8356 13.7656C19.7584 13.6884 19.6537 13.6445 19.5445 13.6441ZM19.543 15.4462C19.7385 15.7454 19.9957 16.0009 20.2953 16.1961C19.9956 16.3916 19.7385 16.648 19.543 16.9476C19.3478 16.6482 19.0922 16.3916 18.793 16.1961C19.092 16.001 19.3479 15.7451 19.543 15.4462ZM4.6213 15.8397C5.39961 16.0396 6.17884 16.2794 6.94622 16.5573C8.554 17.1396 10.0829 17.8756 11.4393 18.715L6.17853 20.9243C5.94104 20.8298 5.70206 20.7374 5.46174 20.6504C4.6241 20.347 3.77436 20.0872 2.92429 19.8738L4.6213 15.8397ZM2.59943 20.6455C3.42531 20.8486 4.25178 21.099 5.06819 21.3906L1.6895 22.8096L2.59943 20.6455Z"
                fill="black"
              />
            </svg>
          </Link>

          <Link to={isLoggedIn ? "/myevents" : "/signup"} className="navlink">
            Promoters
          </Link>
        </div>
        <div className="about-link">
          <Link to="/about" className="navlink">
            About Us
          </Link>
        </div>
        <div className="profile-icon-container">
          <svg
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="profile-icon"
          >
            <path
              d="M32.1386 16.5657C32.1438 19.6567 31.2244 22.6786 29.4988 25.243C28.0757 27.3655 26.1515 29.1047 23.8964 30.3068C21.6413 31.5089 19.1248 32.1368 16.5693 32.135C14.0139 32.1368 11.4973 31.5089 9.24224 30.3068C6.98715 29.1047 5.06298 27.3655 3.63987 25.243C2.28487 23.2232 1.42193 20.914 1.12024 18.5005C0.818547 16.0871 1.08649 13.6365 1.90258 11.3453C2.71868 9.05406 4.06023 6.9859 5.81969 5.30659C7.57914 3.62729 9.70757 2.38356 12.0343 1.67511C14.3611 0.966654 16.8215 0.813183 19.2183 1.227C21.615 1.64081 23.8815 2.6104 25.836 4.05804C27.7905 5.50568 29.3787 7.3911 30.4732 9.56315C31.5677 11.7352 32.1381 14.1335 32.1386 16.5657Z"
              stroke="black"
            />
            <path
              d="M19.1642 11.376C19.1642 12.0642 18.8908 12.7242 18.4042 13.2108C17.9176 13.6975 17.2576 13.9708 16.5694 13.9708V15.7008C17.1373 15.7008 17.6997 15.5889 18.2244 15.3716C18.7491 15.1542 19.2259 14.8357 19.6275 14.4341C20.029 14.0325 20.3476 13.5557 20.565 13.031C20.7823 12.5063 20.8942 11.9439 20.8942 11.376H19.1642ZM16.5694 13.9708C15.8811 13.9708 15.2211 13.6975 14.7345 13.2108C14.2479 12.7242 13.9745 12.0642 13.9745 11.376H12.2445C12.2445 11.9439 12.3564 12.5063 12.5737 13.031C12.7911 13.5557 13.1097 14.0325 13.5112 14.4341C14.3223 15.2451 15.4223 15.7008 16.5694 15.7008V13.9708ZM13.9745 11.376C13.9745 10.6878 14.2479 10.0277 14.7345 9.5411C15.2211 9.05446 15.8811 8.78107 16.5694 8.78107V7.05115C15.4223 7.05115 14.3223 7.5068 13.5112 8.31786C12.7002 9.12891 12.2445 10.2289 12.2445 11.376H13.9745ZM16.5694 8.78107C17.2576 8.78107 17.9176 9.05446 18.4042 9.5411C18.8908 10.0277 19.1642 10.6878 19.1642 11.376H20.8942C20.8942 10.2289 20.4385 9.12891 19.6275 8.31786C18.8164 7.5068 17.7164 7.05115 16.5694 7.05115V8.78107ZM4.74705 26.6962L3.91668 26.4505L3.78348 26.902L4.08967 27.2601L4.74705 26.6962ZM28.3917 26.6962L29.049 27.2601L29.3552 26.902L29.2203 26.4505L28.3917 26.6962ZM11.3796 22.6205H21.7591V20.8905H11.3796V22.6205ZM11.3796 20.8905C9.70317 20.8908 8.0716 21.4321 6.72738 22.4338C5.38315 23.4355 4.39629 24.8442 3.91668 26.4505L5.57568 26.9436C5.9491 25.6944 6.71556 24.599 7.76117 23.8201C8.80679 23.0413 10.0758 22.6206 11.3796 22.6205V20.8905ZM16.5694 31.2701C14.4472 31.2724 12.3498 30.8142 10.4219 29.9271C8.49406 29.0401 6.78159 27.7453 5.40269 26.1322L4.08967 27.2601C5.63113 29.0623 7.54509 30.5087 9.69959 31.4996C11.8541 32.4906 14.1979 33.0025 16.5694 33V31.2701ZM21.7591 22.6205C23.0631 22.6207 24.3323 23.0417 25.3779 23.8208C26.4236 24.6 27.1899 25.6958 27.563 26.9453L29.2203 26.4505C28.7407 24.8442 27.7555 23.4355 26.4113 22.4338C25.0671 21.4321 23.4355 20.8908 21.7591 20.8905V22.6205ZM27.736 26.1322C26.3571 27.7453 24.6446 29.0401 22.7168 29.9271C20.7889 30.8142 18.6915 31.2724 16.5694 31.2701V33C18.9408 33.0025 21.2846 32.4906 23.4391 31.4996C25.5936 30.5087 27.5076 29.0623 29.049 27.2601L27.736 26.1322Z"
              fill="black"
            />
          </svg>

          <Link to="/profile" className="navlink">
            Profile
          </Link>
        </div>

        {/* <div>
          <Link to="/" className="navlink">
            Places
          </Link>
        </div> */}

        <div className="nav-img-container log-link">
          <Link to={isLoggedIn ? "/" : "/signup"} className="navlink-signup">
            {/* <div className="nav-user-img"></div> */}
            <h1 className="login-signup-navtext">
              {isLoggedIn ? "Log Out" : "Log In or Sign Up"}
            </h1>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
