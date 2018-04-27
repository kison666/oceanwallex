//highmap 世界地图
export var drawWordMap = function(divId) {
    var data = [
    {
        "code": "GB",
        "value": 257,
        "name": "United Kingdom",
        'color': '#00BCF1'
    },
    {
            "code": "CN",
            "value": 143,
            "name": "China",
            'color': '#00BCF1'
        }, {
            "code": "KH",
            "value": 160,
            "name": "Cambodia",
            'color': '#00BCF1'
        }, {
            "code": "MY",
            "value": 160,
            "name": "Malaysia",
            'color': '#00BCF1'
        }, {
            "code": "ID",
            "value": 132,
            "name": "Indonesia",
            'color': '#00BCF1'
        }, {
            "code": "TH",
            "value": 135,
            "name": "Thailand",
            'color': '#00BCF1'
        }, {
            "code": "PH",
            "value": 313,
            "name": "Philippines",
            'color': '#00BCF1'
        },
        {
            "code": "SG",
            "value": 7252,
            "name": "Singapore",
            'color': '#00BCF1'
        },
        {
            "code": "BN",
            "value": 76,
            "name": "Brunei Darussalam",
            'color': '#00BCF1'
        },
        {
            "code": "BN",
            "value": 76,
            "name": "Brunei Darussalam",
            'color': '#00BCF1'
        },
        {
            "code": "VN",
            "value": 280,
            "name": "Vietnam",
            'color': '#00BCF1'
        },
        {
            "code": "LA",
            "value": 27,
            "name": "Lao PDR",
            'color': '#00BCF1'
        },
        {
            "code": "MM",
            "value": 73,
            "name": "Myanmar",
            'color': '#00BCF1'
        },
        {
            "code": "AU",
            "value": 3,
            "name": "Australia",
            'color': '#00BCF1'
        },
        {
            "code": "NZ",
            "value": 17,
            "name": "New Zealand",
            'color': '#00BCF1'
        }
    ];

    var initData = function() {

    };

    //参数实例化
    Highcharts.setOptions({ global: { useUTC: false } });

    var drawMap = function() {
        return new Highcharts.Map(divId, {
            title: {
                text: null,

            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            scrollbar: {
                enabled: false
            },
            navigator: {
                enabled: false
            },
            title: {
                text: ''
            },
            mapNavigation: {
                enabled: false,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },
            tooltip: {
                // backgroundColor: 'none',
                // borderWidth: 0,
                shadow: false,
                useHTML: true,
                // padding: 0,
                style: {
                    "fontSize": "18px"
                },
                pointFormat: '<span class="f32"><span class="flag {point.flag}"></span></span>' +
                    ' {point.name}',
            },
            colorAxis: {
                min: 1,
                max: 1000,
                type: 'logarithmic'
            },
            series: [{
                data: data,
                mapData: Highcharts.maps['custom/world'],
                joinBy: ['iso-a2', 'code'],
                name: 'service country',
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                }
            }]
        });
    };


    initData();
    drawMap();
}