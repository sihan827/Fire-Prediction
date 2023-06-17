let LOWER = 36.0721;
let LEFT = 126.6796;
let UPPER = 36.3865;
let RIGHT = 127.07;

let container = document.getElementById('map');
let options = {
    center: new kakao.maps.LatLng((LOWER + UPPER) / 2.0, (LEFT + RIGHT) / 2.0),
    level: 9
};
            
let ms = document.getElementById('month')
let selected_month = ms.options[ms.selectedIndex].value;

let map = new kakao.maps.Map(container, options);
let coordRects = []
            
DrawMap(selected_month)

function type(d){
    //d.month = String(d.month);
    d.sw_lat = parseFloat(d.sw_lat);
    d.sw_lon = parseFloat(d.sw_lon);
    d.ne_lat = parseFloat(d.ne_lat);
    d.ne_lon = parseFloat(d.ne_lon);
    d.fire = parseFloat(d.fire);
    return d;
}

function ChangeValue(){
    var month_select = document.getElementById('month');
    selected_month = month_select.options[month_select.selectedIndex].value;
    console.log(selected_month);
    DrawMap(selected_month);
};

function DrawMap(selected_month){
    coordRects.forEach(function(rect){
        rect.setMap(null)
    });

    coordRects = []

    d3.csv("./data/2023_prediction_web.csv", type, function(error, data){
        if (error) throw error;
        if (selected_month == "base"){
            data.forEach(function(d){
                if (d.month == '7'){
                    var coordRectangleBounds = new kakao.maps.LatLngBounds(
                        new kakao.maps.LatLng(d.sw_lat, d.sw_lon),
                        new kakao.maps.LatLng(d.ne_lat, d.ne_lon)
                    );

                    var coordRectangle = new kakao.maps.Rectangle({
                        bounds: coordRectangleBounds, // 사각형 남서, 북동 정보
                        strokeWeight: 1, // 선 두께
                        strokeColor: '#2EFEC8', // 선 색깔
                        strokeOpacity: 1, // 선 불투명도
                        strokeStyle: 'shortdashdot', // 선 스타일
                        fillColor: '#2EFEC8', // 채우기 색깔
                        fillOpacity: 0.3 // 채우기 불투명도
                    });

                    coordRects.push(coordRectangle)
                    coordRectangle.setMap(map);
                };
            });
        }

        else {
            data.forEach(function(d){
                if (d.month == selected_month){
                    if (d.fire == 1.0){
                        var coordRectangleBounds = new kakao.maps.LatLngBounds(
                            new kakao.maps.LatLng(d.sw_lat, d.sw_lon),
                            new kakao.maps.LatLng(d.ne_lat, d.ne_lon)
                        );

                        var coordRectangle = new kakao.maps.Rectangle({
                            bounds: coordRectangleBounds, // 사각형 남서, 북동 정보
                            strokeWeight: 1, // 선 두께
                            strokeColor: '#FE2E2E', // 선 색깔
                            strokeOpacity: 1, // 선 불투명도
                            strokeStyle: 'shortdashdot', // 선 스타일
                            fillColor: '#FE2E2E', // 채우기 색깔
                            fillOpacity: 0.3 // 채우기 불투명도
                        });

                        coordRects.push(coordRectangle)
                        coordRectangle.setMap(map);
                    }
                    else if (d.fire == 0.5){
                        var coordRectangleBounds = new kakao.maps.LatLngBounds(
                            new kakao.maps.LatLng(d.sw_lat, d.sw_lon),
                            new kakao.maps.LatLng(d.ne_lat, d.ne_lon)
                        );

                        var coordRectangle = new kakao.maps.Rectangle({
                            bounds: coordRectangleBounds, // 사각형 남서, 북동 정보
                            strokeWeight: 1, // 선 두께
                            strokeColor: '#FFFF00', // 선 색깔
                            strokeOpacity: 1, // 선 불투명도
                            strokeStyle: 'shortdashdot', // 선 스타일
                            fillColor: '#FFFF00', // 채우기 색깔
                            fillOpacity: 0.3 // 채우기 불투명도
                        });

                        coordRects.push(coordRectangle)
                        coordRectangle.setMap(map);
                    }
                    else {
                        var coordRectangleBounds = new kakao.maps.LatLngBounds(
                            new kakao.maps.LatLng(d.sw_lat, d.sw_lon),
                            new kakao.maps.LatLng(d.ne_lat, d.ne_lon)
                        );

                        var coordRectangle = new kakao.maps.Rectangle({
                            bounds: coordRectangleBounds, // 사각형 남서, 북동 정보
                            strokeWeight: 1, // 선 두께
                            strokeColor: '#2EFEC8', // 선 색깔
                            strokeOpacity: 1, // 선 불투명도
                            strokeStyle: 'shortdashdot', // 선 스타일
                            fillColor: '#2EFEC8', // 채우기 색깔
                            fillOpacity: 0.3 // 채우기 불투명도
                        });

                        coordRects.push(coordRectangle)
                        coordRectangle.setMap(map);
                    };
                }
            });
        };
    });
};