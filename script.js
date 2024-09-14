// navbar animation
function initializeNavbarAnimation() {
    document.getElementById('nav').classList.add('animate-in');
}

// icon clicks
function navAddBlurAndMatte(text) {
    const video = document.querySelector('video');
    const overlayText = document.getElementById('overlay-text');
    video.classList.add('blur');
    overlayText.textContent = text;
    overlayText.style.opacity = '1';
}

function removeBlurAndMatte() {
    const video = document.querySelector('video');
    const overlayText = document.getElementById('overlay-text');
    video.classList.remove('blur');
    overlayText.style.opacity = '0';
}

function handleIconClick(url) {
    window.open(url, '_blank');
    removeBlurAndMatte();
}

function setupIconEventListeners() {
    const githubURL = 'https://github.com/yohandgz';
    const linkedinURL = 'https://www.linkedin.com/in/ralphyohandgz';
    const resumeURL = './misc/rdgz.pdf';
    const mailURL = 'mailto:yohan@uchicago.edu';

    const githubIcon = document.getElementById('github');
    const linkedinIcon = document.getElementById('linkedin');
    const resumeIcon = document.getElementById('resume');
    const mailIcon = document.getElementById('mail');

    githubIcon.addEventListener('mouseover', () => navAddBlurAndMatte('My GitHub'));
    linkedinIcon.addEventListener('mouseover', () => navAddBlurAndMatte('My LinkedIn'));
    resumeIcon.addEventListener('mouseover', () => navAddBlurAndMatte('My Resume'));
    mailIcon.addEventListener('mouseover', () => navAddBlurAndMatte('Contact Me'));

    const navRight = document.getElementById('nav-right');
    if (navRight) {
        navRight.addEventListener('mouseleave', removeBlurAndMatte);
    }

    githubIcon.addEventListener('click', () => handleIconClick(githubURL));
    linkedinIcon.addEventListener('click', () => handleIconClick(linkedinURL));
    resumeIcon.addEventListener('click', () => handleIconClick(resumeURL));
    mailIcon.addEventListener('click', () => handleIconClick(mailURL));
}

// video scroll animation
function handleVideoScroll() {
    const video = document.querySelector('video');

    const updateVideoStyles = () => {
        const scrollY = window.scrollY;
        const viewportWidth = window.innerWidth;
        const oneMargin = 2 + (4 * viewportWidth / 100);
        const oneMarginVW = (oneMargin / viewportWidth) * 100;

        const minWidthVW = 100 - 2 * oneMarginVW;
        let newWidthVW = Math.max(minWidthVW, 100 - (scrollY / 80));
        video.style.width = `${newWidthVW}vw`;

        let radius = (viewportWidth < 550 ? Math.min(scrollY / 30, 663.2 / 30) : Math.min(scrollY / 12, 663.2 / 20));
        video.style.borderRadius = `${radius}px`;
    };

    document.addEventListener('scroll', updateVideoStyles);
}

// svg animation
function svgAnimate() {
    let path = document.querySelector('path');
    let pathLength = path.getTotalLength();
    let aboutMeSection = document.querySelector('#about'); 
    let speedFactor = 0.4; 

    path.style.strokeDasharray = pathLength + ' ' + pathLength;
    path.style.strokeDashoffset = pathLength;

    let startAnimation = false;

    let observerOptions = {
        root: null, 
        rootMargin: '0px 0px 0px 0px', 
        threshold: [0.3]
    };

    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAnimation = true;
                window.addEventListener('scroll', onScroll);
                onScroll(); 
            } else if (!entry.isIntersecting && startAnimation) {
                startAnimation = false;
                window.removeEventListener('scroll', onScroll);
            }
        });
    }, observerOptions);

    observer.observe(aboutMeSection);

    function onScroll() {
        if (startAnimation) {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let viewportHeight = document.documentElement.clientHeight;
            let sectionRect = aboutMeSection.getBoundingClientRect();
            let sectionTop = sectionRect.top + scrollTop;
            let sectionBottom = sectionRect.bottom + scrollTop;

            let visibleTop = Math.max(sectionTop, scrollTop);
            let visibleBottom = Math.min(sectionBottom, scrollTop + viewportHeight);
            let visibleHeight = Math.max(visibleBottom - visibleTop, 0);
            let sectionHeight = sectionBottom - sectionTop;
            let visiblePercentage = Math.max(Math.min((visibleHeight / sectionHeight - 0.3) / 0.7, 1), 0); 

            let adjustedPercentage = Math.min(visiblePercentage * speedFactor, 1); 

            let drawLength = pathLength * adjustedPercentage;
            path.style.strokeDashoffset = Math.max(pathLength - drawLength, 0);

            if (adjustedPercentage >= 1) {
                path.style.strokeDashoffset = 0; 
                window.removeEventListener('scroll', onScroll);
            }
        }
    }
}


// about me scroll animation
function calculateRate(width) {
    const widthMin = 400;
    const widthMax = 1920;
    const rateMin = 0.6;
    const rateMax = 2.1;
    // 1.8

    return rateMin + ((width - widthMin) / (widthMax - widthMin)) * (rateMax - rateMin);
}

function handleScrollAnimation() {
    const aboutTitle = document.querySelector('#about-title');

    const handleScroll = () => {
        let scrollY = window.scrollY;
        const rate = calculateRate(window.innerWidth);

        if (scrollY > 400) {
            aboutTitle.style.transform = `translateX(${(scrollY - 400) * rate}px)`;
        } else {
            aboutTitle.style.transform = `translateX(-100vw)`;
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
}

// button that chooses between tech and about me
function techMoreAboutButton() {
    const viewSkillsButton = document.getElementById('view-skills');
    const moreAboutMeButton = document.getElementById('more-about-me');
    const tech = document.getElementById('tech-container');
    const about = document.getElementById('more-about-me-container');

    function updateButtonState(activeButton) {
        viewSkillsButton.classList.remove('active');
        moreAboutMeButton.classList.remove('active');
        activeButton.classList.add('active');
        
        if (activeButton === viewSkillsButton) {
            tech.style.display = 'flex';
            about.style.display = 'none';
        } else {
            tech.style.display = 'none';
            about.style.display = 'flex';
        }
    }

    viewSkillsButton.addEventListener('click', () => updateButtonState(viewSkillsButton));
    moreAboutMeButton.addEventListener('click', () => updateButtonState(moreAboutMeButton));
}

function removeBlurAndMatte() {
    const video = document.querySelector('video');
    const overlayText = document.getElementById('overlay-text');
    video.classList.remove('blur');
    overlayText.style.opacity = '0';
}

// about me images
function headshotClick() {
    const image = document.getElementById('mam-image');
    const arrow = document.getElementById('mam-arrow');
    const imageRotation = ['./images/photo1.jpg', './images/photo2.jpg', './images/photo3.jpg']

    let count = 0;
    arrow.addEventListener('click', () => {
        count++;
        image.src = imageRotation[count % 3];
    });
}

// project svg animation
function projectAnimate() {
    let path = document.getElementById('projectsvg');
    let pathLength = path.getTotalLength();
    // change when update project section
    let aboutMeSection = document.querySelector('#stockx'); 
    let speedFactor = 0.2; 

    path.style.strokeDasharray = pathLength + ' ' + pathLength;
    path.style.strokeDashoffset = pathLength;

    let startAnimation = false;

    let observerOptions = {
        root: null, 
        rootMargin: '0px 0px 0px 0px', 
        threshold: [0.25]
    };

    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAnimation = true;
                window.addEventListener('scroll', onScroll);
                onScroll(); 
            } else if (!entry.isIntersecting && startAnimation) {
                startAnimation = false;
                window.removeEventListener('scroll', onScroll);
            }
        });
    }, observerOptions);

    observer.observe(aboutMeSection);

    function onScroll() {
        if (startAnimation) {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let viewportHeight = document.documentElement.clientHeight;
            let sectionRect = aboutMeSection.getBoundingClientRect();
            let sectionTop = sectionRect.top + scrollTop;
            let sectionBottom = sectionRect.bottom + scrollTop;

            let visibleTop = Math.max(sectionTop, scrollTop);
            let visibleBottom = Math.min(sectionBottom, scrollTop + viewportHeight);
            let visibleHeight = Math.max(visibleBottom - visibleTop, 0);
            let sectionHeight = sectionBottom - sectionTop;
            let visiblePercentage = Math.max(Math.min((visibleHeight / sectionHeight - 0.3) / 0.7, 1), 0); 

            let adjustedPercentage = Math.min(visiblePercentage * speedFactor, 1); 

            let drawLength = pathLength * adjustedPercentage;
            path.style.strokeDashoffset = Math.max(pathLength - drawLength, 0);

            if (adjustedPercentage >= 1) {
                path.style.strokeDashoffset = 0; 
                window.removeEventListener('scroll', onScroll);
            }
        }
    }
}

// github project links
function projectGithubLink() {
    const cspLink = 'https://github.com/yohandgz/centralized-sneaker-platform';
    const hdrLink = 'https://github.com/yohandgz/handwritten-digit-recognition';
    const csp = document.querySelector('.csp');
    const hdr = document.querySelector('.hdr');

    csp.addEventListener('click', () => handleIconClick(cspLink));
    hdr.addEventListener('click', () => handleIconClick(hdrLink));
}

// stockx slider
function stockXSlider() {
    const imgElement = document.getElementById('shoeImage');
    const slider = document.getElementById('slider');
    const totalImages = 36;

    const shoeImages = [];
    for (let i = 1; i <= totalImages; i++) {
        const img = new Image();
        const imageNumber = String(i).padStart(2, '0');
        img.src = `https://images.stockx.com/360/Nike-SB-Dunk-Low-Ben-Jerrys-Chunky-Dunky-FF-Packaging/Images/Nike-SB-Dunk-Low-Ben-Jerrys-Chunky-Dunky-FF-Packaging/Lv2/img${imageNumber}.jpg?auto=format%2Ccompress&w=576&dpr=1&q=57`;
        shoeImages.push(img);
    }

    slider.addEventListener('input', () => {
        const imageNumber = String(slider.value).padStart(2, '0');
        imgElement.src = `https://images.stockx.com/360/Nike-SB-Dunk-Low-Ben-Jerrys-Chunky-Dunky-FF-Packaging/Images/Nike-SB-Dunk-Low-Ben-Jerrys-Chunky-Dunky-FF-Packaging/Lv2/img${imageNumber}.jpg?auto=format%2Ccompress&w=576&dpr=1&q=57`;
        
        const nextImageNumber = String(Math.min(Number(slider.value) + 1, totalImages)).padStart(2, '0');
        const prevImageNumber = String(Math.max(Number(slider.value) - 1, 1)).padStart(2, '0');
        
        new Image().src = `https://images.stockx.com/360/Nike-SB-Dunk-Low-Ben-Jerrys-Chunky-Dunky-FF-Packaging/Images/Nike-SB-Dunk-Low-Ben-Jerrys-Chunky-Dunky-FF-Packaging/Lv2/img${nextImageNumber}.jpg?auto=format%2Ccompress&w=576&dpr=1&q=57`;
        new Image().src = `https://images.stockx.com/360/Nike-SB-Dunk-Low-Ben-Jerrys-Chunky-Dunky-FF-Packaging/Images/Nike-SB-Dunk-Low-Ben-Jerrys-Chunky-Dunky-FF-Packaging/Lv2/img${prevImageNumber}.jpg?auto=format%2Ccompress&w=576&dpr=1&q=57`;
    });
}

// pause button for digit recognizer
function hdrPause() {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const hdrVid = document.getElementById('hdr-vid');
    
    hdrVid.addEventListener('click', () => {
                if (hdrVid.paused) {
            hdrVid.play();
            playPauseBtn.classList.remove('play');
            playPauseBtn.classList.add('pause');
        } else {
            hdrVid.pause();
            playPauseBtn.classList.remove('pause');
            playPauseBtn.classList.add('play');
        }
    });

    playPauseBtn.addEventListener('click', () => {
        if (hdrVid.paused) {
            hdrVid.play();
            playPauseBtn.classList.remove('play');
            playPauseBtn.classList.add('pause');
        } else {
            hdrVid.pause();
            playPauseBtn.classList.remove('pause');
            playPauseBtn.classList.add('play');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeNavbarAnimation();
    setupIconEventListeners();
    handleVideoScroll();
    svgAnimate();
    handleScrollAnimation();
    techMoreAboutButton();
    headshotClick();
    projectAnimate();
    projectGithubLink();
    stockXSlider();
    hdrPause();
});


// design idea: 
// about me is transparent and scrolls across image or video
// hella animations bro bro




//<svg viewBox="0 0 1424 786" fill="none" preserveAspectRatio="xMidYMax meet">
//<path d="M3 10.5C48.9878 -19.1826 150.391 75.2833 188.101 298.603C225.811 521.923 454.639 492.706 602.566 435.676C734.781 379.979 887.26 332.216 1013.01 435.676C1063.02 476.824 1336.07 824.01 1355.62 693.94C1361.17 663.924 1385.51 620.1 1420 644.913M3 75C43.5 51.5 112.29 41.5 138 51.5C163.71 61.5 180.916 87.9078 209 160C282.5 348.676 261.844 481.548 358.351 535C440.5 580.5 456.354 432.401 735.5 360.762C1014.65 289.124 1096.17 449.03 1102.68 462.203C1170.71 589.105 1210.3 760.876 1291.23 720.454C1372.17 680.032 1371.33 722.455 1373.44 744.467C1375.55 766.479 1387.81 801.498 1420 765.478" stroke="#d4dfee" stroke-width="10"/>
//</svg>    

//<svg viewBox="0 0 1420 776" fill="none" preserveAspectRatio="xMidYMax meet"">
//<path d="M3 10.5C48.9878 -19.1826 150.391 75.2833 188.101 298.603C225.811 521.923 454.639 492.706 602.566 435.676C734.781 379.979 887.26 332.216 1013.01 435.676C1063.02 476.824 1273 770.5 1420 770.5M3 75C43.5 51.5 112.29 41.5 138 51.5C163.71 61.5001 180.916 87.9078 209 160C282.5 348.676 261.844 481.548 358.351 535C440.5 580.5 456.354 432.401 735.5 360.762C1014.65 289.124 1096.17 449.03 1102.68 462.203C1170.71 589.105 1210.3 760.876 1291.23 720.454C1372.17 680.032 1391 720.454 1420 720.454" stroke="#D4DFEE" stroke-width="10"/>
//</svg>    

//<svg viewBox="0 0 1111 724" fill="none" preserveAspectRatio="xMidYMax meet">
//<path d="M5 0.5C5 100.1 5 182 5 210.5M42.5 0.5V157M1106 723.5V517M1056 723.5V597" stroke="#D4DFEE" stroke-width="9"/>
//</svg>  

//<svg viewBox="0 0 1082 510" fill="none" preserveAspectRatio="xMidYMax meet">
//<path d="M702.5 505.5H1082M0.5 56.5H63.75H127M0.5 5H380M955.5 447H1018.75H1082" stroke="#D4DFEE" stroke-width="9"/>
//</svg>   

//<svg viewBox="0 0 1190 483" fill="none" preserveAspectRatio="xMidYMax meet">
//<path d="M0 6H462.5M0 70H233.5M1189.5 477.5H727M1189.5 411.5H1072.75H943" stroke="#D4DFEE" stroke-width="11"/>
//</svg> 

//<svg viewBox="0 0 1111 724" fill="none" preserveAspectRatio="xMidYMax meet">
//<path d="M5 0.5C5 100.1 5 182 5 210.5M42.5 0.5V157M1106 723.5V517M1056 723.5V597" stroke="#D4DFEE" stroke-width="9"/>
//</svg> 



//projects


//<svg width="832" height="128" viewBox="0 0 832 128" fill="none" xmlns="http://www.w3.org/2000/svg">
//<path d="M684 2V126.001M823.5 37.5011C823.5 25.5012 816.1 8.65118 788.5 8.25118C760.9 7.85118 752 24 754 37.501C755.778 49.5 767.5 57.2006 788.5 63.5C823.5 73.9991 823.5 85.5 823.5 95.5C823.5 105.5 812 120 788.5 120C764.479 120 749.5 106 749.5 90M435.5 10H513M435.5 61.5H505.5M435.5 118H514M8 2V126M110.5 10H154C164.167 10 187 13.6 187 38C187 62.4 164.167 70.1667 154 70.5H110.5M191.5 126C191.5 123 189.333 120.667 188 118.5L177 99L160.692 69.5M618 41.5C618 14.5 592.5 8.5 582.5 8.5C571 7.83331 548 12.0006 541.5 35.5C534.964 59.1286 538.5 81.5 541.5 91.5C544.5 101.5 555 120 580.5 120C604.5 120 618 101.5 618 86.5M399 2V84C399 102 395 119.1 369 119.5C343 119.9 337 106 337 91.5M0 70.5H50.5C60.6667 70.1667 81 63.4 81 39C81 14.6 60.6667 10 50.5 10H0M118.5 2V126M443.5 2V126M636 10H731.742M265 8.5C274.5 8.5 296.5 12.3994 302.5 35.9994C308.5 59.5994 305 83.1661 302.5 91.9994C300.667 101.666 288.6 119.6 265 120C241.4 120.4 229.667 101.999 226 91.9994C223 83.3328 220 59.9995 226 35.9994C232 11.9994 256.5 8.5 265 8.5Z" stroke="#5886C6" stroke-width="16"/>
//</svg>