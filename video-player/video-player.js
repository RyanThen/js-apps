$(document).ready(function() {

  // Build Video Player HTML //
  const videoPlayerContainer = document.querySelector('#video-playlist-section');
  let videoPlayerTemplate = ``;

  const buildVideoPlayerHTML = function(array, htmlContainer) {
    array.forEach((video, index) => {
      
      videoPlayerTemplate += `

        ${video.id === 1 ? `<div class="featured-video-container">` : ''}
        ${video.id === 2 ? `<div class="video-library-container">` : ''}

          <div class="vp-single-container" data-id="vid-id-${video.id}">
            <div class="vp-single-inner">
              ${video.id === 1
                ?
                  `<div class="vid-iframe-container">
                     <iframe class="vid-iframe" src="${video.url}" allowfullscreen="allowfullscreen"></iframe>
                   </div>` 
                : 
                  `<img src="${video.imageURL}" class="vid-img">`
              }
              <div class="vp-text-container ${video.id === 1 ? 'fade-in-and-up-1' : ''}">
                <h4 class="vid-title">${video.title}</h4>
                <p class="vid-desc">${video.description}</p>
              </div>
            </div>
          </div>

        ${video.id === 1 ? `</div>` : ''}
        ${index === array.length - 1 ? `</div>` : ''}

      `;       
    });

    htmlContainer.insertAdjacentHTML('afterbegin', videoPlayerTemplate);
  }

  buildVideoPlayerHTML(videoData, videoPlayerContainer);

  // Get all featured video and video library single containers //
  const featuredVideo = document.querySelector('.featured-video-container .vp-single-container');
  const videoLibrary = document.querySelectorAll('.video-library-container .vp-single-container');

  // Get featured video and video library inner elements from dom
  const videoTitles = [...document.querySelectorAll('.vid-title')];
  const videoDescriptions = [...document.querySelectorAll('.vid-desc')];

  // Get featured video inner elements from dom
  const featuredVideoIframe = featuredVideo.querySelector('.vid-iframe');
  const featuredVideoTextContainer = featuredVideo.querySelector('.vp-text-container');
  const featuredVideoTitle = featuredVideo.querySelector('.vid-title');
  const featuredVideoDescription = featuredVideo.querySelector('.vid-desc');

  // Get video library titles and full descriptions
  const videoLibraryTitles = videoTitles.filter(title => title !== videoTitles[0]);
  const videoLibraryDescriptions = videoDescriptions.filter(description => description !== videoDescriptions[0]);

  // Set description excerpt for video library items (shorten full descriptions)
  videoLibraryDescriptions.forEach((description, i) => {
     description.textContent = (description.textContent).substr(0, 75) + '...';
  });

  // Set initial active state on video library position 1 when page is first loaded
  const videoLibraryPosition1 = $('.video-library-container .vp-single-container:first-of-type');
  videoLibraryPosition1.addClass('video-library-active');

  // Click functionality for video library elements
  $(videoLibrary).on('click', function() { 

    // Set featured video, title, description
    videoData.forEach( video => {
      if('vid-id-' + video.id === $(this).attr('data-id')) {
        featuredVideoIframe.src = video.url;
        featuredVideoTitle.textContent = video.title;
        featuredVideoDescription.textContent = video.description;
      }
    });

    // Fire featured video text animation
    $(featuredVideoTextContainer).hasClass('fade-in-and-up-1')
      ?
        $(featuredVideoTextContainer).removeClass('fade-in-and-up-1').addClass('fade-in-and-up-2')
      :
        $(featuredVideoTextContainer).removeClass('fade-in-and-up-2').addClass('fade-in-and-up-1');

    // Add active state to clicked item
    $(videoLibrary).removeClass('video-library-active');
    $(this).addClass('video-library-active');

    // Push user up to featured video upon selecting a new video (non-desktop screen sizes only)
    const mediaQueryMobile = window.matchMedia('(max-width: 1025px)')

    if (mediaQueryMobile.matches) $('html, body').animate({ scrollTop: $(videoPlayerContainer).offset().top }, 500);

  });
  
});