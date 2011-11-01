  var gblPhotoShufflerDivId = "photodiv";
  var gblPhotoShufflerImgId = "photoimg"; 
  var gblImg = new Array(
    "http://static.flickr.com/53/149047107_78ebdaf8bc.jpg?v=0",
    "http://static.flickr.com/48/149048049_3523869ba4.jpg?v=0",
    "http://static.flickr.com/56/149047438_fabcf2f7ce.jpg?v=0"
    );
  var gblPauseSeconds = 7.25;
  var gblFadeSeconds = .85;
  var gblRotations = 1;

  // End Customization section
  
  var gblDeckSize = gblImg.length;
  var gblOpacity = 100;
  var gblOnDeck = 0;
  var gblStartImg;
  var gblImageRotations = gblDeckSize * (gblRotations+1);

  window.onload = photoShufflerLaunch;
  
  function photoShufflerLaunch()
  {
  	var theimg = document.getElementById(gblPhotoShufflerImgId);
        gblStartImg = theimg.src; // save away to show as final image

	document.getElementById(gblPhotoShufflerDivId).style.backgroundImage='url(' + gblImg[gblOnDeck] + ')';
	setTimeout("photoShufflerFade()",gblPauseSeconds*1000);
  }

  function photoShufflerFade()
  {
  	var theimg = document.getElementById(gblPhotoShufflerImgId);
	
  	// determine delta based on number of fade seconds
	// the slower the fade the more increments needed
        var fadeDelta = 100 / (30 * gblFadeSeconds);

	// fade top out to reveal bottom image
	if (gblOpacity < 2*fadeDelta ) 
	{
	  gblOpacity = 100;
	  // stop the rotation if we're done
	  if (gblImageRotations < 1) return;
	  photoShufflerShuffle();
	  // pause before next fade
          setTimeout("photoShufflerFade()",gblPauseSeconds*1000);
	}
	else
	{
	  gblOpacity -= fadeDelta;
	  setOpacity(theimg,gblOpacity);
	  setTimeout("photoShufflerFade()",30);  // 1/30th of a second
	}
  }

  function photoShufflerShuffle()
  {
	var thediv = document.getElementById(gblPhotoShufflerDivId);
	var theimg = document.getElementById(gblPhotoShufflerImgId);
	
	// copy div background-image to img.src
	theimg.src = gblImg[gblOnDeck];
	// set img opacity to 100
	setOpacity(theimg,100);

        // shuffle the deck
	gblOnDeck = ++gblOnDeck % gblDeckSize;
	// decrement rotation counter
	if (--gblImageRotations < 1)
	{
	  // insert start/final image if we're done
	  gblImg[gblOnDeck] = gblStartImg;
	}

	// slide next image underneath
	thediv.style.backgroundImage='url(' + gblImg[gblOnDeck] + ')';
  }

  function setOpacity(obj, opacity) {
    opacity = (opacity == 100)?99.999:opacity;
    
    // IE/Win
    obj.style.filter = "alpha(opacity:"+opacity+")";
    
    // Safari<1.2, Konqueror
    obj.style.KHTMLOpacity = opacity/100;

    // Older Mozilla and Firefox
    obj.style.MozOpacity = opacity/100;

    // Safari 1.2, newer Firefox and Mozilla, CSS3
    obj.style.opacity = opacity/100;
  }



