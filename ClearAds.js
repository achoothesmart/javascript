function clearAds(){
    if(document.querySelectorAll('iframe').length > 0){
        document.querySelectorAll('iframe').forEach((iframe)=>{ iframe.remove() });
        console.log('Ads Cleared');
    }
}

let ti = setInterval(clearAds, 1000);

