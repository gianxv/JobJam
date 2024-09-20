$(document).ready(function () {
    var pos = 0,
        slides = $('.slide'),
        numOfSlides = slides.length;

    function nextSlide() {
        // Stop current slide video
        if (slides[pos].video) {
            slides[pos].video.stopVideo();
        }
        // Animate out current slide
        $(slides[pos]).animate({ left: '-100%' }, 500);
        // Move to the next slide
        pos = (pos >= numOfSlides - 1 ? 0 : ++pos);
        // Animate in next slide
        $(slides[pos]).css({ left: '100%' }).animate({ left: 0 }, 500, function() {
            // Start video in the new slide
            if (slides[pos].video) {
                slides[pos].video.playVideo();
            }
        });
    }

    function previousSlide() {
        // Stop current slide video
        if (slides[pos].video) {
            slides[pos].video.stopVideo();
        }
        // Animate out current slide
        $(slides[pos]).animate({ left: '100%' }, 500);
        // Move to the previous slide
        pos = (pos == 0 ? numOfSlides - 1 : --pos);
        // Animate in previous slide
        $(slides[pos]).css({ left: '-100%' }).animate({ left: 0 }, 500, function() {
            // Start video in the new slide
            if (slides[pos].video) {
                slides[pos].video.playVideo();
            }
        });
    }

    $('.left').click(previousSlide);
    $('.right').click(nextSlide);
});

function onYouTubeIframeAPIReady() {
    $('.slide').each(function (index, slide) {
        // Get the .video element inside each .slide
        var iframe = $(slide).find('.video')[0];
        // Create a new YT.Player from the iFrame, and store it on the .slide DOM object
        slide.video = new YT.Player(iframe);
    });
}
document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent the form from submitting traditionally
    const keyword = document.getElementById('keyword').value;
    // Check if the user has a keyword, otherwise show an alert
    if (!keyword) {
        alert("Please enter a job keyword to search for!");
        return;
    }
    // Construct Google search URL
    let googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(keyword)}+jobs`;
