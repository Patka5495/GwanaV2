// 방향키로 페이지 이동하는 것 막는 코드
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

// 새로고침 시 위치 초기화
setTimeout(
    function(){
    var _scrollX = $('html').scrollLeft();
    $('html').scrollLeft(_scrollX + -10000);
    console.log(_scrollX);
}    
,70)

// 사운드 모음
let pageMove = new Audio('./sound/page.mp3');
let pageHome = new Audio('./sound/home.mp3');

let menuMoveSound = new Audio('./sound/메뉴이동.wav');
let menuEnterSound = new Audio('./sound/메뉴진입.wav');
let menuExitSound = new Audio('./sound/메뉴아웃.wav');
let bibim = new Audio('./sound/비빔밥.mp3');
let bab = new Audio('./sound/밥밥밥.mp3');
let gochu = new Audio('./sound/고추장.mp3');
let gim = new Audio('./sound/김3.mp3');
let cham = new Audio('./sound/참기름2.mp3');

let devil = new Audio('./sound/devil.mp3');
let die = new Audio('./sound/다이다이다이.mp3');
let chick = new Audio('./sound/꼬끼오.mp3');
let pig = new Audio('./sound/꾸울.mp3');
let god = new Audio('./sound/갓.mp3');

let mangtae = new Audio('./sound/망태 할아버지.mp3');

let know = new Audio('./sound/그거 아세요.mp3');
let ramen = new Audio('./sound/라면.mp3');
let DGB = new Audio('./sound/돼고비.mp3');

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
let isMenu1On = false;
let isMenu2On = false;
let isMenu3On = false;
let isMenu4On = false;
let isMenu5On = false;
let isMenu6On = false;

// ESC 함수
let menuOff = function(){
    isMenuOn = false;
    isMenu1On = false;
    isMenu2On = false;
    isMenu3On = false;
    isMenu4On = false;
    isMenu5On = false;
    isMenu6On = false;
    bibim.pause();
    devil.pause();
    mangtae.pause();
    know.pause();
    ramen.pause();
    DGB.pause();
}

// Enter 함수
let menuOn = function(){
    $('.artwork').eq(menuNum).addClass('active');
    isMenuOn = true;
    $('#prevBtn').addClass('none');
    $('#nextBtn').addClass('none');
    $('#XBtn').removeClass('none'); 
    menuEnterSound.currentTime = 0;
    menuEnterSound.play();
    if(menuNum == 0){
        isMenu1On = true;
        ramen.currentTime = 0;
        ramen.play();
    }else if(menuNum == 1){
        isMenu2On = true;
        DGB.currentTime = 0;
        DGB.play();
    }else if(menuNum == 2){
        isMenu3On = true;
        know.currentTime = 0;
        know.play();
    }else if(menuNum == 3){
        isMenu4On = true;
        bibim.currentTime = 0;
        bibim.play();
    }else if(menuNum == 4){
        isMenu5On = true;
        devil.currentTime = 0;
        devil.play();
    }else if(menuNum == 5){
        isMenu6On = true;
        mangtae.currentTime = 0;
        mangtae.play();
    }
}

// 리모콘 꾸미기 함수
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
    menuMoveSound.currentTime = 0;
    menuMoveSound.play();
});
$('.menuJS').click(function(){  
    menuOn();
});
$('#XBtn').click(function(){  
    xProg = 0;
    $('.artwork').removeClass('active');
    $('#prevBtn').removeClass('none');
    $('#nextBtn').removeClass('none');
    $('#XBtn').addClass('none');    
    isMenuOn = false; 
    menuExitSound.currentTime = 0;
    menuExitSound.play();
    menuOff();
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
            if (event.keyCode == 37 || event.which == 37 )
            // 왼쪽 방향키
            {
                $('#leftEffectA').addClass('active');
                $('#leftEffect').addClass('active');
                LeftBool = true;
                if(leftProg == 7){
                    prev();
                    leftProg = 0;
                }            
            }
            else if ( event.keyCode == 39 || event.which == 39 ) 
            // 오른쪽 방향키
            {
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
            if (event.keyCode == 40 || event.which == 40 ) 
            // 아래 방향키
            {
                if(menuNum<5){
                    menuNum++;
                }
                console.log(menuNum);
                menuMoveSound.currentTime = 0;
                menuMoveSound.play();
                $('.menuJS').removeClass('active');
                $('.menuJS').eq(menuNum).addClass('active');                
            }
            else if (event.keyCode == 38 || event.which == 38 ) 
            // 위 방향키
            {
                if(menuNum>0){
                    menuNum--;
                }
                console.log(menuNum);
                menuMoveSound.currentTime = 0;
                menuMoveSound.play();
                $('.menuJS').removeClass('active');
                $('.menuJS').eq(menuNum).addClass('active');
            }
            else if(event.keyCode == 13 || event.which == 13)
            // 엔터키
            {
                menuOn();
            }
        }else if(isMenuOn == true && pageNum == -1){
            if ( event.keyCode == 27 || event.which == 27 ) 
            // esc키
            {
                $('#XEffectA').addClass('active');
                $('#XEffect').addClass('active');
                xBool = true;
    
                if(xProg == 7){
                    xProg = 0;
                    $('.artwork').removeClass('active');
                    $('#prevBtn').removeClass('none');
                    $('#nextBtn').removeClass('none');
                    $('#XBtn').addClass('none');    
                    menuOff();
                    console.log(isMenu4On);
                    menuExitSound.currentTime = 0;
                    menuExitSound.play();
                }
            }
        }

        // QWER 키
        if(isMenu4On == true){
            if ( event.keyCode == 81 || event.which == 81 ){
                $('#bibimImg1').addClass('active');
                bab.play();
            }
            if ( event.keyCode == 87 || event.which == 87 ){
                $('#bibimImg2').addClass('active');
                gim.play();
            }
            if ( event.keyCode == 69 || event.which == 69 ){
                $('#bibimImg3').addClass('active');
                gochu.play();
            }
            if ( event.keyCode == 82 || event.which == 82 ){
                $('#bibimImg4').addClass('active');
                cham.play();
            }
        }
        if(isMenu5On == true){
            if ( event.keyCode == 81 || event.which == 81 ){
                $('#devilImg1').addClass('active');
                die.play();
                die.loop = false;
            }
            if ( event.keyCode == 87 || event.which == 87 ){
                $('#devilImg2').addClass('active');
                chick.play();
                chick.loop = false;                
            }
            if ( event.keyCode == 69 || event.which == 69 ){
                $('#devilImg3').addClass('active');
                pig.play();
                pig.loop = false;
            }
            if ( event.keyCode == 82 || event.which == 82 ){
                $('#devilImg4').addClass('active');
                god.play();
                god.loop = false;
            }
        }
    }    
});

// 키 땠을 때
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
    if(isMenu4On == true){
        if ( event.keyCode == 81 || event.which == 81 ){
            $('#bibimImg1').removeClass('active');
            bab.pause();
            bab.currentTime = 0;
        }
        if ( event.keyCode == 87 || event.which == 87 ){
            $('#bibimImg2').removeClass('active');
            gim.pause();
            gim.currentTime = 0;
        }
        if ( event.keyCode == 69 || event.which == 69 ){
            $('#bibimImg3').removeClass('active');
            gochu.pause();
            gochu.currentTime = 0;
        }
        if ( event.keyCode == 82 || event.which == 82 ){
            $('#bibimImg4').removeClass('active');
            cham.pause();
            cham.currentTime = 0;
        }
    }
    if(isMenu5On == true){
        if ( event.keyCode == 81 || event.which == 81 ){
            $('#devilImg1').removeClass('active');
            die.pause();
            die.currentTime = 0;            
        }
        if ( event.keyCode == 87 || event.which == 87 ){
            $('#devilImg2').removeClass('active');
            chick.pause();
            chick.currentTime = 0;
        }
        if ( event.keyCode == 69 || event.which == 69 ){
            $('#devilImg3').removeClass('active');
            pig.pause();
            pig.currentTime = 0;
        }
        if ( event.keyCode == 82 || event.which == 82 ){
            $('#devilImg4').removeClass('active');
            god.pause();
            god.currentTime = 0;
        }
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
        pageMove.currentTime = 0;
        pageMove.play();

        $("#wrap").animate(
            {                        
                "left": pageLeft +"vw"
            },
            1000
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
        pageMove.currentTime = 0;
        pageMove.play();
        $("#wrap").animate(
            {
                "left": pageLeft +"vw"
            },
            1000,
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
        pageHome.play();
        $('.artwork').removeClass('active');
        $('#prevBtn').removeClass('none');
        $('#nextBtn').removeClass('none');
        $('#XBtn').addClass('none');    
        menuOff();
        console.log(isMenu4On);
        menuExitSound.play();
    }
}
