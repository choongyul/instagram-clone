window.addEventListener('load', function() {
    var carousels = document.getElementsByClassName('carousel');

    // 캐러셀 이벤트를 등록하는 로직
    for (let i = 0; i < carousels.length; i++) {
       addEventToCarousel(carousels[i]);
    }
});

function addEventToCarousel(carouselElem) {
    var ulElem = carouselElem.querySelector('ul');
    var liElems = ulElem.querySelectorAll('li');

    console.log(liElems);

    //너비값 조정
    var liWidth = liElems[0].clientWidth;
    var adjustWidth = liWidth * liElems.length;
    ulElem.style.width = adjustWidth.length + 'px';

    // 슬라이드 버튼 이벤트 등록
    var slideButtons = carouselElem.querySelectorAll('.slide');

    for (let i = 0; i < slideButtons.length; i++) {
        console.log("butten event 등록");
        slideButtons[i].addEventListener('click', createListenerSlide(carouselElem)); // 클로저로 현재의 carouselElem을 넘긴다
    }
}

function createListenerSlide(carouselElem) {
    return function(event) {
        var clickedButton = event.currentTarget;

        //값 가져오기
        var liElem = carouselElem.querySelectorAll('li');
        var liCount = liElem.length;
        var currentIndex = carouselElem.attributes.data.value;

        console.log("clickedButton :" + clickedButton);

        // 슬라이드 버튼 체크
        if(clickedButton.className.includes('right') && currentIndex < liCount - 1) {
            currentIndex++;
            scrollDiv(carouselElem, currentIndex);
        } else if (clickedButton.className.includes('left') && currentIndex > 0 ) {
            currentIndex--;
            scrollDiv(carouselElem, currentIndex);
        }

        // 인디케이터 업데이트
        updateIndicator(carouselElem, currentIndex);

        // 슬라이스 버튼 노출 여부 업데이트
        updateSlideButtonVisible (carouselElem, currentIndex, liCount);

        //  새롭게 보여지는 이미지 인덱스 값을 현재 data 값으로 업데이트
        carouselElem.attributes.data.value = currentIndex;
    };
}

function scrollDiv(carouselElem, nextIndex) {
    var scrollable = carouselElem.querySelector('div');
    var liWidth = scrollable.clientWidth;
    var newLeft = liWidth * nextIndex;

    scrollable.scrollTo({left: newLeft, behavior: 'smooth'});
}

function updateIndicator(carouselElem, currentIndex) {
    var indicators = carouselElem.querySelectorAll('footer > div');

    for (let index = 0; index < indicators.length; index++) {
        if ( index == currentIndex) {
            indicators[index].className = 'active';
        } else {
            indicators[index].className = '';
        }
    }
}

function updateSlideButtonVisible (carouselElem, currentIndex, liCount) {
    let left = carouselElem.querySelector('.slide-left');
    let right = carouselElem.querySelector('.slide-right');

    if (currentIndex > 0 ) {
        left.style.display = 'block';
    } else {
        left.style.display = 'none';
    }

    if (currentIndex < liCount-1) {
        right.style.display = 'block';
    } else {
        right.style.display = 'none';
    }
}