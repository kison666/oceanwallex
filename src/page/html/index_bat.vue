<template>
    <section style="height: 100%">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0">
            <defs>
                <symbol viewBox="0 0 1024 1024" id="wallet" class="icon">
                    <path d="M959.104 852.673v0.005c0 58.886-47.734 106.62-106.615 106.62l-0.005 0.006H170.09c-0.005 0-0.005-0.006-0.01-0.006-58.88 0-106.615-47.734-106.615-106.624V212.932c0-47.108 38.189-85.297 85.303-85.297h344.83l87.397-62.575c10.956-3.976 23.066 1.656 27.052 12.573l18.181 50h162.287c47.104 0 85.293 38.19 85.293 85.303v63.972h0.005c47.108 0 85.297 38.188 85.297 85.301l-0.006 490.464z m-810.336-682.39h-0.005c-23.555 0-42.65 40.42-42.65 63.975s19.095 42.65 42.655 42.65h30.817-21.326 4.039c0.274-0.113 0.45-0.343 0.733-0.45l255.506-106.175h-269.77z m449.475 3.85l-22.64-62.354-0.03 21.336-0.005-0.005-75.954 37.173h-0.19L264.008 276.91h385.173l-50.938-102.776z m232.92 38.804c0-23.559-19.1-42.654-42.649-42.654H641.737l52.335 106.625h137.091v-63.971z m42.649 106.625H148.768c-0.01 0-0.01-0.01-0.016-0.01-15.616 0-30.05-4.503-42.639-11.826v544.952c0 35.332 28.646 63.97 63.977 63.97h682.39c35.337 0 63.975-28.64 63.975-63.97V703.4h-85.298c-47.108 0-85.297-38.183-85.297-85.297 0-47.104 38.189-85.298 85.297-85.298h85.298V362.209c0-23.557-19.094-42.647-42.643-42.647z m42.643 341.19v-85.298h-85.298c-23.554 0-42.648 19.094-42.648 42.649 0 23.56 19.094 42.649 42.648 42.649h85.298z m-85.298-63.975h42.65v42.648h-42.65v-42.648z m0 0" fill="#00BCF1" p-id="644"></path>
                </symbol>
                <symbol viewBox="0 0 1024 1024" id="loan" class="icon">
                    <path d="M1014.740102 650.179083c-19.454074-44.711318-78.403674-44.38386-111.200638-36.895305l-151.336754 40.801265c-15.344476-39.245839-57.515948-54.720276-88.040149-55.038524L27.101241 599.046518l-0.008186 0.001023-0.008186-0.001023c-14.59951 0-26.444279 11.844769-26.444279 26.444279l0 235.503688c0 11.517311 7.437389 21.693068 18.404162 25.187659 173.782975 55.402821 383.117654 116.417453 513.119497 116.417453 15.081487 0 29.130458-0.826831 41.888016-2.565429 82.863243-13.308097 354.658486-182.166923 407.53067-225.467101C1020.661975 742.510978 1033.677407 693.684946 1014.740102 650.179083zM948.060447 733.661426c-53.543474 43.850717-315.491441 203.412806-381.775076 214.052121-109.083417 14.926968-340.386434-51.54598-512.757247-106.070804L53.528124 651.935076l610.357122 0c6.904247 0.068562 41.35385 2.100848 41.35385 35.069727 0 10.726296-3.976568 15.942087-6.990205 18.920932-11.896958 11.862165-37.032428 14.44499-46.484707 14.44499l-227.876987 11.793604c-14.59951 0.757247-25.807782 13.187347-25.049512 27.770484 0.723477 14.134929 12.412704 25.084305 26.393113 25.084305 0.447185 0 0.912789-0.017396 1.37737-0.034792l226.155786-11.758812c5.14723-0.034792 52.699246-0.103354 82.553181-29.560246 9.994632-9.856485 16.519232-22.039969 19.949354-35.629475l161.046906-43.428092c14.909571-3.408633 45.228087-4.13211 49.944506 6.680143C973.609333 688.192861 972.680171 713.449082 948.060447 733.661426z" p-id="1333" fill="#00BCF1"></path>
                    <path d="M140.53985 404.37991l618.914008 0c14.59951 0 26.444279-11.844769 26.444279-26.444279L785.898137 47.844681c0-14.59951-11.844769-26.444279-26.444279-26.444279L140.53985 21.400403c-14.59951 0-26.444279 11.844769-26.444279 26.444279l0 330.09095C114.095571 392.535141 125.94034 404.37991 140.53985 404.37991zM166.984129 74.28896l566.025451 0 0 277.202393L166.984129 351.491353 166.984129 74.28896z" p-id="1334" fill="#00BCF1"></path>
                    <path d="M237.881852 501.721913c0 14.59951 11.844769 26.444279 26.444279 26.444279l618.914008 0c14.59951 0 26.444279-11.844769 26.444279-26.444279L909.684418 171.630962c0-14.59951-11.844769-26.444279-26.444279-26.444279-14.59951 0-26.444279 11.844769-26.444279 26.444279L856.79586 475.277634 264.326131 475.277634C249.726621 475.277634 237.881852 487.122403 237.881852 501.721913z" p-id="1335" fill="#00BCF1"></path>
                    <path d="M450.006064 114.230648c-54.404074 0-98.649787 44.246737-98.649787 98.649787s44.246737 98.649787 98.649787 98.649787 98.649787-44.246737 98.649787-98.649787S504.410138 114.230648 450.006064 114.230648zM450.006064 258.642688c-25.238824 0-45.76123-20.522406-45.76123-45.76123s20.522406-45.76123 45.76123-45.76123 45.76123 20.522406 45.76123 45.76123S475.244888 258.642688 450.006064 258.642688z" p-id="1336" fill="#00BCF1"></path>
                </symbol>
                <symbol viewBox="0 0 1024 1024" id="crossborder" class="icon">
                    <path d="M956.8 334.08c-8.96 0-16 7.04-16 16L940.8 723.2c0 17.28-8.96 33.28-24.32 41.6L544 977.92c-14.72 8.32-32.64 8.32-47.36 0L123.52 764.8c-14.72-8.32-24.32-24.32-24.32-41.6l0-424.96c0-17.28 8.96-33.28 24.32-41.6l372.48-213.12c14.72-8.32 32.64-8.32 47.36 0l334.72 191.36c7.68 4.48 17.28 1.92 21.76-5.76 4.48-7.68 1.92-17.28-5.76-21.76l-334.72-191.36c-24.32-14.08-55.04-14.08-79.36 0L107.52 228.48c-24.96 14.08-40.32 40.96-40.32 69.76L67.2 723.2c0 28.8 15.36 55.04 40.32 69.76L480 1005.44c12.16 7.04 26.24 10.24 39.68 10.24 13.44 0 27.52-3.2 39.68-10.24l373.12-213.12c24.96-14.08 40.32-40.96 40.32-69.76l0-372.48C972.8 341.76 965.76 334.08 956.8 334.08z" p-id="1107" fill="#00BCF1"></path>
                    <path d="M547.2 275.2 544 275.2c-8.96-1.28-17.92-1.92-26.88-1.92-126.72 0-229.76 103.04-229.76 229.76s103.04 229.76 229.76 229.76c126.72 0 229.76-103.04 229.76-229.76 0-112-80.64-205.44-186.24-225.28C556.8 275.84 552.32 275.2 547.2 275.2zM320 503.04c0-13.44 1.28-26.88 3.84-39.68 8.32 16 19.84 37.76 28.16 48.64 39.68 55.68 96 62.72 96 62.72s-7.68 26.88 0 41.6 22.4 25.6 41.6 25.6c1.28 0 2.56 0 4.48-0.64 0 0.64 0 0.64 0 1.28L494.08 697.6c0 0.64 0 1.28 0 1.92C396.16 687.36 320 604.16 320 503.04zM585.6 356.48l0-39.04c75.52 27.52 129.28 100.48 129.28 185.6 0 58.24-25.6 110.72-65.92 147.2l0-8.32c0-22.4-18.56-40.96-40.96-40.96l-23.04 0L584.96 528c0 0 4.48-21.12-16-22.4l-147.2-2.56 0-43.52 33.92 0c21.12 0 38.4-17.28 38.4-38.4l0-27.52c3.2 0.64 6.4 1.28 9.6 1.28l42.88 0C568.32 394.88 585.6 377.6 585.6 356.48z" p-id="1108" fill="#00BCF1"></path>
                </symbol>
                <symbol viewBox="0 0 1024 1024" id="transfer" class="icon">
                    <path d="M894.780952 48.761905C938.666667 48.761905 975.238095 85.333333 975.238095 129.219048l0 765.561905c0 43.885714-36.571429 80.457143-80.457143 80.457143L129.219048 975.238095C85.333333 975.238095 48.761905 938.666667 48.761905 894.780952L48.761905 129.219048C48.761905 85.333333 85.333333 48.761905 129.219048 48.761905L894.780952 48.761905M894.780952 0 129.219048 0C58.514286 0 0 58.514286 0 129.219048l0 765.561905C0 965.485714 58.514286 1024 129.219048 1024l765.561905 0c70.704762 0 129.219048-58.514286 129.219048-129.219048L1024 129.219048C1021.561905 58.514286 963.047619 0 894.780952 0L894.780952 0z" p-id="1566" fill="#00BCF1"></path>
                    <path d="M748.495238 385.219048 351.085714 385.219048l90.209524-90.209524c7.314286-7.314286 7.314286-17.066667 0-21.942857l-21.942857-21.942857c-2.438095-7.314286-17.066667-7.314286-21.942857 0l-134.095238 134.095238c-2.438095 2.438095-4.87619 4.87619-4.87619 9.752381-2.438095 2.438095-2.438095 4.87619-2.438095 7.314286l0 31.695238c0 9.752381 7.314286 17.066667 17.066667 17.066667l480.304762 0c9.752381 0 17.066667-7.314286 17.066667-17.066667l0-31.695238C765.561905 390.095238 758.247619 385.219048 748.495238 385.219048z" p-id="1567" fill="#00BCF1"></path>
                    <path d="M753.371429 512 273.066667 512c-9.752381 0-17.066667 7.314286-17.066667 12.190476l0 31.695238c0 9.752381 0 19.504762 31.695238 19.504762l375.466667 0-80.457143 78.019048c-7.314286 7.314286-7.314286 17.066667 0 21.942857l21.942857 21.942857c7.314286 7.314286 17.066667 7.314286 21.942857 0l131.657143-124.342857c9.752381-4.87619 9.752381-12.190476 9.752381-14.628571l0-31.695238C765.561905 519.314286 758.247619 512 753.371429 512z" p-id="1568" fill="#00BCF1"></path>
                </symbol>
                <symbol viewBox="0 0 1024 1024" id="lowcost" class="icon">
                    <path d="M507.52 220.8c-3.2-3.84-7.68-6.4-12.8-6.4L326.4 213.12c0 0 0 0 0 0-7.04 0-13.44 4.48-15.36 11.52l-49.28 161.28c-1.28 5.12-0.64 10.24 2.56 14.08l282.88 385.28c3.2 4.48 7.68 6.4 12.8 6.4 3.2 0 6.4-1.28 9.6-3.2l217.6-160c3.2-2.56 5.76-6.4 6.4-10.24 0.64-4.48-0.64-8.32-3.2-12.16L507.52 220.8zM563.2 752.64l-268.8-365.44 43.52-142.08 148.48 0.64 268.8 365.44L563.2 752.64z" p-id="3251" fill="#ffffff"></path>
                    <path d="M392.32 271.36c-22.4 0-40.96 18.56-40.96 40.96 0 22.4 18.56 40.96 40.96 40.96 22.4 0 40.96-18.56 40.96-40.96C433.28 289.92 414.72 271.36 392.32 271.36zM392.32 334.08c-12.16 0-21.76-9.6-21.76-21.76s9.6-21.76 21.76-21.76 21.76 9.6 21.76 21.76S404.48 334.08 392.32 334.08z" p-id="3252" fill="#ffffff"></path>
                </symbol>
                <symbol viewBox="0 0 1024 1024" id="speed" class="icon">
                    <path d="M956.258153 102.763478c-1.602498-18.972097-16.718777-33.983999-35.69906-35.45449-245.245564-19.079544-421.889703 99.614765-531.024286 249.522983-60.316737-19.761066-125.069507-12.719696-184.119391 20.551058-56.879452 32.039717-105.327884 86.024236-136.417973 152.010089-7.122211 15.111163-3.784186 33.087583 8.292873 44.633546 12.07706 11.550057 30.189579 14.077623 44.958958 6.282077 62.190411-32.788777 132.213207-26.615171 174.260859 15.377222L467.734844 726.724433c0.309038 0.331551 0.523933 0.713244 0.847298 1.035586 42.009789 41.964764 48.193629 111.87602 15.386432 173.958984-7.804756 14.770402-5.291516 32.878828 6.244214 44.966121 7.501858 7.855922 17.71957 12.023848 28.108175 12.023848 5.590322 0 11.228739-1.204431 16.520255-3.689019 66.049299-31.058366 120.088052-79.456656 152.164608-136.276756 33.506115-59.353806 40.470737-124.474966 20.247136-185.05674 44.042075-31.610952 83.466993-67.240427 116.585275-105.894795C925.505755 409.124981 970.06153 266.125103 956.258153 102.763478zM195.549721 441.832917c41.322128-41.259706 94.360088-65.905012 149.610436-56.208163-15.216563 26.822902-28.426423 54.078663-39.702234 81.269955C272.395924 449.098391 234.561223 440.446337 195.549721 441.832917zM582.454632 828.592518c1.366114-39.392172-7.458879-77.511351-25.589818-110.74629 28.201296-11.960403 55.491849-25.467021 81.675184-40.294728C648.995117 733.307362 624.206548 786.915303 582.454632 828.592518zM505.637082 654.779867 368.719736 518.009877c68.61882-183.799096 239.044328-380.192022 512.044002-374.880039C889.938702 468.467531 621.320824 609.381911 505.637082 654.779867zM756.591671 267.765463c11.750625 11.754718 18.450211 28.066219 18.450211 44.672432 0 16.60519-6.699586 32.82664-18.450211 44.576241-11.749602 11.750625-28.065196 18.545378-44.670385 18.545378-16.60519 0-32.8205-6.794753-44.570101-18.545378-11.749602-11.750625-18.549471-27.972075-18.549471-44.576241 0-16.606213 6.79987-32.917714 18.549471-44.672432 11.649318-11.750625 27.964912-18.450211 44.570101-18.450211C728.527498 249.315252 744.843092 256.014838 756.591671 267.765463zM209.751165 671.104671c-44.641733 44.600801-46.391587 133.923152-46.291302 151.249773 0.127913 21.275559 17.339924 39.245839 38.615483 39.245839 0.38374 0 0.801249 0 1.25662 0 19.999496 0 105.826234-3.267417 149.471266-46.858214 27.557636-27.53103 33.343409-55.616692 33.343409-74.066903-0.005117-25.856901-11.104919-51.343365-31.270191-71.486124C305.714773 620.088764 245.193375 635.703393 209.751165 671.104671zM297.900807 759.148913c-9.564843 9.55461-31.048133 16.050558-52.977585 19.753903 3.797489-22.115694 10.42135-43.533492 19.730367-52.832276 6.344498-6.335289 12.389168-10.574846 18.942421-10.574846 5.039783 0 10.379395 2.508123 16.382109 8.501628 5.3918 5.386684 8.482185 11.351536 8.482185 16.367783C308.460304 747.176231 302.713416 754.341421 297.900807 759.148913z" p-id="2116" fill="#ffffff"></path>
                </symbol>
                <symbol viewBox="0 0 1024 1024" id="local" class="icon">
                    <path d="M664.343687 328.875263c0-82.751702-67.313082-150.073994-150.051481-150.073994-82.744539 0-150.062737 67.322291-150.062737 150.073994 0 82.73226 67.318198 150.039201 150.062737 150.039201C597.030605 478.914464 664.343687 411.607522 664.343687 328.875263zM404.243811 328.875263c0-60.686151 49.366338-110.058628 110.048395-110.058628 60.673871 0 110.036116 49.372477 110.036116 110.058628 0 60.667731-49.362244 110.024859-110.036116 110.024859C453.610148 438.899098 404.243811 389.542994 404.243811 328.875263zM854.769714 740.802056c-45.598524-17.971303-105.630782-31.79924-175.007873-40.427758 71.163783-117.373221 120.31318-251.488755 120.31318-347.248725 0-154.791435-128.627543-280.723589-286.730397-280.723589S226.615251 198.333114 226.615251 353.12455c0 70.542636 28.17162 168.121022 77.29134 267.715321 13.411451 27.192316 28.02017 53.784974 43.474141 79.3093-70.082148 8.607028-130.701784 22.511713-176.680978 40.619116-61.159942 24.089651-92.171236 53.972239-92.171236 88.820931 0 42.140773 46.952358 77.92272 135.780453 103.476723 79.973426 23.006993 185.940876 35.677571 298.386878 35.677571 112.442932 0 218.411405-12.670577 298.385854-35.677571 88.829118-25.555026 135.780453-61.33595 135.780453-103.476723C946.861132 794.755876 915.877467 764.883521 854.769714 740.802056zM266.630616 353.12455c0-132.726907 110.674659-240.708224 246.712985-240.708224s246.715031 107.981317 246.715031 240.708224c0 94.172823-54.260811 233.262648-129.251759 349.664751-1.7519 1.815345-3.169179 3.964288-4.140297 6.361895-33.43653 51.011814-70.787206 97.368608-109.181655 133.234467l-1.088798 1.095961c-0.578168 0.633427-1.578961 1.385557-3.053546 1.385557-1.488911 0-2.485611-0.765433-3.059686-1.411139l-1.248434-1.280156C382.169049 723.295334 266.630616 490.196415 266.630616 353.12455zM800.018739 894.610094c-76.476789 22.002107-178.517813 34.118052-287.322891 34.118052-108.807125 0-210.846102-12.115945-287.323914-34.118052-78.850859-22.682605-106.828051-49.202609-106.828051-65.020876 0-27.437909 78.523401-73.447802 252.695233-91.89392 34.644031 51.954279 72.376401 97.909937 109.87341 133.151579 8.345062 8.933463 20.033265 14.034645 32.231075 14.034645 12.023848 0 23.614837-4.986571 31.94148-13.70821 39.065737-36.579103 76.732615-82.664721 110.585631-133.293819 172.969447 18.568914 250.975055 64.373123 250.975055 91.709725C906.845767 845.408509 878.868575 871.927489 800.018739 894.610094z" p-id="2972" fill="#ffffff"></path>
                </symbol>
            </defs>
        </svg>
        <section class="banner-block">
            <header-static :solutions="solutions" :fixedTop="true"></header-static>
            <section class="banner-bg">
            </section>
            <section class="banner-cover">
                    <p><span>Financial solutions for people in Asean</span></p>
                </div>
            </section>
        </section>
        <section class="xbt-block whatwedo">
            <div class="container">
                <div class="xbt-title">What We Do</div>
                <div class="xbt-content" style="margin-top: 50px">
                    <div class="row">
                        <div class="col-md-3 col-xs-12 xbt-col">
                            <p class="xbt-icon">
                                <svg fill="#bbb">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#wallet"></use>
                                </svg>
                            </p>
                            <p class="xbt-title">Digital Wallet</p>
                            <p class="xbt-sub-title">Easy to use app</p>
                            <p class="xbt-sub-title">Linkage between fiat money and cryptocurrency</p>
                        </div>
                        <div class="col-md-3 col-xs-12 xbt-col">
                            <p class="xbt-icon">
                                <svg fill="#bbb">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#loan"></use>
                                </svg>
                            </p>
                            <p class="xbt-title">Remittance</p>
                            <p class="xbt-sub-title">P2P transter within country</p>
                            <p class="xbt-sub-title">Expanding network of agents</p>
                        </div>
                        <div class="col-md-3 col-xs-12 xbt-col">
                            <p class="xbt-icon">
                                <svg fill="#bbb">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#crossborder"></use>
                                </svg>
                            </p>
                            <p class="xbt-title">Cross border Payment</p>
                            <p class="xbt-sub-title">Real for exchange rate</p>
                            <p class="xbt-sub-title">Fast and regulated transfer between countries</p>
                        </div>
                        <div class="col-md-3 col-xs-12 xbt-col">
                            <p class="xbt-icon">
                                <svg fill="#bbb">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#transfer"></use>
                                </svg>
                            </p>
                            <p class="xbt-title">Mirco Financial</p>
                            <p class="xbt-sub-title">Credit for advanced speeding</p>
                            <p class="xbt-sub-title">Available for approved customers via out digital wallet</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="xbt-block advantage" style="background-image: url(http://od60al7id.bkt.clouddn.com/ocean/imagefluent-blue.png);">
            <div class="container">
                <div class="xbt-nav" style="width: 100%;margin: auto;text-align: center;">
                    <ul class="xbt-ul">
                        <li class="width20" @click="activeCharacter=0">
                            <div class="xbt-item" :class="{xbt_active:activeCharacter==0}"><a>Low cost</a></div>
                        </li>
                        <li class="width60p">
                            <div class="divsvg"></div>
                        </li>
                        <li class="width20l" @click="activeCharacter=1">
                            <div class="xbt-item" :class="{xbt_active:activeCharacter==1}"><a>High speed</a></div>
                        </li>
                        <li class="width60p">
                            <div class="divsvg"></div>
                        </li>
                        <li class="width30" @click="activeCharacter=2">
                            <div class="xbt-item" :class="{xbt_active:activeCharacter==2}"><a>Local knowledge</a></div>
                        </li>
                    </ul>
                </div>
                <div class="xbt-content" style="margin-top: 50px">
                    <div class="xbt-item"  v-if="activeCharacter==0">
                        <div class="xbt-icon">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#lowcost"></use>
                            </svg>
                        </div>
                        <p class="xbt-title">Low cost</p>
                        <p class="xbt-sub-title">By pass tranditional payment rails by leveraging on blockchain technology.</p>
                        <p class="xbt-sub-title">High leveraging automation allowing us to offer low fees.</p>
                    </div>
                    <div class="xbt-item"  v-if="activeCharacter==1">
                        <div class="xbt-icon">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#speed"></use>
                            </svg>
                        </div>
                        <p class="xbt-title">High speed</p>
                        <p class="xbt-sub-title">Block chain technology allow nearly realtime transactions.</p>
                        <p class="xbt-sub-title">Network of global banks ensure the interface with traditional world.</p>
                    </div>
                    <div class="xbt-item"  v-if="activeCharacter==2">
                        <div class="xbt-icon">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#local"></use>
                            </svg>
                        </div>
                        <p class="xbt-title">Local knowledge</p>
                        <p class="xbt-sub-title">Our deep local based expertise ensure the understanding client needs in each country.</p>
                        <p class="xbt-sub-title">Local team assist in navigate the diverse regulatry environment.</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="xbt-block" style="min-height: 300px">
            <div class="container" style="margin-top: 50px">
                <p style="font-size: 40px">We look forward to cooperating with you </p>
                <p style="margin-top: 20px">
                    <router-link to="/aboutus">
                         <div class="btn">Contact us</div>
                    </router-link>
                </p>
            </div>
        </section>
        <footer-static></footer-static>
    </section>
</template>
<script>
import headerStatic from '../../components/headerStatic'
import footerStatic from '../../components/footerStatic'
import {
    accountTotal,
    infoSteps
} from '../../service/getData'
import {
    responseResult,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_DATA,
    responsePassword,
} from '../../config/response'
export default {
    components: {
        headerStatic,
        footerStatic
    },
    data() {
        return {
            solutions:'Solutions',
            activeItem: 'account',
            accountData: '',
            activeCharacter: 0, //激活的菜单
        }
    },
    created() {
        // this.requestAccountInfo();
        this.initAutoPic();
    },
    methods: {

        initAutoPic(){

        setInterval(() => {
            this.activeCharacter++;
            if(this.activeCharacter>=3){
                this.activeCharacter=0;
            }
        }, 5000);
        },
        //获取用户账户信息
        requestAccountInfo() {
            let handler = this;
            accountTotal(function(ret) {
                // console.log("success=" + data);
                handler.responseAccountInfo(ret);
            });
        },

        responseAccountInfo(ret) {
            let response = responseResult(this, ret, 1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.accountData = ret.retData;
                return;
            }
        },
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner-block{position: relative;height:610px }
.xbt-block {
    padding: 60px 0px 60px 0px;
    background-color: #ffffff;
}

.banner-bg{background: url(https://www.baomap.com/assets/dist/img/index_banner45.jpg) no-repeat;height: 610px;width: 100%;position: absolute;top:0;z-index:10;margin-top:78px; }

.banner-cover{background: rgba(0,0,0,0.5);height: 620px;width: 100%;position: absolute;top:0;z-index:11; background-size:100% 100%;padding-top:290px;}

/*.banner-cover p{color:#ffffff;font-size: 46px}*/
.banner-cover p span{color:#ffffff;font-size: 50px;border-bottom: 1px #ffffff solid;padding-bottom: 5px}
.whatwedo{
    padding-bottom: 100px;
}
.xbt-block .container .xbt-title {
    font-size: 30px
}

.xbt-block .container .xbt-content .row img {
    margin-bottom: 20px
}

.xbt-block .container .xbt-content .row .xbt-title {
    font-size: 19px;
}

.xbt-block .container .xbt-content .row .xbt-sub-title {
    font-size: 16px;
    color: #556468;
    /*text-align: left;*/
    line-height: 22px;
    margin-bottom: 0px;
}
.whatwedo .xbt-content .row .xbt-title{
    margin-top:20px;
    margin-bottom: 10px;
}

.xbt-ul {
    list-style: none;
    margin: 0 auto;
    overflow: hidden;
    width: 70%;
}

.xbt-ul li {
    float: left;
    width: 19%;
    cursor: pointer;
}

.xbt-ul .width20,.xbt-ul .width20l{width: 20%}
.xbt-ul .width30{width: 30%}
.xbt-ul .width60p{width: 60px}

.xbt-ul li .xbt-item {
    color: #ffffff;
    height: 60px;
}

.xbt-ul li .xbt-item a {
    color: #ffffff;
    padding-bottom: 10px;
    border-bottom: 3px transparent solid;
    font-size: 28px;
    font-family: AxLLCircular, Helvetica, Arial, sans-serif !important;
}

.divsvg {
    margin: auto;
    margin-top: 18px;
    width: 25px;
    height: 4px;
    background-color: #B0E0E6;
}

.xbt-block .container .xbt-content .row .xbt-col {
    position: relative;
}

.xbt-icon {
    width: 80px;
    margin: auto;
}

.xbt-icon svg {
    width: 60px;
    height: 60px;
}

.xbt-ul li .xbt_active a {
    border-bottom: 3px #ffffff solid
}

.advantage{
    padding: 50px;
}

.advantage .xbt-content p {
    color: #ffffff;
}

.advantage .xbt-content .xbt-icon {
    /*text-align: left;*/
    /*text-align: center;*/
    /*margin: 0px;*/
}

.advantage .xbt-content .xbt-icon svg{
    margin: auto;
}

.advantage .container .xbt-content{
    text-align: center;
}

.advantage .container .xbt-content .xbt-title {
    font-size: 40px;
    font-family: AxLLCircular, Helvetica, Arial, sans-serif !important;
}

.advantage .container .xbt-content .xbt-sub-title {
    font-size: 20px;
    color: #ffffff;
    font-family: AxLLCircular, Helvetica, Arial, sans-serif !important;
    padding: 0 15%;
    text-align: center;
}

.btn {
    padding: 3px 15px;
    border: 2px solid #B0E0E6;
    font-size: 18px;
    border-radius: 15px;
    color:#333;
}

.btn:hover {
    transform: scale(1.2);
}




@media(max-width: 890px){
.banner-block{position: relative;height:360px }
.banner-bg{background: url(http://od60al7id.bkt.clouddn.com/ocean/imagefluent-blue.png) no-repeat;height: 300px;width: 100%;position: absolute;top:0;z-index:10; background-size:100% 100%;}
.banner-cover{background: rgba(0,0,0,0);padding-top:160px;height: 300px}
/*.banner-cover p{font-size: 36px}*/
.banner-cover p span{font-size: 36px;border-bottom: 0px #ffffff solid;}
.advantage{
    width: 100%;
    padding: 50px 0px;
}    
.xbt-ul {
     width: 100%;
     webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px;
}

.xbt-ul .width20{width: 100px}
.xbt-ul .width20l{width: 110px}
.xbt-ul .width30{width: 170px}
.xbt-ul .width60p{width: 0px;display: none}
.xbt-block .container .xbt-content .row .xbt-col {
    padding-bottom: 30px;
}
.xbt-ul li .xbt-item a {
    font-size: 20px;
}
}

</style>