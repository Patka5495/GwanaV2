// 방향키로 페이지 이동하는 것 막는 코드
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
// 사운드 모음
setTimeout(
    function(){
    var _scrollX = $('html').scrollLeft();
    $('html').scrollLeft(_scrollX + -10000);
    console.log(_scrollX);
}
    
,50)

let menuMoveSound = new Audio('./sound/메뉴이동.wav');
let menuEnterSound = new Audio('./sound/메뉴진입.wav');
let menuExitSound = new Audio('./sound/메뉴아웃.wav');














let pageNum = 0;
// 현재 페이지를 나타내는 변수
let pageLeft;
// wrap의 css:left에 사용되는 변수
let rightProg = 0;
let leftProg = 0;
let xProg = 0;
// 왼쪽, 오른쪽 키를 눌렀을 때 점점 증가, 특정 수가 되면 함수 실행
let LeftBool;
let rightBool;
let xBool;
// 이동 관련 bool
let menuNum=-1;
let isMenuOn = false;
$('#leftEffectA').mouseenter(function(){
    $(this).addClass('active');
    $('#leftEffect').addClass('active');
});
$('#leftEffectA').mouseleave(function(){
    $(this).removeClass('active');
    $('#leftEffect').removeClass('active');                
});
$('#leftEffectA').click(function(){
    prev();
    $(this).removeClass('active');
    $('#leftEffect').removeClass('active');                
});
$('#rightEffectA').mouseenter(function(){
    $(this).addClass('active');
    $('#rightEffect').addClass('active');
});
$('#rightEffectA').mouseleave(function(){
    $(this).removeClass('active');
    $('#rightEffect').removeClass('active');                
});
$('#rightEffectA').click(function(){

    next();
    $(this).removeClass('active');
    $('#rightEffect').removeClass('active');                
});
$('#XEffectA').mouseenter(function(){
    $(this).addClass('active');
    $('#XEffect').addClass('active');
});
$('#XEffectA').mouseleave(function(){
    $(this).removeClass('active');
    $('#XEffect').removeClass('active');                
});

$('.menuJS').mouseenter(function(){
    const index = $('.menuJS').index();
    $('.menuJS').removeClass('active');    
    $(this).addClass('active');   
    menuNum = $(this).data("num");   
    menuMoveSound.play();

});
$('.menuJS').click(function(){  
    $('.artwork').eq(menuNum).addClass('active');
    isMenuOn = true;
    $('#prevBtn').addClass('none');
    $('#nextBtn').addClass('none');
    $('#XBtn').removeClass('none');  
    menuEnterSound.play();

});
$('#XBtn').click(function(){  
    xProg = 0;
    $('.artwork').removeClass('active');
    $('#prevBtn').removeClass('none');
    $('#nextBtn').removeClass('none');
    $('#XBtn').addClass('none');    
    isMenuOn = false; 
    menuExitSound.play();

});
// 마우스 부분들도 만들어주었다. 근데 얘네 함수로 만들어주는게 나을래나...
// 짧아서 굳이인가 싶기도 하고

$(document).keydown(function(event){    
    // keydown 키 누르면
    // keypress 값이 입력되면 (alt, ctrl, shift, esc 등 작동하지 않음)
    // keyup 키 떼면
    // key code list http://b1ix.net/170

    if($("#wrap").is(":animated") == false )
    {
        if(isMenuOn == false){
            if (event.keyCode == 37 || event.which == 37 ) {
                $('#leftEffectA').addClass('active');
                $('#leftEffect').addClass('active');
                LeftBool = true;
                if(leftProg == 7){
                    prev();
                    leftProg = 0;
                }            
            }
            else if ( event.keyCode == 39 || event.which == 39 ) {
                $('#rightEffectA').addClass('active');
                $('#rightEffect').addClass('active');
                rightBool = true;
    
                if(rightProg == 7){
                    next();
                    rightProg = 0;
                }
            }
        }        
        if(isMenuOn == false && pageNum == -1){
            if (event.keyCode == 40 || event.which == 40 ) {
                if(menuNum<5){
                    menuNum++;
                }
                console.log(menuNum);
                menuMoveSound.play();

                $('.menuJS').removeClass('active');
                $('.menuJS').eq(menuNum).addClass('active');
            }
            else if (event.keyCode == 38 || event.which == 38 ) {
                if(menuNum>0){
                    menuNum--;
                }
                console.log(menuNum);
                menuMoveSound.play();
                $('.menuJS').removeClass('active');
                $('.menuJS').eq(menuNum).addClass('active');
            }
            else if(event.keyCode == 13 || event.which == 13){
                $('.artwork').eq(menuNum).addClass('active');
                isMenuOn = true;
                menuEnterSound.play();

                $('#prevBtn').addClass('none');
                $('#nextBtn').addClass('none');
                $('#XBtn').removeClass('none');                
            }
        }else if(isMenuOn == true && pageNum == -1){
            if ( event.keyCode == 27 || event.which == 27 ) {
                $('#XEffectA').addClass('active');
                $('#XEffect').addClass('active');
                xBool = true;
    
                if(xProg == 7){
                    xProg = 0;
                    $('.artwork').removeClass('active');
                    $('#prevBtn').removeClass('none');
                    $('#nextBtn').removeClass('none');
                    $('#XBtn').addClass('none');    
                    isMenuOn = false;
                menuExitSound.play();
                }
            }
        }
        // 오른쪽도 마찬가지.
    }    
});
$(document).keyup(function(event){
    if ( event.keyCode == 37 || event.which == 37 ) {
        $('#leftEffect').removeClass('active');
        $('#leftEffectA').removeClass('active');
        leftProg = 0;
        LeftBool = false;
    }else if ( event.keyCode == 39 || event.which == 39 ) {
        $('#rightEffect').removeClass('active');
        $('#rightEffectA').removeClass('active');
        rightProg = 0;
        rightBool = false;
    }else if ( event.keyCode == 27 || event.which == 27 ) {
        $('#XEffectA').removeClass('active');
        $('#XEffect').removeClass('active');
        xProg = 0;
        xBool = false;
    }
});
// 오르다가 키를 때면 초기화
if($("#wrap").is(":animated") == false){
    setInterval(
        leftFunc = function(){
            if(LeftBool == true){
                leftProg ++
                console.log(leftProg);
            }
        }
    ,100)
    setInterval(
        RightFunc = function(){
            if(rightBool == true){
                rightProg ++;
                console.log(rightProg);
            }
        }
    ,100)
    setInterval(
        XFunc = function(){
            if(xBool == true){
                xProg ++;
                console.log(xProg);
            }
        }
    ,100)
}


    

// 이 친구들의 문제가 무었이냐. 바로 키보드 입력에 따라 실행된다는 것이다. 간단하게 사용자다마 제어판 -> 키보드에 보면 재입력 시간, 반복 속도 설정이 다 다를 것이다. 레지스트리 설정까지 가면 더욱 커질 것이고. 그나마 나는 현재 반복 속도를 빠르게 해둬서 제법 일정하게 되지만... 
// 원하는 방법은 누르고 있는 동안 변수들이 일정 시간마다 값을 얻는 방식이 있다면 좋을 텐데... 검색하기가 너무 힘들다. 그래도 뭐, 더 해봐야지.
// 해결!



function prev(){                
    // console.log(pageNum);
    if($("#wrap").is(":animated") == false && pageNum < 0){
        pageNum ++;
        // 페이지 번호가 오르며
        pageLeft = pageNum * 100;
        $('#leftEffect').removeClass('active');
        $('#leftEffectA').removeClass('active');
        // left에 해당하는 변수를 곱해준다
        LeftBool = false;
        // 오 이거 넣으니까 한번 끊겼다가 잘 된다. 야호
        console.log("페이지 넘"+pageNum);

        $("#wrap").animate(
            {                        
                "left": pageLeft +"vw"
            },
            1500
        );                
    }
}
function next(){
    // console.log(pageNum);
    if($("#wrap").is(":animated") == false && pageNum >= -1 ){
        pageNum --;
        // 페이지 번호가 내려가며
        pageLeft = pageNum * 100;
        $('#rightEffect').removeClass('active');
        $('#rightEffectA').removeClass('active');
        rightBool = false;
        // left에 해당하는 변수를 곱해준다. 이거 그냥 위에서 한번만 선언해줘도 될래나.
        console.log("페이지 넘"+pageNum);
        console.log("메뉴 넘"+menuNum);

        $("#wrap").animate(
            {
                "left": pageLeft +"vw"
            },
            1500,
        );
    }
}
function home(){
    // console.log(pageNum);
    if($("#wrap").is(":animated") == false){
        pageNum = 0
        pageLeft = pageNum * 100;
        $("#wrap").animate(
            {
                "left": pageLeft +"vw"
            },
            1500,
        );
    }
}
